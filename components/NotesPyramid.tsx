import { Product } from "@/lib/types";

export function NotesPyramid({ product }: { product: Product }) {
  const rows = [
    { label: "Salida", sub: "los primeros minutos", value: product.notes_top },
    { label: "Corazón", sub: "lo que se queda en la piel", value: product.notes_heart },
    { label: "Fondo", sub: "la estela, horas después", value: product.notes_base },
  ].filter((r) => r.value);

  if (rows.length === 0) return null;

  return (
    <div className="mt-10 border-t border-line">
      <p className="label pt-5 text-[10px] text-bronze">Pirámide olfativa</p>
      <dl className="mt-2 divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="grid grid-cols-[110px_1fr] items-baseline gap-4 py-4">
            <dt>
              <span className="label block text-[11px] text-ink">{r.label}</span>
              <span className="mt-0.5 block text-[11px] leading-tight text-muted">{r.sub}</span>
            </dt>
            <dd className="font-display text-xl leading-snug">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
