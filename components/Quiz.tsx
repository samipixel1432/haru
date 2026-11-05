"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";
import { ArrowIcon, WhatsappIcon } from "@/components/Icons";
import { buildQuestionLink } from "@/lib/whatsapp";

type Option = {
  label: string;
  hint?: string;
  families?: Record<string, number>;
  occasions?: string[];
  longevity?: string[];
  budget?: "low" | "mid" | "high";
};

const QUESTIONS: { title: string; options: Option[] }[] = [
  {
    title: "¿Qué quieres transmitir?",
    options: [
      { label: "Frescura y limpieza", hint: "aire, agua, cítricos", families: { fresco: 3, citrico: 3 } },
      { label: "Calidez y cercanía", hint: "vainilla, especias, ámbar", families: { ambar: 3, dulce: 2 } },
      { label: "Elegancia y profundidad", hint: "maderas, resinas", families: { amaderado: 3, ambar: 1 } },
      { label: "Delicadeza y romance", hint: "flores, notas suaves", families: { floral: 3, dulce: 1 } },
    ],
  },
  {
    title: "¿Para qué momento es?",
    options: [
      { label: "Para el día a día", occasions: ["Día", "Día y noche"] },
      { label: "Para salir de noche", occasions: ["Noche", "Día y noche"] },
      { label: "Para una ocasión especial", occasions: ["Ocasiones especiales", "Noche"] },
    ],
  },
  {
    title: "¿Qué tan presente lo quieres?",
    options: [
      { label: "Discreto", hint: "que lo note quien se acerque", longevity: ["Suave (3–4 h)", "Moderada (5–7 h)"] },
      { label: "Que se note", hint: "presencia equilibrada", longevity: ["Moderada (5–7 h)", "Larga (8 h o más)"] },
      { label: "De impacto", hint: "que dure todo el día", longevity: ["Larga (8 h o más)"] },
    ],
  },
  {
    title: "¿Cuánto quieres invertir?",
    options: [
      { label: "Lo más accesible", budget: "low" },
      { label: "Un punto medio", budget: "mid" },
      { label: "Sin límite", budget: "high" },
    ],
  },
];

function score(product: Product, picked: Option[], limits: { low: number; mid: number }) {
  let s = 0;
  const [vibe, moment, presence, budget] = picked;
  if (product.family && vibe?.families?.[product.family]) s += vibe.families[product.family] * 3;
  if (product.occasion && moment?.occasions?.includes(product.occasion)) s += 3;
  if (product.longevity && presence?.longevity?.includes(product.longevity)) s += 3;
  if (budget?.budget === "low" && product.price <= limits.low) s += 3;
  if (budget?.budget === "mid" && product.price > limits.low && product.price <= limits.mid) s += 3;
  if (budget?.budget === "high") s += 1;
  if (product.stock <= 0) s -= 100;
  return s;
}

export function Quiz({ products }: { products: Product[] }) {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Option[]>([]);

  const limits = useMemo(() => {
    const prices = products.map((p) => p.price).sort((a, b) => a - b);
    if (prices.length === 0) return { low: 0, mid: 0 };
    return {
      low: prices[Math.floor((prices.length - 1) / 3)],
      mid: prices[Math.floor(((prices.length - 1) * 2) / 3)],
    };
  }, [products]);

  const done = step >= QUESTIONS.length;

  const results = useMemo(() => {
    if (!done) return [];
    const ranked = products
      .map((p) => ({ p, s: score(p, picked, limits) }))
      .sort((a, b) => b.s - a.s);
    const matches = ranked.filter((r) => r.s > 0).slice(0, 3);
    return (matches.length > 0 ? matches : ranked.filter((r) => r.p.stock > 0).slice(0, 3)).map((r) => r.p);
  }, [done, products, picked, limits]);

  function choose(option: Option) {
    setPicked((prev) => [...prev.slice(0, step), option]);
    setStep((s) => s + 1);
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  function reset() {
    setPicked([]);
    setStep(0);
  }

  const summary = picked.map((o) => o.label).join(" · ");

  if (done) {
    return (
      <div className="rise">
        <p className="label text-bronze">Tu resultado</p>
        <h2 className="font-display mt-3 text-5xl leading-[0.98] md:text-7xl">
          {results.length > 0 ? (
            <>
              Estos van <em>contigo</em>.
            </>
          ) : (
            <>Te ayudamos a elegir.</>
          )}
        </h2>
        <p className="mt-5 max-w-xl text-smoke">Según tus respuestas: {summary}.</p>

        {results.length > 0 ? (
          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p className="mt-10 max-w-md text-smoke">
            Todavía no tenemos perfumes publicados que mostrarte aquí. Escríbenos y te recomendamos
            directamente.
          </p>
        )}

        <div className="mt-14 flex flex-col gap-3 sm:flex-row">
          <a
            href={buildQuestionLink(`Hola Haru, hice el test de aroma. Mis respuestas: ${summary}. ¿Qué me recomiendas?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <WhatsappIcon className="h-4 w-4" />
            Pedir una recomendación personal
          </a>
          <button onClick={reset} className="btn btn-ghost">
            Volver a empezar
          </button>
          <Link href="/categoria/perfumes" className="btn btn-ghost">
            Ver todos los perfumes
          </Link>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[step];

  return (
    <div key={step} className="rise">
      <div className="flex items-center justify-between">
        <p className="label text-bronze">
          {String(step + 1).padStart(2, "0")} / {String(QUESTIONS.length).padStart(2, "0")}
        </p>
        {step > 0 && (
          <button onClick={back} className="label link-u py-2 text-[10px] text-muted">
            ← Atrás
          </button>
        )}
      </div>
      <div className="mt-3 h-px w-full bg-line" aria-hidden="true">
        <div className="h-px bg-ink transition-all duration-500" style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }} />
      </div>

      <h2 className="font-display mt-10 text-5xl leading-[0.98] md:text-7xl">{q.title}</h2>

      <ul className="mt-10 grid gap-3 md:mt-14 md:grid-cols-2">
        {q.options.map((o) => (
          <li key={o.label}>
            <button
              onClick={() => choose(o)}
              className="group flex min-h-[88px] w-full items-center justify-between gap-4 border border-line p-5 text-left transition-colors hover:border-ink hover:bg-ink hover:text-paper md:p-6"
            >
              <span>
                <span className="font-display block text-2xl leading-tight md:text-3xl">{o.label}</span>
                {o.hint && <span className="mt-1 block text-sm text-muted transition-colors group-hover:text-paper/60">{o.hint}</span>}
              </span>
              <ArrowIcon className="h-5 w-5 flex-shrink-0 opacity-40 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
