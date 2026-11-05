import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dir = dirname(fileURLToPath(import.meta.url));
const templates = join(dir, "..", "templates");

const base = JSON.parse(readFileSync(join(templates, "product.haru-perfume.json"), "utf8"));
const catalogo = JSON.parse(readFileSync(join(dir, "catalogo.json"), "utf8"));

for (const p of catalogo) {
  writeFileSync(join(templates, `product.${p.slug}.json`), JSON.stringify(base, null, 2) + "\n");
}

console.log(`plantillas escritas: ${catalogo.length}`);
