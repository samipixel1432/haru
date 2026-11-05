"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/types";
import { useCart } from "@/lib/cart-context";
import { BagIcon, CloseIcon, MenuIcon, LotusMark } from "@/components/Icons";

const LINKS = [
  ...CATEGORIES.map((c) => ({ href: `/categoria/${c.slug}`, label: c.label })),
  { href: "/encuentra-tu-aroma", label: "Encuentra tu aroma" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line bg-paper/92 backdrop-blur-md">
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 py-3 md:px-8">
        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`label link-u py-2 ${pathname === link.href ? "text-bronze" : "text-ink"}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          className="-ml-2 flex h-11 w-11 items-center justify-center lg:hidden"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </button>

        <Link href="/" className="flex flex-col items-center leading-none" aria-label="Haru, inicio">
          <span className="font-display text-[28px] tracking-[0.32em] pl-[0.32em] md:text-[32px]">HARU</span>
        </Link>

        <div className="flex items-center justify-end">
          <button
            onClick={openDrawer}
            className="label relative -mr-2 flex h-11 items-center gap-2 px-2"
            aria-label={`Abrir carrito, ${totalItems} producto${totalItems === 1 ? "" : "s"}`}
          >
            <span className="hidden lg:inline">Carrito</span>
            <BagIcon />
            {totalItems > 0 && (
              <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-medium text-paper">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div
          className="on-dark fixed inset-0 z-50 flex flex-col bg-night px-6 py-4 text-paper"
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
        >
          <div className="flex items-center justify-between">
            <span className="font-display text-[28px] tracking-[0.32em]">HARU</span>
            <button
              className="-mr-2 flex h-11 w-11 items-center justify-center"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>
          <nav aria-label="Menú móvil" className="mt-14 flex flex-1 flex-col gap-2">
            {[{ href: "/", label: "Inicio" }, ...LINKS].map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rise font-display border-b border-paper/10 py-4 text-[34px] leading-tight"
                style={{ animationDelay: `${i * 70}ms` }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pb-4 text-paper/60">
            <LotusMark className="h-5 w-8" />
          </div>
        </div>
      )}
    </>
  );
}
