import { createClient as createServerSupabase, isSupabaseConfigured } from "./supabase/server";
import { Product } from "./types";

/**
 * Catálogo de muestra usado solo mientras Supabase no está configurado
 * (ver isSupabaseConfigured abajo). Permite previsualizar el diseño sin base de datos.
 */
const DEMO_PRODUCTS: Product[] = [
  {
    id: "demo-1",
    name: "Club de Nuit Intense",
    description: "Fragancia amaderada intensa, ideal para uso nocturno.",
    price: 125000,
    category: "perfumes",
    image_url: null,
    stock: 8,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Khamrah Zanqam",
    description: "Notas orientales dulces con toque de especias.",
    price: 145000,
    category: "perfumes",
    image_url: null,
    stock: 5,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    name: "212 VIP Rosé",
    description: "Fragancia floral fresca para el día.",
    price: 115000,
    category: "perfumes",
    image_url: null,
    stock: 6,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-4",
    name: "Collar Gota de Oro 18k",
    description: "Baño de oro 18k, dije en forma de gota.",
    price: 89000,
    category: "joyeria",
    image_url: null,
    stock: 12,
    featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-5",
    name: "Aretes Argolla Minimalista",
    description: "Acero quirúrgico, no se oxidan.",
    price: 45000,
    category: "joyeria",
    image_url: null,
    stock: 20,
    featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-6",
    name: "Pulsera Cadena Fina",
    description: "Baño de oro, ajustable.",
    price: 55000,
    category: "joyeria",
    image_url: null,
    stock: 15,
    featured: true,
    created_at: new Date().toISOString(),
  },
];

export async function getProducts(category?: string): Promise<Product[]> {
  if (!isSupabaseConfigured) {
    return category
      ? DEMO_PRODUCTS.filter((p) => p.category === category)
      : DEMO_PRODUCTS;
  }

  const supabase = await createServerSupabase();
  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (category) query = query.eq("category", category);

  const { data, error } = await query;
  if (error) {
    console.error("Error al cargar productos:", error.message);
    return [];
  }
  return data as Product[];
}

export async function getProduct(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured) {
    return DEMO_PRODUCTS.find((p) => p.id === id) ?? null;
  }

  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) return null;
  return data as Product;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getProducts();
  const featured = all.filter((p) => p.featured);
  return featured.length > 0 ? featured : all.slice(0, 6);
}
