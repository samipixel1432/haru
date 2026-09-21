import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { formatPrice } from "@/lib/whatsapp";
import { ProductDetailActions } from "@/components/ProductCard";
import { CATEGORIES } from "@/lib/types";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  const category = CATEGORIES.find((c) => c.slug === product.category);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <nav className="mb-8 text-xs text-ink/50">
        <Link href="/" className="hover:text-gold">Inicio</Link>
        {category && (
          <>
            {" / "}
            <Link href={`/categoria/${category.slug}`} className="hover:text-gold">
              {category.label}
            </Link>
          </>
        )}
        {" / "}
        <span className="text-ink/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream to-gold/10">
              <svg viewBox="0 0 64 40" className="h-16 w-28 text-gold/50" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M32 6 C36 14 36 22 32 30 C28 22 28 14 32 6 Z" />
                <path d="M20 12 C24 18 26 24 26 30 C19 27 15 21 14 15 C16 13 18 12 20 12 Z" />
                <path d="M44 12 C40 18 38 24 38 30 C45 27 49 21 50 15 C48 13 46 12 44 12 Z" />
              </svg>
            </div>
          )}
        </div>

        <div>
          <p className="text-xs tracking-[0.25em] text-gold">{category?.label ?? product.category}</p>
          <h1 className="font-serif-display mt-2 text-3xl text-ink">{product.name}</h1>
          <p className="mt-4 text-xl text-ink/80">{formatPrice(product.price)}</p>
          {product.description && (
            <p className="mt-6 text-sm leading-relaxed text-ink/60">{product.description}</p>
          )}
          <ProductDetailActions product={product} />
        </div>
      </div>
    </div>
  );
}
