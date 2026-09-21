import { CartItem, getCategoryLabel } from "./types";

export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573184124805";

export function formatPrice(value: number) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function buildWhatsappMessage(items: CartItem[]) {
  const lines = [
    "¡Hola Haru Boutique! Quiero hacer este pedido:",
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
        `   Precio: ${formatPrice(item.price)} c/u = ${formatPrice(item.price * item.quantity)}`,
        ""
      );

      return itemLines;
    }),
    `Total: ${formatPrice(items.reduce((sum, i) => sum + i.price * i.quantity, 0))}`,
  ];
  return lines.join("\n");
}

export function buildWhatsappLink(items: CartItem[]) {
  const text = encodeURIComponent(buildWhatsappMessage(items));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
