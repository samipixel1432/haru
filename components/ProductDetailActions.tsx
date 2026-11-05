"use client";

import { useEffect, useRef, useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { buildQuestionLink, buildWhatsappLink, formatPrice } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/Icons";

export function ProductDetailActions({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [stickyVisible, setStickyVisible] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const soldOut = product.stock <= 0;
  const maxQty = Math.max(1, product.stock);

  useEffect(() => {
    const el = anchorRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const directItem = {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    image_url: product.image_url,
    quantity,
  };

  return (
    <div className="mt-8">
      {product.stock > 0 && product.stock <= 5 && (
        <p className="label mb-4 text-[10px] text-bronze">
          {product.stock === 1 ? "Queda 1 unidad" : `Quedan ${product.stock} unidades`}
        </p>
      )}

      <div ref={anchorRef} className="flex flex-col gap-3">
        {soldOut ? (
          <a
            href={buildQuestionLink(`Hola Haru, ¿cuándo vuelve a estar disponible ${product.name}?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full"
          >
            <WhatsappIcon className="h-4 w-4" />
            Avísame cuando llegue
          </a>
        ) : (
          <>
            <div className="flex gap-3">
              <div className="flex items-center border border-line">
                <button
                  className="flex h-12 w-12 items-center justify-center text-lg"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Restar cantidad"
                >
                  −
                </button>
                <span className="min-w-[2rem] text-center text-sm tabular-nums" aria-live="polite">
                  {quantity}
                </span>
                <button
                  className="flex h-12 w-12 items-center justify-center text-lg"
                  onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                  aria-label="Sumar cantidad"
                >
                  +
                </button>
              </div>
              <button onClick={() => addItem(product, quantity)} className="btn flex-1">
                Agregar · {formatPrice(product.price * quantity)}
              </button>
            </div>
            <a
              href={buildWhatsappLink([directItem])}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost w-full"
            >
              <WhatsappIcon className="h-4 w-4" />
              Pedir solo este por WhatsApp
            </a>
          </>
        )}
      </div>

      {!soldOut && (
        <div
          className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
            stickyVisible ? "translate-y-0" : "translate-y-full"
          }`}
          aria-hidden={!stickyVisible}
        >
          <div className="flex items-center gap-4">
            <div className="min-w-0 flex-1">
              <p className="font-display truncate text-lg leading-tight">{product.name}</p>
              <p className="text-xs text-muted tabular-nums">{formatPrice(product.price)}</p>
            </div>
            <button
              onClick={() => addItem(product, 1)}
              className="btn !px-5"
              tabIndex={stickyVisible ? 0 : -1}
            >
              Agregar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
