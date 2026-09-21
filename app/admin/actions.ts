"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ProductInput = {
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  stock: number;
  featured: boolean;
};

export async function createProduct(input: ProductInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").insert(input);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { error: null };
}

export async function createProductsBulk(inputs: ProductInput[]) {
  if (inputs.length === 0) return { error: null, count: 0 };

  const supabase = await createClient();
  const { error, count } = await supabase
    .from("products")
    .insert(inputs, { count: "exact" });

  if (error) return { error: error.message, count: 0 };
  revalidatePath("/", "layout");
  return { error: null, count: count ?? inputs.length };
}

export async function updateProduct(id: string, input: ProductInput) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").update(input).eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { error: null };
}

export async function deleteProduct(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/", "layout");
  return { error: null };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
}
