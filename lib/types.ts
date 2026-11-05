export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  stock: number;
  featured: boolean;
  created_at: string;
  family?: string | null;
  notes_top?: string | null;
  notes_heart?: string | null;
  notes_base?: string | null;
  longevity?: string | null;
  occasion?: string | null;
  size_ml?: number | null;
};

export type CartItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image_url: string | null;
  quantity: number;
};

export const CATEGORIES = [
  { slug: "perfumes", label: "Perfumes y Lociones" },
  { slug: "joyeria", label: "Joyería" },
] as const;

export function getCategoryLabel(slug: string): string {
  return CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

export const FAMILIES = [
  { slug: "amaderado", label: "Amaderado", hint: "cedro, sándalo, vetiver" },
  { slug: "floral", label: "Floral", hint: "rosa, jazmín, peonía" },
  { slug: "citrico", label: "Cítrico", hint: "bergamota, limón, mandarina" },
  { slug: "ambar", label: "Ámbar y especias", hint: "vainilla, ámbar, canela" },
  { slug: "fresco", label: "Fresco", hint: "marino, menta, té verde" },
  { slug: "dulce", label: "Dulce", hint: "caramelo, tonka, frutos rojos" },
] as const;

export function getFamilyLabel(slug: string | null | undefined): string | null {
  if (!slug) return null;
  return FAMILIES.find((f) => f.slug === slug)?.label ?? slug;
}

export const LONGEVITY_OPTIONS = ["Suave (3–4 h)", "Moderada (5–7 h)", "Larga (8 h o más)"] as const;
export const OCCASION_OPTIONS = ["Día", "Noche", "Día y noche", "Ocasiones especiales"] as const;
