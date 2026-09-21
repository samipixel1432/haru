import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { LotusDivider } from "@/components/LotusDivider";
import { CATEGORIES } from "@/lib/types";

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <div>
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-ink px-5 py-24 text-center text-cream">
        <Image
          src="/brand/logo-black-gold-ring.jpeg"
          alt="Haru Boutique"
          width={120}
          height={120}
          className="rounded-full"
          priority
        />
        <h1 className="font-serif-display mt-8 text-4xl tracking-wide-plus md:text-6xl">HARU</h1>
        <p className="mt-2 text-xs tracking-[0.35em] text-gold">BOUTIQUE</p>
        <LotusDivider className="my-8" />
        <p className="max-w-md text-sm text-cream/70 md:text-base">
          Elegancia que trasciende. Perfumes, lociones y joyería seleccionados con amor, para tu
          día a día y tus momentos especiales.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria/${c.slug}`}
              className="border border-gold px-6 py-3 text-xs tracking-[0.2em] transition-colors hover:bg-gold hover:text-ink"
            >
              VER {c.label.toUpperCase()}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="text-center">
          <h2 className="font-serif-display text-2xl text-ink md:text-3xl">Destacados</h2>
          <LotusDivider className="mt-4 mb-10" />
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-5 text-center md:grid-cols-3">
          <div>
            <p className="font-serif-display text-lg text-gold">Calidad seleccionada</p>
            <p className="mt-2 text-sm text-ink/60">
              Cada producto se elige a mano por su calidad y presentación.
            </p>
          </div>
          <div>
            <p className="font-serif-display text-lg text-gold">Compra fácil</p>
            <p className="mt-2 text-sm text-ink/60">
              Agrega al carrito y envía tu pedido directo por WhatsApp.
            </p>
          </div>
          <div>
            <p className="font-serif-display text-lg text-gold">Atención cercana</p>
            <p className="mt-2 text-sm text-ink/60">
              Te acompañamos para elegir el producto perfecto para ti.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
