import { FAQ } from "@/lib/store-config";

export function Faq({ items = FAQ }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="faq group">
          <summary className="flex items-center justify-between gap-6 py-5 text-left">
            <span className="font-display text-xl leading-snug md:text-2xl">{item.q}</span>
            <span className="plus label flex h-8 w-8 flex-shrink-0 items-center justify-center text-lg" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-smoke">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
