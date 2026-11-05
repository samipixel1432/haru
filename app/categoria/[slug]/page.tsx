import Link from "next/link";
import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, FAMILIES } from "@/lib/types";
import { buildQuestionLink } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/Icons";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

const SORTS = [
  { value: "nuevos", label: "Novedades" },
  { value: "precio-asc", label: "Precio: menor a mayor" },
  { value: "precio-desc", label: "Precio: mayor a menor" },
] as const;

const INTRO: Record<string, string> = {
  perfumes: "Aromas elegidos uno a uno. Filtra por familia olfativa o haz el test y te decimos cuál va contigo.",
  joyeria: "Piezas sencillas, para usar todos los días y para guardar en la memoria.",
};

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const familia = typeof query.familia === "string" ? query.familia : undefined;
  const orden = typeof query.orden === "string" ? query.orden : "nuevos";

  let products = await getProducts(slug);
  const total = products.length;
  if (familia) products = products.filter((p) => p.family === familia);
  if (orden === "precio-asc") products = [...products].sort((a, b) => a.price - b.price);
  if (orden === "precio-desc") products = [...products].sort((a, b) => b.price - a.price);

  const href = (next: { familia?: string; orden?: string }) => {
    const sp = new URLSearchParams();
    const f = "familia" in next ? next.familia : familia;
    const o = "orden" in next ? next.orden : orden;
    if (f) sp.set("familia", f);
    if (o && o !== "nuevos") sp.set("orden", o);
    const qs = sp.toString();
    return `/categoria/${slug}${qs ? `?${qs}` : ""}`;
  };

  const chip = (active: boolean) =>
    `label whitespace-nowrap border px-4 py-3 text-[10px] transition-colors ${
      active ? "border-ink bg-ink text-paper" : "border-line hover:border-ink"
    }`;

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
      <nav aria-label="Ruta" className="label text-[10px] text-muted">
        <Link href="/" className="link-u">Inicio</Link> / <span className="text-ink">{category.label}</span>
      </nav>
      <h1 className="font-display mt-6 text-6xl leading-none md:text-8xl">{category.label}</h1>
      <p className="mt-5 max-w-xl text-[17px] text-smoke">{INTRO[slug]}</p>

      <div className="mt-10 flex flex-col gap-5 border-y border-line py-5 md:flex-row md:items-center md:justify-between">
        {slug === "perfumes" ? (
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
            <Link href={href({ familia: undefined })} className={chip(!familia)}>
              Todos
            </Link>
            {FAMILIES.map((f) => (
              <Link key={f.slug} href={href({ familia: f.slug })} className={chip(familia === f.slug)}>
                {f.label}
              </Link>
            ))}
          </div>
        ) : (
          <span />
        )}
        <div className="flex items-center gap-3">
          <span className="label text-[10px] text-muted">{products.length} producto{products.length === 1 ? "" : "s"}</span>
          <div className="no-scrollbar -mr-5 flex gap-2 overflow-x-auto pr-5 md:mr-0 md:pr-0">
            {SORTS.map((s) => (
              <Link key={s.value} href={href({ orden: s.value })} className={chip(orden === s.value)}>
                {s.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="mx-auto mt-20 max-w-md text-center">
          <p className="font-display text-4xl">
            {total === 0 ? "Estamos preparando esta colección." : "Nada con ese filtro."}
          </p>
          <p className="mt-4 text-smoke">
            {total === 0
              ? "Mientras tanto, cuéntanos qué buscas y te mostramos opciones por WhatsApp."
              : "Prueba con otra familia o escríbenos y te recomendamos."}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            {total > 0 && (
              <Link href={href({ familia: undefined })} className="btn btn-ghost">
                Quitar filtros
              </Link>
            )}
            <a
              href={buildQuestionLink(`Hola Haru, busco algo en ${category.label}. ¿Me ayudas a elegir?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <WhatsappIcon className="h-4 w-4" />
              Pedir recomendación
            </a>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.id} product={product} priority={i < 4} />
          ))}
        </div>
      )}
    </div>
  );
}
