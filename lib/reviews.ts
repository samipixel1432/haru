// Reseñas reales de clientes. Mientras esta lista esté vacía, la sección no se muestra.
// Agrega solo opiniones verdaderas, con permiso de quien las escribió.
export type Review = { name: string; city?: string; text: string; product?: string };

export const REVIEWS: Review[] = [];
