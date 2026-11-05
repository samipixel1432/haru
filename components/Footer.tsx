import Image from "next/image";
import Link from "next/link";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";
import { FAMILIES } from "@/lib/types";
import { WhatsappIcon } from "@/components/Icons";

export function Footer() {
  return (
    <footer className="on-dark border-t border-paper/10 bg-night text-paper">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Image
            src="/brand/logo-black-gold-ring.jpeg"
            alt="Haru Boutique"
            width={72}
            height={72}
            className="rounded-full"
          />
          <p className="font-display mt-6 max-w-xs text-2xl leading-snug text-paper/90">
            Lo que dejas al pasar.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost mt-6"
          >
            <WhatsappIcon className="h-4 w-4" />
            Escríbenos
          </a>
        </div>

        <nav aria-label="Tienda">
          <p className="label text-paper/50">Tienda</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/categoria/perfumes" className="link-u">Perfumes y Lociones</Link></li>
            <li><Link href="/categoria/joyeria" className="link-u">Joyería</Link></li>
            <li><Link href="/encuentra-tu-aroma" className="link-u">Encuentra tu aroma</Link></li>
            <li><Link href="/carrito" className="link-u">Carrito</Link></li>
          </ul>
        </nav>

        <nav aria-label="Familias olfativas">
          <p className="label text-paper/50">Por familia</p>
          <ul className="mt-4 space-y-3 text-sm">
            {FAMILIES.map((f) => (
              <li key={f.slug}>
                <Link href={`/categoria/perfumes?familia=${f.slug}`} className="link-u">
                  {f.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-paper/50">Ayuda</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link href="/#preguntas" className="link-u">Preguntas frecuentes</Link></li>
            <li><Link href="/#como-funciona" className="link-u">Cómo comprar</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10">
        <p className="label mx-auto max-w-7xl px-5 py-5 text-[10px] text-paper/45 md:px-8">
          © {new Date().getFullYear()} Haru Boutique · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
