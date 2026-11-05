# Haru Boutique

Tienda online de Haru Boutique (perfumes, lociones y joyería): catálogo con carrito de
compras y pedidos enviados por WhatsApp, más un panel de administración privado para
subir y editar productos.

## Cómo correr el proyecto en tu computador

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). Mientras no configures Supabase (ver
abajo), el sitio funciona con 6 productos de ejemplo (`lib/products.ts`) solo para que
puedas ver el diseño — no se guardan cambios reales, pero el panel `/admin` sí pide login.

## Panel de administración

- Entra a `/admin/login` con el usuario **antonela** y la contraseña **antonela123**.
- Desde `/admin` puedes crear, editar y eliminar productos (foto, nombre, descripción,
  precio, categoría, stock y si aparece en "Destacados" de la portada).
- Para cambiar el usuario o la contraseña, define las variables de entorno
  `ADMIN_USERNAME` y `ADMIN_PASSWORD` (ver `.env.local.example`).

## Ficha olfativa de los perfumes (opcional)

Para guardar familia olfativa, notas de salida/corazón/fondo, duración, ocasión y tamaño de
cada perfume (se muestran en la página del producto y alimentan el test "Encuentra tu aroma"),
corre una vez `supabase/migration-002-ficha-olfativa.sql` en el SQL Editor de Supabase. Sin
esa migración el sitio funciona igual, solo que esos campos no se guardan.

Textos editables de la tienda (confianza, preguntas frecuentes, envío gratis): `lib/store-config.ts`.
Reseñas reales: `lib/reviews.ts`. Fotos editoriales: `lib/site-images.ts` y `design/image-prompts.md`.

## Configurar Supabase (para guardar productos de verdad)

1. Crea una cuenta y un proyecto gratis en [supabase.com](https://supabase.com).
2. En tu proyecto, ve a **SQL Editor** y pega el contenido de
   [`supabase/schema.sql`](supabase/schema.sql), luego ejecútalo. Esto crea la tabla
   `products` y el bucket de imágenes `product-images`.
3. Ve a **Project Settings > API** y copia la **Project URL** y la **anon public key**.
4. Copia `.env.local.example` a `.env.local` y pega esos valores:

   ```bash
   cp .env.local.example .env.local
   ```

5. Reinicia `npm run dev`. Ahora el catálogo lee/escribe de tu base de datos real. Las
   fotos que subas desde `/admin` se guardan en el bucket `product-images` de Supabase
   Storage.

## Número de WhatsApp para pedidos

Se configura con la variable `NEXT_PUBLIC_WHATSAPP_NUMBER` (ver `.env.local.example`),
actualmente `573184124805`. El botón "Enviar pedido por WhatsApp" del carrito arma un
mensaje con el detalle de cada producto, cantidades y el total.

## Publicar en Vercel

1. Sube este proyecto a un repositorio de GitHub.
2. En [vercel.com](https://vercel.com), importa el repositorio.
3. En la configuración del proyecto en Vercel, agrega las mismas variables de entorno de
   tu `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
   `NEXT_PUBLIC_WHATSAPP_NUMBER`).
4. Despliega. Vercel te da un link público para compartir con tus clientes.

## Estructura del proyecto

- `app/` — páginas (inicio, categoría, producto, carrito, admin).
- `components/` — componentes de UI reutilizables.
- `lib/` — clientes de Supabase, tipos, carrito (contexto), helper de WhatsApp.
- `supabase/schema.sql` — esquema de base de datos y políticas de seguridad.
