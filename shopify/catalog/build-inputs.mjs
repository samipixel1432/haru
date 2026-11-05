import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const parts = ["parte-A.json", "parte-B.json", "parte-C.json"];

const FAMILIAS = ["amaderado", "floral", "citrico", "ambar", "fresco", "dulce"];
const DURACIONES = ["Suave (3–4 h)", "Moderada (5–7 h)", "Larga (8 h o más)"];
const ESTELAS = ["Suave", "Moderada", "Fuerte"];
const OCASIONES = ["Día", "Noche", "Día y noche", "Ocasiones especiales"];
const GENEROS = ["hombre", "mujer", "unisex"];

const problems = [];
const warn = (slug, msg) => problems.push(`[${slug}] ${msg}`);

const all = [];
for (const p of parts) {
  const file = join(dir, p);
  if (!existsSync(file)) { problems.push(`falta ${p}`); continue; }
  try { all.push(...JSON.parse(readFileSync(file, "utf8"))); } catch (e) { problems.push(`${p}: JSON inválido (${e.message})`); }
}

const slugs = new Set(all.map((x) => x.slug));
if (slugs.size !== all.length) problems.push("hay slugs repetidos");

for (const x of all) {
  const s = x.slug;
  if (!GENEROS.includes(x.genero)) warn(s, `genero inválido: ${x.genero}`);
  if (!FAMILIAS.includes(x.familia)) warn(s, `familia inválida: ${x.familia}`);
  if (!DURACIONES.includes(x.duracion)) warn(s, `duracion inválida: ${x.duracion}`);
  if (!ESTELAS.includes(x.estela)) warn(s, `estela inválida: ${x.estela}`);
  if (!OCASIONES.includes(x.ocasion)) warn(s, `ocasion inválida: ${x.ocasion}`);
  if (!Array.isArray(x.presentaciones_ml) || x.presentaciones_ml.length === 0) warn(s, "sin presentaciones_ml");
  if ((x.descripcion_corta || "").length > 160) warn(s, `descripcion_corta ${x.descripcion_corta.length} > 160`);
  if ((x.seo_title || "").length > 60) warn(s, `seo_title ${x.seo_title.length} > 60`);
  if ((x.seo_description || "").length > 155) warn(s, `seo_description ${x.seo_description.length} > 155`);
  if (!x.notas_salida || !x.notas_corazon || !x.notas_fondo) warn(s, "faltan notas");
  if (!Array.isArray(x.faq) || x.faq.length < 3) warn(s, "faq < 3");
  if (!Array.isArray(x.similares) || x.similares.length !== 3) warn(s, "similares != 3");
  for (const sim of x.similares || []) {
    if (!slugs.has(sim)) warn(s, `similar inexistente: ${sim}`);
    if (sim === s) warn(s, "similar es sí mismo");
  }
  if (x.confianza !== "alta") warn(s, `confianza ${x.confianza}: ${x.notas_de_verificacion || ""}`);
}

const slugify = (t) => t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const mf = (key, type, value) => ({ namespace: "haru", key, type, value: String(value) });

function toInput(x) {
  const metafields = [
    mf("descripcion_corta", "single_line_text_field", x.descripcion_corta),
    mf("familia", "single_line_text_field", x.familia),
    mf("familia_detalle", "single_line_text_field", x.familia_detalle),
    mf("genero", "single_line_text_field", x.genero),
    mf("notas_salida", "single_line_text_field", x.notas_salida),
    mf("notas_corazon", "single_line_text_field", x.notas_corazon),
    mf("notas_fondo", "single_line_text_field", x.notas_fondo),
    mf("duracion", "single_line_text_field", x.duracion),
    mf("estela", "single_line_text_field", x.estela),
    mf("ocasion", "single_line_text_field", x.ocasion),
    mf("temporadas", "single_line_text_field", (x.temporadas || []).join(", ")),
    mf("para_quien", "multi_line_text_field", x.para_quien),
    mf("ocasiones_texto", "multi_line_text_field", x.ocasiones_texto),
    mf("similares", "single_line_text_field", (x.similares || []).join(",")),
    mf("similares_motivo", "multi_line_text_field", x.similares_motivo),
    mf("faq", "json", JSON.stringify(x.faq)),
  ];
  if (x.anio_lanzamiento) metafields.push(mf("anio_lanzamiento", "number_integer", x.anio_lanzamiento));
  if (x.perfumista) metafields.push(mf("perfumista", "single_line_text_field", x.perfumista));

  const sizes = [...new Set(x.presentaciones_ml)].sort((a, b) => a - b);
  const tags = ["perfume", "lote-perfumes-haru", `genero:${x.genero}`, `familia:${x.familia}`, `marca:${slugify(x.marca)}`];
  if (x.mas_vendido) tags.push("mas-vendido-perfumes");

  return {
    handle: x.slug,
    title: `${x.marca} ${x.nombre}`,
    vendor: x.marca,
    productType: "Perfume",
    status: "DRAFT",
    tags,
    descriptionHtml: String(x.descripcion_larga).split(/\n\n+/).map((p) => `<p>${p.trim()}</p>`).join(""),
    seo: { title: x.seo_title, description: x.seo_description },
    templateSuffix: x.slug,
    productOptions: [{ name: "Tamaño", values: sizes.map((ml) => ({ name: `${ml} ml` })) }],
    variants: sizes.map((ml) => ({
      optionValues: [{ optionName: "Tamaño", name: `${ml} ml` }],
      price: "0",
      sku: `${x.slug}-${ml}ml`,
      inventoryItem: { tracked: false },
    })),
    metafields,
  };
}

mkdirSync(join(dir, "inputs"), { recursive: true });
writeFileSync(join(dir, "catalogo.json"), JSON.stringify(all, null, 2));

const inputs = all.map(toInput);
const batchSize = 5;
for (let i = 0; i < inputs.length; i += batchSize) {
  const vars = {};
  inputs.slice(i, i + batchSize).forEach((inp, j) => { vars[`i${j + 1}`] = inp; });
  writeFileSync(join(dir, "inputs", `lote-${i / batchSize + 1}.json`), JSON.stringify(vars));
}

const brands = [...new Set(all.map((x) => x.marca))].sort();
writeFileSync(join(dir, "marcas.json"), JSON.stringify(brands.map((b) => ({ marca: b, tag: `marca:${slugify(b)}` })), null, 2));

console.log(`productos: ${all.length} | marcas: ${brands.length} | lotes: ${Math.ceil(all.length / batchSize)}`);
console.log(problems.length ? `AVISOS (${problems.length}):\n` + problems.join("\n") : "sin avisos");
