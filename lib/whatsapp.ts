import { CartItem, getCategoryLabel } from "./types";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573184124805";

export type CustomerInfo = { name?: string; city?: string; notes?: string };

export function formatPrice(value: number) {
  if (value <= 0) return "Consultar precio";
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTotal(items: { price: number; quantity: number }[]) {
  const priced = items.filter((i) => i.price > 0);
  const sum = priced.reduce((s, i) => s + i.price * i.quantity, 0);
  if (priced.length === items.length) return formatPrice(sum);
  return sum > 0 ? `${formatPrice(sum)} + por confirmar` : "Por confirmar";
}

export function buildWhatsappMessage(items: CartItem[], customer?: CustomerInfo) {
  const lines = [
    "¡Hola Haru! Quiero hacer este pedido:",
    "",
    ...items.flatMap((item, index) => {
      const itemLines = [`${index + 1}. *${item.name}*`, `   Categoría: ${getCategoryLabel(item.category)}`];

      if (item.description) {
        itemLines.push(`   Descripción: ${item.description}`);
      }
      if (item.image_url) {
        itemLines.push(`   Foto: ${item.image_url}`);
      }

      itemLines.push(
        `   Cantidad: ${item.quantity}`,
        item.price > 0
          ? `   Precio: ${formatPrice(item.price)} c/u = ${formatPrice(item.price * item.quantity)}`
          : "   Precio: por confirmar",
        ""
      );

      return itemLines;
    }),
    `*Total: ${formatTotal(items)}*`,
  ];

  const customerLines = [
    customer?.name?.trim() && `Nombre: ${customer.name.trim()}`,
    customer?.city?.trim() && `Ciudad: ${customer.city.trim()}`,
    customer?.notes?.trim() && `Notas: ${customer.notes.trim()}`,
  ].filter(Boolean) as string[];

  if (customerLines.length > 0) {
    lines.push("", "*Mis datos*", ...customerLines);
  }

  return lines.join("\n");
}

export function buildWhatsappLink(items: CartItem[], customer?: CustomerInfo) {
  const text = encodeURIComponent(buildWhatsappMessage(items, customer));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}

export function buildQuestionLink(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
