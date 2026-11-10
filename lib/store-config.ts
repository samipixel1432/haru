// Textos editables de la tienda. Todo lo que aparece aquí es una afirmación pública:
// ajusta las políticas (envíos, cambios, pagos) a lo que Haru realmente ofrece.

export const STORE = {
  name: "Haru",
  siteUrl: "https://haru-zeta-blond.vercel.app",
  tagline: "Atelier de aromas y joyas",
  announcement: "Asesoría personal por WhatsApp.",
  // Pon un monto en COP para activar la barra de envío gratis en el carrito. null = desactivada.
  freeShippingThreshold: null as number | null,
};

export const TRUST_POINTS = [
  { title: "Asesoría personal", text: "Una persona real te ayuda a elegir, por WhatsApp." },
  { title: "Selección curada", text: "Pocas piezas, elegidas una a una." },
  { title: "Sin cuentas ni formularios", text: "Armas tu pedido y lo confirmas en un mensaje." },
  { title: "Confirmamos antes de cobrar", text: "Disponibilidad y envío acordados contigo primero." },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "¿Cómo hago mi pedido?",
    a: "Agrega lo que quieras al carrito y toca “Enviar pedido por WhatsApp”. Te llega un mensaje ya armado con cada producto, su foto y el total; solo lo envías y te respondemos.",
  },
  {
    q: "¿Cómo se paga?",
    a: "El medio de pago lo acordamos contigo por WhatsApp una vez confirmamos disponibilidad. No se te cobra nada al armar el pedido.",
  },
  {
    q: "¿Hacen envíos?",
    a: "Sí, coordinamos el envío contigo por WhatsApp según tu ciudad. Escríbenos y te decimos tiempos y costo antes de que pagues.",
  },
  {
    q: "No sé qué aroma elegir",
    a: "Haz el test “Encuentra tu aroma” (1 minuto) o escríbenos contándonos qué te gusta: te recomendamos opciones según tu estilo y presupuesto.",
  },
  {
    q: "¿Puedo cambiar o consultar un producto antes de comprarlo?",
    a: "Claro. Antes de pagar puedes preguntarnos lo que quieras sobre un producto: notas, duración, tamaño o disponibilidad.",
  },
];

export const HOW_IT_WORKS = [
  { n: "01", title: "Elige", text: "Explora por familia olfativa o haz el test de 1 minuto." },
  { n: "02", title: "Envía tu pedido", text: "Un solo mensaje de WhatsApp con todo el detalle." },
  { n: "03", title: "Recíbelo", text: "Confirmamos disponibilidad, pago y envío contigo." },
];
