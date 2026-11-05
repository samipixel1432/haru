"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product, CATEGORIES, FAMILIES, LONGEVITY_OPTIONS, OCCASION_OPTIONS } from "@/lib/types";
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
  const [family, setFamily] = useState(product?.family ?? "");
  const [longevity, setLongevity] = useState(product?.longevity ?? "");
  const [occasion, setOccasion] = useState(product?.occasion ?? "");
  const [sizeMl, setSizeMl] = useState(product?.size_ml?.toString() ?? "");
  const [notesTop, setNotesTop] = useState(product?.notes_top ?? "");
  const [notesHeart, setNotesHeart] = useState(product?.notes_heart ?? "");
  const [notesBase, setNotesBase] = useState(product?.notes_base ?? "");
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

    if (category === "perfumes") {
      const sizeNumber = Number(sizeMl);
      const extras: Partial<ProductInput> = {
        family: family || null,
        longevity: longevity || null,
        occasion: occasion || null,
        size_ml: sizeMl && !Number.isNaN(sizeNumber) ? sizeNumber : null,
        notes_top: notesTop.trim() || null,
        notes_heart: notesHeart.trim() || null,
        notes_base: notesBase.trim() || null,
      };
      // Solo enviamos un campo vacío si antes tenía valor (para poder borrarlo).
      // Así el panel sigue funcionando aunque la base de datos aún no tenga estas columnas.
      for (const key of Object.keys(extras) as (keyof typeof extras)[]) {
        const value = extras[key];
        const hadValue = Boolean(product?.[key]);
        if (value !== null || hadValue) (input as Record<string, unknown>)[key] = value;
      }
    }

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

      {category === "perfumes" && (
        <fieldset className="flex flex-col gap-5 border border-gold/30 p-4">
          <legend className="px-2 text-xs tracking-[0.1em] text-ink/60">
            Ficha olfativa (aparece en la página del producto y en el test)
          </legend>
          <p className="-mt-2 text-xs text-ink/50">
            Requiere haber corrido la migración SQL de supabase/migration-002-ficha-olfativa.sql.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs tracking-[0.1em] text-ink/60">Familia olfativa</label>
              <select
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              >
                <option value="">—</option>
                {FAMILIES.map((f) => (
                  <option key={f.slug} value={f.slug}>{f.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs tracking-[0.1em] text-ink/60">Tamaño (ml)</label>
              <input
                type="number"
                min={1}
                value={sizeMl}
                onChange={(e) => setSizeMl(e.target.value)}
                className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </div>
            <div>
              <label className="text-xs tracking-[0.1em] text-ink/60">Duración</label>
              <select
                value={longevity}
                onChange={(e) => setLongevity(e.target.value)}
                className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              >
                <option value="">—</option>
                {LONGEVITY_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs tracking-[0.1em] text-ink/60">Ocasión</label>
              <select
                value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
                className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              >
                <option value="">—</option>
                {OCCASION_OPTIONS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>
          {[
            { label: "Notas de salida", value: notesTop, set: setNotesTop, ph: "Limón, bergamota…" },
            { label: "Notas de corazón", value: notesHeart, set: setNotesHeart, ph: "Rosa, jazmín…" },
            { label: "Notas de fondo", value: notesBase, set: setNotesBase, ph: "Ámbar, vainilla…" },
          ].map((n) => (
            <div key={n.label}>
              <label className="text-xs tracking-[0.1em] text-ink/60">{n.label}</label>
              <input
                value={n.value}
                onChange={(e) => n.set(e.target.value)}
                placeholder={n.ph}
                className="mt-1 w-full border border-gold/30 bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </div>
          ))}
        </fieldset>
      )}

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
