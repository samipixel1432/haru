"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";

export function Gallery({ name, images }: { name: string; images: string[] }) {
  const [current, setCurrent] = useState(0);
  const list = images.length > 0 ? images : [null];

  return (
    <div className="md:sticky md:top-28 md:self-start">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand">
        <ProductImage
          src={list[current]}
          alt={`${name}, foto ${current + 1}`}
          sizes="(max-width: 768px) 100vw, 55vw"
          priority
        />
      </div>
      {list.length > 1 && (
        <ul className="no-scrollbar mt-3 flex gap-2 overflow-x-auto" aria-label="Fotos del producto">
          {list.map((src, i) => (
            <li key={`${src}-${i}`} className="flex-shrink-0">
              <button
                onClick={() => setCurrent(i)}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={i === current}
                className={`relative block h-20 w-16 overflow-hidden bg-sand border transition-colors ${
                  i === current ? "border-ink" : "border-line hover:border-ink/50"
                }`}
              >
                <ProductImage src={src} alt="" sizes="64px" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
