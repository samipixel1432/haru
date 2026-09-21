"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/whatsapp";
import { useCart } from "@/lib/cart-context";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col">
      <Link href={`/producto/${product.id}`} className="block overflow-hidden bg-white">
        <div className="relative aspect-square w-full overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream to-gold/10">
              <svg viewBox="0 0 64 40" className="h-10 w-16 text-gold/50" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M32 6 C36 14 36 22 32 30 C28 22 28 14 32 6 Z" />
                <path d="M20 12 C24 18 26 24 26 30 C19 27 15 21 14 15 C16 13 18 12 20 12 Z" />
                <path d="M44 12 C40 18 38 24 38 30 C45 27 49 21 50 15 C48 13 46 12 44 12 Z" />
              </svg>
            </div>
          )}
        </div>
      </Link>
      <div className="pt-3 text-center">
        <Link href={`/producto/${product.id}`}>
          <h3 className="font-serif-display text-base text-ink transition-colors hover:text-gold">
            {product.name}
          </h3>
        </Link>
        <p className="mt-1 text-sm text-ink/70">{formatPrice(product.price)}</p>
        <button
          onClick={() => addItem(product)}
          className="mt-3 w-full border border-gold/50 py-2 text-xs tracking-[0.2em] text-ink transition-colors hover:border-gold hover:bg-gold hover:text-white"
        >
          AGREGAR
        </button>
      </div>
    </div>
  );
}
