"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  return (
    <div className="mt-8">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-gold/40">
          <button
            className="px-3 py-2 text-lg text-ink/70 hover:text-gold"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Restar cantidad"
          >
            −
          </button>
          <span className="min-w-[2rem] text-center text-sm">{quantity}</span>
          <button
            className="px-3 py-2 text-lg text-ink/70 hover:text-gold"
            onClick={() => setQuantity((q) => q + 1)}
            aria-label="Sumar cantidad"
          >
            +
          </button>
        </div>
        <button
          onClick={() => {
            addItem(product, quantity);
            router.push("/carrito");
          }}
          className="flex-1 border border-gold bg-gold py-3 text-xs tracking-[0.2em] text-white transition-opacity hover:opacity-90"
        >
          AGREGAR AL CARRITO
        </button>
      </div>
    </div>
  );
}
