import { createRequire } from "node:module";
import { readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(join(dirname(fileURLToPath(import.meta.url)), "..", "..", "package.json"));
const sharp = require("sharp");

const carpeta = process.env.FOTOS_DIR;
const adjuntos = process.env.ADJUNTOS_DIR;
if (!carpeta) { console.error("Falta FOTOS_DIR (carpeta con las fotos)."); process.exit(1); }

const archivos = readdirSync(carpeta).filter((f) => f.endsWith(".jpeg")).sort();
const f = (n) => join(carpeta, archivos[n - 1]);
const a = (n) => join(adjuntos, `${n}.webp`);

const productos = [
  { slug: "cadena-rope-dorada", nombre: "Cadena Rope Dorada", categoria: "joyeria", fotos: [a(1), a(2), a(3)],
    descripcion: "Cadena de eslabón torzal (rope) con acabado dorado. Se ve fina y definida sobre la piel y se puede usar sola o combinada con dijes. Unisex." },
  { slug: "collar-virgen-milagrosa", nombre: "Collar Virgen Milagrosa", categoria: "joyeria", fotos: [f(6), f(7), f(1)],
    descripcion: "Collar con medalla ovalada de la Virgen Milagrosa en acabado dorado y cadena fina. Un detalle discreto para el día a día y un regalo con significado." },
  { slug: "collar-dije-revolver", nombre: "Collar Dije Revólver con Circonitas", categoria: "joyeria", fotos: [f(3), f(4), f(8)],
    descripcion: "Dije en forma de revólver con piedras brillantes en la empuñadura, sobre cadena eslabón tipo figaro. Una pieza de carácter, para quien busca algo distinto." },
  { slug: "collar-dije-bolsa-de-dinero", nombre: "Collar Dije Bolsa de Dinero", categoria: "joyeria", fotos: [f(5)],
    descripcion: "Dije en forma de bolsita de dinero con acabado dorado, en cadena fina de eslabones. Simbólico y fácil de combinar con otras cadenas." },
  { slug: "set-aretes-animalitos", nombre: "Set de Aretes Topitos Figuras", categoria: "joyeria", fotos: [f(2), a(4)],
    descripcion: "Set de aretes pequeños con figuras: aviones, ositos, huellitas y corazones, entre otras. Ligeros y delicados, para combinar uno distinto cada día." },
  { slug: "topitos-mini-dorados", nombre: "Topitos Mini Dorados", categoria: "joyeria", fotos: [f(9)],
    descripcion: "Aretes topo muy pequeños con acabado dorado, presentados en cajita. Discretos y cómodos para usar todo el día." },
  { slug: "aretes-tortugas", nombre: "Aretes Tortugas", categoria: "joyeria", fotos: [f(10)],
    descripcion: "Aretes topo en forma de tortuga con acabado dorado y textura en el caparazón. Pequeños, tiernos y fáciles de llevar." },
  { slug: "aretes-corazon-circonita", nombre: "Aretes Corazón con Circonita", categoria: "joyeria", fotos: [f(12)],
    descripcion: "Aretes topo con piedra brillante en forma de corazón y base dorada. Un brillo delicado para el día o para ocasiones especiales." },
  { slug: "anillo-corazon-cruz", nombre: "Anillo Corazón y Cruz", categoria: "joyeria", fotos: [f(11), f(13)],
    descripcion: "Anillo abierto de acabado dorado con un corazón y una cruz en los extremos. Se ve fino en la mano y combina bien con otros anillos." },
  { slug: "anillo-eslabones-circonitas", nombre: "Anillo Eslabones con Circonitas", categoria: "joyeria", fotos: [f(14), f(17)],
    descripcion: "Anillo con diseño de eslabones y hilera de piedras brillantes, en acabado dorado. Se luce solo o apilado con otros anillos." },
  { slug: "anillo-corazon-circonitas", nombre: "Anillo Corazón con Circonitas", categoria: "joyeria", fotos: [f(15)],
    descripcion: "Anillo dorado con corazón y piedras brillantes. Delicado y romántico, pensado para regalar." },
  { slug: "argollas-huggie-doradas", nombre: "Argollas Huggie Doradas", categoria: "joyeria", fotos: [f(16)],
    descripcion: "Argollas pequeñas que abrazan el lóbulo, con acabado dorado liso. Básicas, ligeras y fáciles de usar con cualquier look." },
  { slug: "pulseras-trebol", nombre: "Pulseras Trébol", categoria: "joyeria", fotos: [f(18)],
    descripcion: "Pulseras de cadena fina con dijes de trébol, en versión blanca y verde. Se pueden usar juntas o por separado." },
  { slug: "aretes-osito-circonitas", nombre: "Aretes Osito con Circonitas", categoria: "joyeria", fotos: [f(19)],
    descripcion: "Aretes topo en forma de osito con detalle de piedras brillantes y acabado dorado. Tiernos y con presencia." },
  { slug: "collar-corazon-dorado", nombre: "Collar Corazón Dorado", categoria: "joyeria", fotos: [f(20)],
    descripcion: "Collar de cadena delgada con dije de corazón abombado en acabado dorado. Sencillo y fácil de combinar." },
  { slug: "dolce-gabbana-light-blue-set", nombre: "Dolce & Gabbana Light Blue (Set con Miniatura)", categoria: "perfumes", familia: "citrico", fotos: [f(21)],
    descripcion: "Set de Light Blue de Dolce & Gabbana con el frasco principal y una miniatura de viaje. Un aroma fresco y luminoso para el día." },
  { slug: "lattafa-fakhar-rose", nombre: "Lattafa Fakhar Rose", categoria: "perfumes", familia: "floral", fotos: [f(22)],
    descripcion: "Perfume femenino de Lattafa en frasco blanco y rosado. Sus acordes principales: floral blanco, afrutado, nardos y dulce, con fondo amaderado, vainilla y almizcle." },
  { slug: "lattafa-badee-al-oud-sublime", nombre: "Lattafa Bade'e Al Oud Sublime", categoria: "perfumes", familia: "dulce", fotos: [f(23)],
    descripcion: "Perfume de Lattafa en frasco rojo. Acordes principales: frutal, fresco, rosas y vainilla, con matices musgosos, dulces, tropicales y terrosos." },
  { slug: "lattafa-asad-elixir", nombre: "Lattafa Asad Elixir", categoria: "perfumes", familia: "ambar", fotos: [f(24)],
    descripcion: "Perfume masculino de Lattafa. Acordes principales: amaderado, ámbar, tabaco y cálido especiado, con toques dulces, de vainilla, pachulí y un fresco especiado." },
  { slug: "lattafa-asad", nombre: "Lattafa Asad", categoria: "perfumes", familia: "ambar", fotos: [f(25)],
    descripcion: "Asad de Lattafa, en frasco negro con detalles dorados y estuche a juego. Un perfume masculino de carácter oriental. Pregúntanos por sus notas y tamaños." },
  { slug: "orientica-amber-rouge", nombre: "Orientica Amber Rouge", categoria: "perfumes", familia: "ambar", fotos: [f(26)],
    descripcion: "Amber Rouge, de la colección Luxury de Orientica, en frasco rojo con estuche. Un perfume de estilo ámbar y oriental. Pregúntanos por sus notas y tamaños." },
];

const out = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "public", "catalogo");
mkdirSync(out, { recursive: true });

const resultado = [];
for (const p of productos) {
  const rutas = [];
  let i = 1;
  for (const origen of p.fotos) {
    const nombre = `${p.slug}-${i}.webp`;
    await sharp(origen).rotate().resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(out, nombre));
    rutas.push(`/catalogo/${nombre}`);
    i++;
  }
  resultado.push({ slug: p.slug, nombre: p.nombre, descripcion: p.descripcion, categoria: p.categoria, familia: p.familia ?? null, fotos: rutas });
}

writeFileSync(join(dirname(fileURLToPath(import.meta.url)), "productos-fotos.json"), JSON.stringify(resultado, null, 2));
console.log(`productos: ${resultado.length} | fotos: ${resultado.reduce((s, r) => s + r.fotos.length, 0)}`);
