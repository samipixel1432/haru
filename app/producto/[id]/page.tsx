import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/whatsapp";
import { NotesPyramid } from "@/components/NotesPyramid";
import { ProductCard, ProductDetailActions } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { Faq } from "@/components/Faq";
import { CATEGORIES, getFamilyLabel } from "@/lib/types";
import { FAQ, TRUST_POINTS } from "@/lib/store-config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description ?? `${product.name} en Haru.`,
    openGraph: product.image_url ? { images: [product.image_url] } : undefined,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category);
  const family = getFamilyLabel(product.family);
  const related = (await getProducts(product.category)).filter((p) => p.id !== product.id).slice(0, 4);

  const specs = [
    { k: "Familia", v: family },
    { k: "Duración", v: product.longevity },
    { k: "Ocasión", v: product.occasion },
    { k: "Tamaño", v: product.size_ml ? `${product.size_ml} ml` : null },
  ].filter((s) => s.v);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? undefined,
    image: product.image_url ?? undefined,
    offers:
      product.price > 0
        ? {
            "@type": "Offer",
            priceCurrency: "COP",
            price: product.price,
            availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          }
        : undefined,
  };

  return (
    <div className="pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="mx-auto max-w-7xl px-5 pt-8 md:px-8 md:pt-12">
        <nav aria-label="Ruta" className="label text-[10px] text-muted">
          <Link href="/" className="link-u">Inicio</Link>
          {category && (
            <>
              {" / "}
              <Link href={`/categoria/${category.slug}`} className="link-u">{category.label}</Link>
            </>
          )}
          {" / "}
          <span className="text-ink">{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-10 md:grid-cols-[1.1fr_1fr] md:gap-16">
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand md:sticky md:top-28 md:self-start">
            <ProductImage
              src={product.image_url}
              alt={product.name}
              sizes="(max-width: 768px) 100vw, 55vw"
              priority
            />
          </div>

          <div>
            {family && <p className="label text-bronze">{family}</p>}
            <h1 className="font-display mt-3 text-5xl leading-[0.98] md:text-7xl">{product.name}</h1>
            <p className="mt-5 text-2xl tabular-nums">{formatPrice(product.price)}</p>
            {product.description && (
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-smoke">{product.description}</p>
            )}

            <ProductDetailActions product={product} />

            <NotesPyramid product={product} />

            {specs.length > 0 && (
              <dl className="mt-10 grid grid-cols-2 border-t border-line">
                {specs.map((s, i) => (
                  <div
                    key={s.k}
                    className={`border-b border-line py-4 ${i % 2 === 0 ? "pr-4" : "border-l pl-4"}`}
                  >
                    <dt className="label text-[10px] text-muted">{s.k}</dt>
                    <dd className="mt-1 text-sm">{s.v}</dd>
                  </div>
                ))}
              </dl>
            )}

            <ul className="mt-10 space-y-4 border-t border-line pt-8">
              {TRUST_POINTS.slice(0, 3).map((t) => (
                <li key={t.title} className="flex gap-4">
                  <span className="mt-2 h-px w-6 flex-shrink-0 bg-bronze" aria-hidden="true" />
                  <p className="text-sm text-smoke">
                    <span className="text-ink">{t.title}.</span> {t.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <section className="mx-auto mt-24 max-w-7xl px-5 md:mt-32 md:px-8">
        <p className="label text-bronze">Preguntas frecuentes</p>
        <div className="mt-6 max-w-3xl">
          <Faq items={FAQ.slice(0, 4)} />
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto mt-24 max-w-7xl px-5 md:mt-32 md:px-8">
          <h2 className="font-display text-4xl leading-none md:text-6xl">
            También te <em>puede gustar</em>
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
