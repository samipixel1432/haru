import { notFound } from "next/navigation";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { LotusDivider } from "@/components/LotusDivider";
import { CATEGORIES } from "@/lib/types";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (!category) notFound();

  const products = await getProducts(slug);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <div className="text-center">
        <h1 className="font-serif-display text-3xl text-ink">{category.label}</h1>
        <LotusDivider className="mt-4 mb-12" />
      </div>

      {products.length === 0 ? (
        <p className="text-center text-sm text-ink/60">
          Todavía no hay productos en esta categoría. Vuelve pronto.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
