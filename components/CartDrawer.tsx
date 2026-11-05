"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/lib/cart-context";
import { buildWhatsappLink, formatPrice } from "@/lib/whatsapp";
import { STORE } from "@/lib/store-config";
import { CloseIcon, WhatsappIcon } from "@/components/Icons";
import { ProductImage } from "@/components/ProductImage";

export function CartDrawer() {
  const { items, drawerOpen, closeDrawer, updateQuantity, removeItem, totalPrice, totalItems } =
    useCart();

  useEffect(() => {
    if (!drawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [drawerOpen, closeDrawer]);

  const threshold = STORE.freeShippingThreshold;
  const remaining = threshold ? Math.max(0, threshold - totalPrice) : 0;

  return (
    <div
      className={`fixed inset-0 z-[60] ${drawerOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!drawerOpen}
    >
      <div
        onClick={closeDrawer}
        className={`absolute inset-0 bg-night/55 transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0"
        }`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Tu carrito"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-paper shadow-2xl transition-transform duration-500 [transition-timing-function:var(--ease-out)] ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 className="font-display text-2xl">
            Tu carrito <span className="label text-muted">({totalItems})</span>
          </h2>
          <button
            onClick={closeDrawer}
            aria-label="Cerrar carrito"
            className="-mr-2 flex h-11 w-11 items-center justify-center"
          >
            <CloseIcon />
          </button>
        </div>

        {threshold && items.length > 0 && (
          <div className="border-b border-line px-6 py-3">
            <p className="label text-[10px] text-smoke">
              {remaining > 0
                ? `Te faltan ${formatPrice(remaining)} para envío gratis`
                : "Tu pedido tiene envío gratis"}
            </p>
            <div className="mt-2 h-px w-full bg-line">
              <div
                className="h-px bg-bronze transition-all duration-500"
                style={{ width: `${Math.min(100, (totalPrice / threshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
            <p className="font-display text-3xl">Aún no hay nada aquí.</p>
            <p className="max-w-xs text-sm text-muted">
              Empieza por el test de 1 minuto y te mostramos lo que va contigo.
            </p>
            <Link href="/encuentra-tu-aroma" onClick={closeDrawer} className="btn">
              Encontrar mi aroma
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 flex-shrink-0 overflow-hidden bg-sand">
                    <ProductImage src={item.image_url} alt={item.name} sizes="80px" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-display text-xl leading-tight">{item.name}</p>
                    <p className="mt-1 text-sm text-muted">{formatPrice(item.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-line">
                        <button
                          className="flex h-10 w-10 items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Restar una unidad de ${item.name}`}
                        >
                          −
                        </button>
                        <span className="min-w-[1.75rem] text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          className="flex h-10 w-10 items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Sumar una unidad de ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="label link-u py-2 text-[10px] text-muted"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-line bg-sand/50 px-6 py-5">
              <div className="flex items-baseline justify-between">
                <span className="label text-muted">Total</span>
                <span className="font-display text-3xl tabular-nums">{formatPrice(totalPrice)}</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                Envío y pago se acuerdan por WhatsApp. No cobramos nada aquí.
              </p>
              <a
                href={buildWhatsappLink(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-4 w-full"
              >
                <WhatsappIcon className="h-4 w-4" />
                Enviar pedido por WhatsApp
              </a>
              <Link href="/carrito" onClick={closeDrawer} className="btn btn-ghost mt-2 w-full">
                Ver carrito y agregar mis datos
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
