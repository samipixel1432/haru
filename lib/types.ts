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
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
};

export const CATEGORIES = [
  { slug: "perfumes", label: "Perfumes y Lociones" },
  { slug: "joyeria", label: "Joyería" },
] as const;
