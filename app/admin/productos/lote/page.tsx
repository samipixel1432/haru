import { BulkProductForm } from "@/components/admin/BulkProductForm";

export default function BulkProductsPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <h1 className="font-serif-display text-2xl text-ink">Carga masiva de productos</h1>
      <p className="mt-2 text-sm text-ink/50">
        Agrega muchos productos de una sola vez pegando la lista.
      </p>
      <BulkProductForm />
    </div>
  );
}
