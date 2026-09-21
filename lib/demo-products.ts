import { Product } from "./types";

/**
 * Catálogo de muestra usado solo mientras Supabase no está configurado
 * (ver lib/products.ts). Permite previsualizar el diseño sin base de datos.
 */
export const DEMO_PRODUCTS: Product[] = [
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
