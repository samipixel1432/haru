"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";
import { createProductsBulk, ProductInput } from "@/app/admin/actions";

type Row = {
  name: string;
  price: number | null;
  category: string;
  stock: number;
  raw: string;
  valid: boolean;
};

const CATEGORY_ALIASES: Record<string, string> = {
  perfume: "perfumes",
  perfumes: "perfumes",
  locion: "perfumes",
  lociones: "perfumes",
  "locion/perfume": "perfumes",
  joya: "joyeria",
  joyas: "joyeria",
  joyeria: "joyeria",
  "joyería": "joyeria",
};

function normalizeCategory(raw: string | undefined): string {
  if (!raw) return CATEGORIES[0].slug;
  const key = raw.trim().toLowerCase();
  return CATEGORY_ALIASES[key] ?? (CATEGORIES.some((c) => c.slug === key) ? key : CATEGORIES[0].slug);
}

function parseLines(text: string): Row[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
    .map((line) => {
      const parts = line.split(/;|\t|,(?=[^,]*$)/).map((p) => p.trim());
      // Formato esperado: Nombre; Precio; Categoría; Stock
      const [name, priceRaw, categoryRaw, stockRaw] = parts;
      const price = priceRaw ? Number(priceRaw.replace(/[^0-9.]/g, "")) : null;
      const stock = stockRaw ? Number(stockRaw.replace(/[^0-9]/g, "")) : 0;

      return {
        name: name ?? "",
        price: price !== null && !Number.isNaN(price) ? price : null,
        category: normalizeCategory(categoryRaw),
        stock: Number.isNaN(stock) ? 0 : stock,
        raw: line,
        valid: Boolean(name) && price !== null && !Number.isNaN(price) && price >= 0,
      };
    });
}

export function BulkProductForm() {
  const [text, setText] = useState("");
  const [rows, setRows] = useState<Row[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<number | null>(null);
  const router = useRouter();

  const validCount = useMemo(() => rows.filter((r) => r.valid).length, [rows]);

  function handlePreview() {
    setError(null);
    setDone(null);
    setRows(parseLines(text));
  }

  function updateRowCategory(index: number, category: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, category } : r)));
  }

  async function handleSubmit() {
    setError(null);
    const validRows = rows.filter((r) => r.valid);
    if (validRows.length === 0) {
      setError("No hay filas válidas para guardar. Revisa el formato.");
      return;
    }

    const inputs: ProductInput[] = validRows.map((r) => ({
      name: r.name,
      description: "",
      price: r.price as number,
      category: r.category,
      image_url: null,
      stock: r.stock,
      featured: false,
    }));

    setSaving(true);
    const result = await createProductsBulk(inputs);
    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    setDone(result.count);
    setText("");
    setRows([]);
    router.refresh();
  }

  return (
    <div className="mt-8">
      <div className="border border-gold/30 bg-gold/5 p-4 text-xs leading-relaxed text-ink/70">
        <p>
          Pega una lista de productos, uno por línea, separando los datos con punto y coma{" "}
          <code>;</code>:
        </p>
        <p className="mt-2 font-mono text-ink/80">
          Nombre del producto; Precio; Categoría (perfumes/joyeria); Stock
        </p>
        <p className="mt-2 font-mono text-ink/80">
          Club de Nuit Intense; 125000; perfumes; 8
          <br />
          Collar Gota de Oro 18k; 89000; joyeria; 12
        </p>
        <p className="mt-2">
          La categoría y el stock son opcionales (si los omites, queda en Perfumes y stock 0).
          Después de guardar, puedes entrar a &quot;Editar&quot; cada producto para agregarle foto y
          descripción.
        </p>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder={"Club de Nuit Intense; 125000; perfumes; 8\nCollar Gota de Oro 18k; 89000; joyeria; 12"}
        className="mt-4 w-full border border-gold/30 bg-white px-4 py-3 font-mono text-sm outline-none focus:border-gold"
      />

      <div className="mt-3 flex gap-3">
        <button
          type="button"
          onClick={handlePreview}
          disabled={!text.trim()}
          className="border border-gold/50 px-5 py-2 text-xs tracking-[0.15em] text-ink hover:border-gold hover:bg-gold hover:text-white disabled:opacity-40"
        >
          VER VISTA PREVIA
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-5 py-2 text-xs tracking-[0.15em] text-ink/50 hover:text-ink"
        >
          CANCELAR
        </button>
      </div>

      {rows.length > 0 && (
        <div className="mt-8">
          <p className="text-sm text-ink/70">
            {validCount} de {rows.length} fila(s) se pueden guardar.
          </p>
          <div className="mt-3 divide-y divide-gold/15 border border-gold/15">
            {rows.map((row, i) => (
              <div
                key={i}
                className={`flex flex-col gap-2 p-3 text-sm sm:flex-row sm:items-center ${
                  row.valid ? "" : "bg-red-50"
                }`}
              >
                <div className="flex-1">
                  <p className="text-ink">{row.name || "(sin nombre)"}</p>
                  <p className="text-xs text-ink/50">{row.raw}</p>
                  {!row.valid && (
                    <p className="text-xs text-red-700">
                      Falta nombre o precio válido — esta fila no se guardará.
                    </p>
                  )}
                </div>
                <select
                  value={row.category}
                  onChange={(e) => updateRowCategory(i, e.target.value)}
                  className="border border-gold/30 bg-white px-2 py-1 text-xs"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <p className="w-28 text-right text-xs text-ink/70">
                  {row.price !== null ? formatPrice(row.price) : "—"}
                </p>
                <p className="w-20 text-right text-xs text-ink/50">Stock: {row.stock}</p>
              </div>
            ))}
          </div>

          {error && <p className="mt-3 text-xs text-red-700">{error}</p>}
          {done !== null && (
            <p className="mt-3 text-xs text-green-700">
              {done} producto(s) guardado(s) correctamente.
            </p>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || validCount === 0}
            className="mt-4 border border-gold bg-gold px-6 py-3 text-xs tracking-[0.2em] text-white hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "GUARDANDO..." : `GUARDAR ${validCount} PRODUCTO(S)`}
          </button>
        </div>
      )}
    </div>
  );
}
