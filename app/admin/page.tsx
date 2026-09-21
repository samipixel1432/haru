import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/whatsapp";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { SignOutButton } from "@/components/admin/SignOutButton";

export default async function AdminDashboard() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif-display text-2xl text-ink">Panel de productos</h1>
          <p className="text-sm text-ink/50">{products.length} producto(s) publicados</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/admin/productos/nuevo"
            className="border border-gold bg-gold px-4 py-2 text-xs tracking-[0.15em] text-white hover:opacity-90"
          >
            + NUEVO PRODUCTO
          </Link>
          <Link
            href="/admin/productos/lote"
            className="border border-gold/50 px-4 py-2 text-xs tracking-[0.15em] text-ink hover:border-gold hover:bg-gold hover:text-white"
          >
            CARGA MASIVA
          </Link>
          <SignOutButton />
        </div>
      </div>

      <div className="mt-10 divide-y divide-gold/15 border-t border-gold/15">
        {products.length === 0 && (
          <p className="py-10 text-center text-sm text-ink/50">
            Aún no hay productos. Crea el primero.
          </p>
        )}
        {products.map((product) => (
          <div key={product.id} className="flex items-center gap-4 py-4">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden bg-white">
              {product.image_url ? (
                <Image src={product.image_url} alt={product.name} fill className="object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-cream to-gold/10" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-ink">{product.name}</p>
              <p className="text-xs text-ink/50">
                {product.category} · Stock: {product.stock} {product.featured && "· Destacado"}
              </p>
            </div>
            <p className="text-sm text-ink/70">{formatPrice(product.price)}</p>
            <Link
              href={`/admin/productos/${product.id}`}
              className="text-xs text-gold underline hover:text-gold-light"
            >
              Editar
            </Link>
            <DeleteProductButton id={product.id} name={product.name} />
          </div>
        ))}
      </div>
    </div>
  );
}
