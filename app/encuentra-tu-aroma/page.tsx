import type { Metadata } from "next";
import { getProducts } from "@/lib/products";
import { Quiz } from "@/components/Quiz";

export const metadata: Metadata = {
  title: "Encuentra tu aroma",
  description: "Cuatro preguntas, un minuto. Descubre qué perfume va con tu estilo, tu momento del día y tu presupuesto.",
};

export default async function QuizPage() {
  const perfumes = await getProducts("perfumes");

  return (
    <div className="mx-auto max-w-5xl px-5 pb-28 pt-12 md:px-8 md:pt-20">
      <p className="label text-bronze">Encuentra tu aroma</p>
      <p className="mt-3 max-w-md text-smoke">Cuatro preguntas. Sin registro, sin correo.</p>
      <div className="mt-12">
        <Quiz products={perfumes} />
      </div>
    </div>
  );
}
