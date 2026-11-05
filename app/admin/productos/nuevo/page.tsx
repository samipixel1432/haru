import { ProductForm } from "@/components/admin/ProductForms";

export default function NewProductPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-12">
      <h1 className="font-serif-display text-2xl text-ink">Nuevo producto</h1>
      <ProductForm />
    </div>
  );
}
