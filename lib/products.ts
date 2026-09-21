import { createClient as createServerSupabase, isSupabaseConfigured } from "./supabase/server";
import { DEMO_PRODUCTS } from "./demo-products";
import { Product } from "./types";

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
