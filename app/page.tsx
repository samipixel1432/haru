import Image from "next/image";
import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Faq } from "@/components/Faq";
import { ArrowIcon, LotusMark, WhatsappIcon } from "@/components/Icons";
import { FAMILIES } from "@/lib/types";
import { HOW_IT_WORKS, TRUST_POINTS } from "@/lib/store-config";
import { REVIEWS } from "@/lib/reviews";
import { SITE_IMAGES } from "@/lib/site-images";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default async function Home() {
  const featured = (await getFeaturedProducts()).slice(0, 8);

  return (
    <div>
      {/* HERO */}
      <section className="on-dark grain relative isolate overflow-hidden bg-night text-paper">
        {SITE_IMAGES.hero ? (
          <>
            <Image src={SITE_IMAGES.hero} alt="" fill priority sizes="100vw" className="-z-10 object-cover opacity-70" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/40 to-night/20" />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[radial-gradient(55%_50%_at_78%_28%,rgba(184,156,120,0.26),transparent_70%),radial-gradient(45%_45%_at_8%_95%,rgba(122,92,60,0.32),transparent_70%)]"
          />
        )}
        <LotusMark className="pointer-events-none absolute -right-24 top-1/2 -z-10 hidden h-[640px] w-[1000px] -translate-y-1/2 text-paper/[0.07] md:block" />

        <div className="mx-auto flex min-h-[calc(100svh-96px)] max-w-7xl flex-col justify-end px-5 pb-14 pt-24 md:min-h-[min(88svh,820px)] md:px-8 md:pb-20">
          <p className="rise label text-bronze-soft">Haru · 春 · Primavera</p>
          <h1 className="rise rise-2 font-display mt-6 max-w-5xl text-[clamp(3.4rem,11.5vw,9rem)] leading-[0.92]">
            Lo que dejas
            <br />
            <em className="text-bronze-soft">al pasar.</em>
          </h1>
          <p className="rise rise-3 mt-8 max-w-md text-[17px] leading-relaxed text-paper/75">
            Perfumes y joyería elegidos uno a uno. Cuéntanos cómo eres y te decimos qué aroma te
            acompaña.
          </p>
          <div className="rise rise-4 mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/encuentra-tu-aroma" className="btn">
              Encontrar mi aroma
              <ArrowIcon />
            </Link>
            <Link href="/categoria/perfumes" className="btn btn-ghost">
              Ver perfumes
            </Link>
          </div>
        </div>
      </section>

      {/* CONFIANZA */}
      <section aria-label="Cómo te atendemos" className="border-b border-line">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {TRUST_POINTS.map((t, i) => (
            <li
              key={t.title}
              className={`px-5 py-7 md:px-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i >= 2 ? "border-t border-line md:border-t-0" : ""
              } ${i > 0 ? "md:border-l" : ""}`}
            >
              <p className="label text-[10px] text-bronze">{t.title}</p>
              <p className="mt-2 text-[13px] leading-snug text-smoke md:text-sm">{t.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* CATEGORÍAS */}
      <section className="mx-auto max-w-7xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="reveal flex items-end justify-between gap-6">
          <h2 className="font-display text-4xl leading-none md:text-6xl">
            Dos maneras
            <br className="md:hidden" /> de llevarte algo <em>tuyo</em>
          </h2>
        </div>
        <div className="mt-10 grid gap-4 md:mt-14 md:grid-cols-2 md:gap-6">
          <Link
            href="/categoria/perfumes"
            className="on-dark reveal group relative isolate flex aspect-[5/6] items-end overflow-hidden bg-night p-7 text-paper md:aspect-[4/5] md:p-10"
          >
            {SITE_IMAGES.perfumes ? (
              <Image src={SITE_IMAGES.perfumes} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="-z-10 object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            ) : (
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_70%_20%,rgba(184,156,120,0.35),transparent_70%),linear-gradient(160deg,#2b2117,#100e0b)] transition-transform duration-[1200ms] group-hover:scale-105" />
            )}
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-night/70 to-transparent" />
            <div>
              <p className="label text-bronze-soft">Aromas</p>
              <p className="font-display mt-2 text-5xl leading-none md:text-7xl">Perfumes</p>
              <p className="label link-u mt-6 inline-flex items-center gap-2 text-[11px]">
                Explorar <ArrowIcon />
              </p>
            </div>
          </Link>
          <Link
            href="/categoria/joyeria"
            className="reveal group relative isolate flex aspect-[5/6] items-end overflow-hidden bg-sand p-7 md:aspect-[4/5] md:p-10"
          >
            {SITE_IMAGES.joyeria ? (
              <Image src={SITE_IMAGES.joyeria} alt="" fill sizes="(max-width:768px) 100vw, 50vw" className="-z-10 object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
            ) : (
              <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_30%_20%,rgba(255,255,255,0.55),transparent_70%),linear-gradient(200deg,#e6dcc9,#cdbea3)] transition-transform duration-[1200ms] group-hover:scale-105" />
            )}
            <div>
              <p className="label text-bronze">Piezas</p>
              <p className="font-display mt-2 text-5xl leading-none md:text-7xl">Joyería</p>
              <p className="label link-u mt-6 inline-flex items-center gap-2 text-[11px]">
                Explorar <ArrowIcon />
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* DESTACADOS */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
          <div className="reveal flex items-end justify-between gap-6">
            <div>
              <p className="label text-bronze">Selección de la casa</p>
              <h2 className="font-display mt-3 text-4xl leading-none md:text-6xl">Para empezar</h2>
            </div>
            <Link href="/categoria/perfumes" className="label link-u hidden py-2 md:inline-block">
              Ver todo
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:mt-14 md:grid-cols-4 md:gap-x-6">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 2} />
            ))}
          </div>
        </section>
      )}

      {/* TEST */}
      <section className="on-dark mt-24 bg-night text-paper md:mt-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:items-center md:gap-20 md:px-8 md:py-28">
          <div className="reveal">
            <p className="label text-bronze-soft">Encuentra tu aroma</p>
            <h2 className="font-display mt-4 text-5xl leading-[0.98] md:text-7xl">
              ¿No sabes <em className="text-bronze-soft">cuál</em> elegir?
            </h2>
            <p className="mt-6 max-w-md text-paper/70">
              Cuatro preguntas, un minuto. Te mostramos los aromas que van con tu estilo, tu momento
              del día y la intensidad que buscas.
            </p>
            <Link href="/encuentra-tu-aroma" className="btn mt-9">
              Hacer el test
              <ArrowIcon />
            </Link>
          </div>
          <ol className="reveal divide-y divide-paper/12 border-y border-paper/12">
            {["¿Qué quieres transmitir?", "¿Para qué momento es?", "¿Qué tan presente lo quieres?", "Tus aromas, listos para pedir"].map(
              (step, i) => (
                <li key={step} className="flex items-baseline gap-5 py-5">
                  <span className="label text-bronze-soft">0{i + 1}</span>
                  <span className="font-display text-2xl md:text-3xl">{step}</span>
                </li>
              )
            )}
          </ol>
        </div>
      </section>

      {/* FAMILIAS */}
      <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
        <div className="reveal">
          <p className="label text-bronze">Por familia olfativa</p>
          <h2 className="font-display mt-3 text-4xl leading-none md:text-6xl">¿A qué te huele <em>bien</em>?</h2>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-px border border-line bg-line md:mt-14 md:grid-cols-3">
          {FAMILIES.map((f) => (
            <li key={f.slug} className="bg-paper">
              <Link
                href={`/categoria/perfumes?familia=${f.slug}`}
                className="group flex h-full min-h-[150px] flex-col justify-between p-5 transition-colors hover:bg-ink hover:text-paper md:min-h-[200px] md:p-8"
              >
                <span className="label text-[10px] text-bronze transition-colors group-hover:text-bronze-soft">
                  {f.hint}
                </span>
                <span className="font-display flex items-end justify-between text-3xl leading-none md:text-5xl">
                  {f.label}
                  <ArrowIcon className="h-5 w-5 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* MANIFIESTO */}
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pt-24 md:grid-cols-[1.2fr_1fr] md:gap-24 md:px-8 md:pt-36">
        <div className="reveal">
          <LotusMark className="h-7 w-12 text-bronze" />
          <p className="font-display mt-8 text-4xl leading-[1.05] md:text-6xl">
            Pocas piezas.
            <br />
            Bien <em>escogidas</em>.
            <br />
            Que se sientan tuyas.
          </p>
        </div>
        <div className="reveal self-end text-[17px] leading-relaxed text-smoke">
          <p>
            Haru, en japonés, es primavera: ese momento en que todo vuelve a abrirse. Así elegimos
            cada perfume y cada joya. Sin llenar estantes, sin ruido.
          </p>
          <p className="mt-5">
            Y como un aroma se elige mejor hablando, aquí no estás solo: una persona real te
            acompaña por WhatsApp hasta que encuentres el tuyo.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="label link-u mt-8 inline-flex items-center gap-2 py-2"
          >
            <WhatsappIcon className="h-4 w-4" /> Hablar con una persona
          </a>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" className="mx-auto max-w-7xl scroll-mt-24 px-5 pt-24 md:px-8 md:pt-36">
        <p className="reveal label text-bronze">Cómo comprar</p>
        <ol className="mt-8 grid border-t border-line md:grid-cols-3">
          {HOW_IT_WORKS.map((s, i) => (
            <li key={s.n} className={`reveal py-8 md:px-8 md:py-10 ${i > 0 ? "border-t border-line md:border-l md:border-t-0" : "md:pl-0"}`}>
              <span className="label text-bronze">{s.n}</span>
              <p className="font-display mt-3 text-4xl">{s.title}</p>
              <p className="mt-3 max-w-xs text-[15px] text-smoke">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* RESEÑAS (solo si existen reseñas reales) */}
      {REVIEWS.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
          <p className="reveal label text-bronze">Lo que dicen quienes ya compraron</p>
          <div className="mt-8 grid gap-px border border-line bg-line md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.name + r.text} className="bg-paper p-7">
                <blockquote className="font-display text-2xl leading-snug">“{r.text}”</blockquote>
                <figcaption className="label mt-5 text-[10px] text-muted">
                  {r.name}
                  {r.city ? ` · ${r.city}` : ""}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="preguntas" className="mx-auto grid max-w-7xl scroll-mt-24 gap-10 px-5 pt-24 md:grid-cols-[1fr_1.6fr] md:gap-20 md:px-8 md:pt-36">
        <div className="reveal">
          <p className="label text-bronze">Preguntas frecuentes</p>
          <h2 className="font-display mt-3 text-4xl leading-none md:text-6xl">Antes de pedir</h2>
        </div>
        <div className="reveal">
          <Faq />
        </div>
      </section>

      {/* CIERRE */}
      <section className="on-dark grain relative isolate mt-24 overflow-hidden bg-night text-paper md:mt-36">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(50%_70%_at_50%_120%,rgba(184,156,120,0.3),transparent_70%)]" />
        <div className="mx-auto max-w-3xl px-5 py-24 text-center md:py-36">
          <h2 className="reveal font-display text-5xl leading-[0.98] md:text-8xl">
            Hablemos de <em className="text-bronze-soft">tu aroma</em>.
          </h2>
          <p className="reveal mx-auto mt-6 max-w-md text-paper/70">
            Escríbenos y te recomendamos con calma, sin presión y sin compromiso.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn mt-10"
          >
            <WhatsappIcon className="h-4 w-4" />
            Escribir por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
