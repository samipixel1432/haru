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
abajo), el sitio funciona con 6 productos de ejemplo (`lib/demo-products.ts`) solo para que
puedas ver el diseño — no se guardan cambios reales y el panel `/admin` queda abierto sin
login.

## Configurar Supabase (para productos reales y el panel admin)

1. Crea una cuenta y un proyecto gratis en [supabase.com](https://supabase.com).
2. En tu proyecto, ve a **SQL Editor** y pega el contenido de
   [`supabase/schema.sql`](supabase/schema.sql), luego ejecútalo. Esto crea la tabla
   `products` y el bucket de imágenes `product-images`.
3. Ve a **Authentication > Users** y crea un usuario (tu correo y una contraseña) — con ese
   usuario vas a entrar a `/admin`. Puedes desactivar el registro público en
   **Authentication > Settings** para que nadie más pueda crear cuentas.
4. Ve a **Project Settings > API** y copia la **Project URL** y la **anon public key**.
5. Copia `.env.local.example` a `.env.local` y pega esos valores:

   ```bash
   cp .env.local.example .env.local
   ```

6. Reinicia `npm run dev`. Ahora el catálogo lee/escribe de tu base de datos real y
   `/admin` pide login.

## Panel de administración

- Entra a `/admin/login` con el usuario que creaste en Supabase.
- Desde `/admin` puedes crear, editar y eliminar productos (foto, nombre, descripción,
  precio, categoría, stock y si aparece en "Destacados" de la portada).
- Las fotos se suben directo al bucket `product-images` de Supabase Storage.

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
