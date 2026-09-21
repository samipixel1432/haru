"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product, CATEGORIES } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { createProduct, updateProduct, ProductInput } from "@/app/admin/actions";

export function ProductForm({ product }: { product?: Product }) {
  const isEdit = Boolean(product);
  const router = useRouter();

  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState(product?.price?.toString() ?? "");
  const [category, setCategory] = useState(product?.category ?? CATEGORIES[0].slug);
  const [stock, setStock] = useState(product?.stock?.toString() ?? "0");
  const [featured, setFeatured] = useState(product?.featured ?? false);
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("product-images")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setImageUrl(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const priceNumber = Number(price);
    const stockNumber = Number(stock);
    if (!name.trim() || Number.isNaN(priceNumber) || priceNumber < 0) {
      setError("Revisa el nombre y el precio del producto.");
      return;
    }

    const input: ProductInput = {
      name: name.trim(),
      description: description.trim(),
      price: priceNumber,
      category,
      image_url: imageUrl || null,
      stock: Number.isNaN(stockNumber) ? 0 : stockNumber,
      featured,
    };

    setSaving(true);
    const result = isEdit ? await updateProduct(product!.id, input) : await createProduct(input);
    setSaving(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
      <div>
        <label className="text-xs tracking-[0.1em] text-ink/60">Foto del producto</label>
        <div className="mt-2 flex items-center gap-4">
          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-white border border-gold/20">
            {imageUrl ? (
              <Image src={imageUrl} alt="" fill className="object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-cream to-gold/10" />
            )}
          </div>
          <input type="file" accept="image/*" onChange={handleImageChange} className="text-xs" />
        </div>
        {uploading && <p className="mt-1 text-xs text-ink/50">Subiendo imagen...</p>}
      </div>

      <div>
        <label className="text-xs tracking-[0.1em] text-ink/60">Nombre</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="text-xs tracking-[0.1em] text-ink/60">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs tracking-[0.1em] text-ink/60">Precio (COP)</label>
          <input
            required
            type="number"
            min={0}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs tracking-[0.1em] text-ink/60">Stock</label>
          <input
            type="number"
            min={0}
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="text-xs tracking-[0.1em] text-ink/60">Categoría</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
        >
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink/70">
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />
        Mostrar en destacados de la portada
      </label>

      {error && <p className="text-xs text-red-700">{error}</p>}

      <div className="mt-2 flex gap-3">
        <button
          type="submit"
          disabled={saving || uploading}
          className="border border-gold bg-gold px-6 py-3 text-xs tracking-[0.2em] text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "GUARDANDO..." : isEdit ? "GUARDAR CAMBIOS" : "CREAR PRODUCTO"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="px-6 py-3 text-xs tracking-[0.2em] text-ink/50 hover:text-ink"
        >
          CANCELAR
        </button>
      </div>
    </form>
  );
}
