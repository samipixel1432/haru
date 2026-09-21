"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { formatPrice, buildWhatsappLink } from "@/lib/whatsapp";
import { LotusDivider } from "@/components/LotusDivider";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <div className="text-center">
        <h1 className="font-serif-display text-3xl text-ink">Tu carrito</h1>
        <LotusDivider className="mt-4 mb-4" />
        <p className="text-sm text-ink/50">Revisa tu pedido antes de enviarlo por WhatsApp.</p>
      </div>

      {items.length === 0 ? (
        <div className="mt-16 text-center">
          <p className="text-sm text-ink/60">Todavía no agregaste productos.</p>
          <Link
            href="/"
            className="mt-6 inline-block border border-gold px-6 py-3 text-xs tracking-[0.2em] hover:bg-gold hover:text-white"
          >
            VER PRODUCTOS
          </Link>
        </div>
      ) : (
        <div className="mt-12">
          <ul className="divide-y divide-gold/15">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-5">
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-white">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-cream to-gold/10">
                      <svg viewBox="0 0 64 40" className="h-6 w-10 text-gold/50" fill="none" stroke="currentColor" strokeWidth="1.2">
                        <path d="M32 6 C36 14 36 22 32 30 C28 22 28 14 32 6 Z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-serif-display text-base text-ink">{item.name}</p>
                  <p className="mt-1 text-sm text-ink/60">{formatPrice(item.price)}</p>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center border border-gold/40">
                      <button
                        className="px-2 py-1 text-ink/70 hover:text-gold"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Restar cantidad"
                      >
                        −
                      </button>
                      <span className="min-w-[1.75rem] text-center text-sm">{item.quantity}</span>
                      <button
                        className="px-2 py-1 text-ink/70 hover:text-gold"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Sumar cantidad"
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="text-xs text-ink/40 underline hover:text-red-700"
                      onClick={() => removeItem(item.id)}
                    >
                      Quitar
                    </button>
                  </div>
                </div>
                <p className="text-sm text-ink/80">{formatPrice(item.price * item.quantity)}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between border-t border-gold/20 pt-6">
            <span className="font-serif-display text-lg">Total</span>
            <span className="font-serif-display text-lg text-gold">{formatPrice(totalPrice)}</span>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={buildWhatsappLink(items)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 border border-gold bg-gold py-3 text-xs tracking-[0.2em] text-white hover:opacity-90"
            >
              ENVIAR PEDIDO POR WHATSAPP
            </a>
            <button
              onClick={clearCart}
              className="py-2 text-xs tracking-[0.15em] text-ink/40 underline hover:text-red-700"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
