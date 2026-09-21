import Link from "next/link";
import { LotusDivider } from "./LotusDivider";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/20 bg-ink text-cream/80">
      <div className="mx-auto max-w-6xl px-5 py-12 text-center">
        <p className="font-serif-display text-2xl tracking-wide-plus text-cream">HARU</p>
        <p className="mt-1 text-xs tracking-[0.25em] text-gold">BOUTIQUE</p>
        <LotusDivider className="my-6" />
        <p className="mx-auto max-w-md text-sm text-cream/60">
          Elegancia que trasciende. Perfumes, lociones y joyería seleccionados con cuidado.
        </p>
        <div className="mt-6 flex justify-center gap-6 text-sm">
          <Link href="/categoria/perfumes" className="hover:text-gold">Perfumes</Link>
          <Link href="/categoria/joyeria" className="hover:text-gold">Joyería</Link>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gold"
          >
            WhatsApp
          </a>
        </div>
        <p className="mt-8 text-xs text-cream/40">
          © {new Date().getFullYear()} Haru Boutique. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
