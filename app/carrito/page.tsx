"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { formatPrice, buildWhatsappLink } from "@/lib/whatsapp";
import { STORE, TRUST_POINTS } from "@/lib/store-config";
import { ProductImage } from "@/components/ProductImage";
import { WhatsappIcon } from "@/components/Icons";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [notes, setNotes] = useState("");

  const threshold = STORE.freeShippingThreshold;
  const remaining = threshold ? Math.max(0, threshold - totalPrice) : 0;

  const field =
    "mt-2 w-full border border-line bg-transparent px-4 py-3 text-[15px] outline-none transition-colors focus:border-ink";

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-12 md:px-8 md:pt-20">
      <p className="label text-bronze">Tu pedido</p>
      <h1 className="font-display mt-3 text-6xl leading-none md:text-8xl">Carrito</h1>

      {items.length === 0 ? (
        <div className="mt-16 max-w-md">
          <p className="font-display text-4xl">Todavía no hay nada aquí.</p>
          <p className="mt-4 text-smoke">Empieza por el test o explora la colección.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/encuentra-tu-aroma" className="btn">Encontrar mi aroma</Link>
            <Link href="/categoria/perfumes" className="btn btn-ghost">Ver perfumes</Link>
          </div>
        </div>
      ) : (
        <div className="mt-12 grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            {threshold && (
              <div className="mb-6 border border-line p-4">
                <p className="label text-[10px]">
                  {remaining > 0
                    ? `Te faltan ${formatPrice(remaining)} para envío gratis`
                    : "Tu pedido tiene envío gratis"}
                </p>
                <div className="mt-3 h-px w-full bg-line">
                  <div className="h-px bg-bronze transition-all duration-500" style={{ width: `${Math.min(100, (totalPrice / threshold) * 100)}%` }} />
                </div>
              </div>
            )}

            <ul className="divide-y divide-line border-y border-line">
              {items.map((item) => (
                <li key={item.id} className="flex gap-5 py-6">
                  <Link href={`/producto/${item.id}`} className="relative h-32 w-24 flex-shrink-0 overflow-hidden bg-sand md:h-40 md:w-32">
                    <ProductImage src={item.image_url} alt={item.name} sizes="128px" />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-2xl leading-tight md:text-3xl">{item.name}</p>
                        <p className="mt-1 text-sm text-muted">{formatPrice(item.price)} c/u</p>
                      </div>
                      <p className="text-sm tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center gap-5 pt-4">
                      <div className="flex items-center border border-line">
                        <button
                          className="flex h-11 w-11 items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Restar una unidad de ${item.name}`}
                        >
                          −
                        </button>
                        <span className="min-w-[2rem] text-center text-sm tabular-nums">{item.quantity}</span>
                        <button
                          className="flex h-11 w-11 items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Sumar una unidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="label link-u py-2 text-[10px] text-muted">
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={clearCart} className="label link-u mt-5 py-2 text-[10px] text-muted">
              Vaciar carrito
            </button>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-line p-6 md:p-8">
              <h2 className="font-display text-3xl">Resumen</h2>
              <div className="mt-6 flex items-baseline justify-between border-t border-line pt-5">
                <span className="label text-muted">Total</span>
                <span className="font-display text-4xl tabular-nums">{formatPrice(totalPrice)}</span>
              </div>
              <p className="mt-2 text-xs text-muted">
                Envío y medio de pago los acordamos por WhatsApp. Aquí no se cobra nada.
              </p>

              <div className="mt-8 space-y-5">
                <label className="block text-sm">
                  <span className="label text-[10px] text-muted">Tu nombre (opcional)</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" className={field} />
                </label>
                <label className="block text-sm">
                  <span className="label text-[10px] text-muted">Ciudad de entrega (opcional)</span>
                  <input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" className={field} />
                </label>
                <label className="block text-sm">
                  <span className="label text-[10px] text-muted">Algo que debamos saber (opcional)</span>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} className={field} />
                </label>
              </div>

              <a
                href={buildWhatsappLink(items, { name, city, notes })}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-8 w-full"
              >
                <WhatsappIcon className="h-4 w-4" />
                Enviar pedido por WhatsApp
              </a>
              <p className="mt-3 text-center text-xs text-muted">
                Se abre WhatsApp con tu pedido listo. Tú lo envías.
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              {TRUST_POINTS.slice(0, 3).map((t) => (
                <li key={t.title} className="flex gap-4 text-sm text-smoke">
                  <span className="mt-2.5 h-px w-6 flex-shrink-0 bg-bronze" aria-hidden="true" />
                  <span><span className="text-ink">{t.title}.</span> {t.text}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      )}
    </div>
  );
}
