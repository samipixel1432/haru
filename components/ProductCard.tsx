"use client";

import Link from "next/link";
import { Product, getFamilyLabel } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";
import { ProductImage } from "@/components/ProductImage";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const { addItem } = useCart();
  const soldOut = product.stock <= 0;
  const family = getFamilyLabel(product.family);
  const notes = [product.notes_top, product.notes_heart].filter(Boolean).join(" · ");

  return (
    <article className="group flex flex-col">
      <Link
        href={`/producto/${product.id}`}
        className="relative block aspect-[4/5] overflow-hidden bg-sand"
        aria-label={product.name}
      >
        <div className="absolute inset-0 transition-transform duration-[900ms] [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]">
          <ProductImage
            src={product.image_url}
            alt={product.name}
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            priority={priority}
          />
        </div>
        {soldOut && (
          <span className="label absolute left-3 top-3 bg-paper px-2 py-1 text-[10px]">Agotado</span>
        )}
        {!soldOut && product.stock <= 3 && (
          <span className="label absolute left-3 top-3 bg-paper px-2 py-1 text-[10px] text-bronze">
            Últimas {product.stock}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        {family && <p className="label text-[10px] text-bronze">{family}</p>}
        <Link href={`/producto/${product.id}`} className="mt-1">
          <h3 className="font-display text-[22px] leading-tight md:text-2xl">{product.name}</h3>
        </Link>
        {notes && <p className="mt-1.5 line-clamp-2 text-[13px] leading-snug text-muted">{notes}</p>}
        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="text-sm tabular-nums">{formatPrice(product.price)}</p>
          <button
            onClick={() => addItem(product)}
            disabled={soldOut}
            className="label link-u py-2 text-[10px] disabled:opacity-40"
            aria-label={`Agregar ${product.name} al carrito`}
          >
            {soldOut ? "No disponible" : "Agregar +"}
          </button>
        </div>
      </div>
    </article>
  );
}
