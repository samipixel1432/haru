import { notFound } from "next/navigation";
import { getProduct } from "@/lib/products";
import { ProductForm } from "@/components/admin/ProductForms";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <h1 className="font-serif-display text-2xl text-ink">Editar producto</h1>
      <ProductForm product={product} />
    </div>
  );
}
