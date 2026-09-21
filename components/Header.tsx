"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/lib/types";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  const links = [
    { href: "/", label: "Inicio" },
    ...CATEGORIES.map((c) => ({ href: `/categoria/${c.slug}`, label: c.label })),
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-cream/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/logo-white-gold-ring.jpeg"
            alt="Haru Boutique"
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="font-serif-display text-xl tracking-wide-plus text-ink">HARU</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors hover:text-gold ${
                pathname === link.href ? "text-gold" : "text-ink/80"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/carrito" className="relative flex items-center gap-1 text-ink/80 hover:text-gold">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.836l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.602-7.152.075-.306-.156-.598-.47-.598H5.106M7.5 14.25L5.106 5.272M7.5 14.25L6.75 17.25m6.75-14.25l-.75 3M15.75 3l-.75 3" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold text-[11px] font-medium text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            aria-label="Abrir menú"
            onClick={() => setOpen((v) => !v)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-gold/20 bg-cream px-5 py-3 md:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm tracking-wide text-ink/80 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
