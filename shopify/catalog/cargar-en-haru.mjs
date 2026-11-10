import { readFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;
if (!url || !key) {
  console.error("Faltan SUPABASE_URL y SUPABASE_ANON_KEY en el entorno.");
  process.exit(1);
}

const dir = dirname(fileURLToPath(import.meta.url));
const all = [];
for (const p of ["parte-A", "parte-B", "parte-C", "parte-D", "parte-E"]) {
  const f = join(dir, `${p}.json`);
  if (existsSync(f)) all.push(...JSON.parse(readFileSync(f, "utf8")));
  else console.warn(`falta ${p}.json`);
}

const sizeOf = (sizes) => {
  const s = [...sizes].sort((a, b) => a - b);
  return s.includes(100) ? 100 : s[Math.floor(s.length / 2)];
};

const rows = all.map((x) => ({
  name: `${x.marca} ${x.nombre}`,
  description: x.descripcion_corta,
  price: 0,
  category: "perfumes",
  image_url: null,
  stock: 10,
  featured: Boolean(x.mas_vendido),
  family: x.familia,
  notes_top: x.notas_salida,
  notes_heart: x.notas_corazon,
  notes_base: x.notas_fondo,
  longevity: x.duracion,
  occasion: x.ocasion,
  size_ml: sizeOf(x.presentaciones_ml),
}));

const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };

const existing = await fetch(`${url}/rest/v1/products?select=name&limit=1000`, { headers }).then((r) => r.json());
const have = new Set(existing.map((e) => e.name));
const nuevos = rows.filter((r) => !have.has(r.name));
console.log(`catálogo: ${rows.length} | ya existen: ${rows.length - nuevos.length} | a insertar: ${nuevos.length}`);

async function insert(batch, withExtras) {
  const body = withExtras
    ? batch
    : batch.map(({ family, notes_top, notes_heart, notes_base, longevity, occasion, size_ml, ...rest }) => rest);
  const res = await fetch(`${url}/rest/v1/products`, {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify(body),
  });
  return { ok: res.ok, status: res.status, text: res.ok ? "" : await res.text() };
}

if (nuevos.length > 0) {
  let withExtras = true;
  const probe = await insert(nuevos.slice(0, 1), true);
  if (!probe.ok) {
    console.log(`Sin ficha olfativa (falta migración 002): ${probe.text.slice(0, 160)}`);
    withExtras = false;
    const retry = await insert(nuevos.slice(0, 1), false);
    if (!retry.ok) { console.error("Error al insertar:", retry.text); process.exit(1); }
  }
  const rest = nuevos.slice(1);
  for (let i = 0; i < rest.length; i += 10) {
    const r = await insert(rest.slice(i, i + 10), withExtras);
    if (!r.ok) { console.error("Error en lote:", r.status, r.text); process.exit(1); }
  }
  console.log(`insertados: ${nuevos.length} (ficha olfativa: ${withExtras ? "sí" : "NO, corre la migración y vuelve a cargar"})`);
}
