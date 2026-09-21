-- Haru Boutique — esquema de base de datos
-- Ejecutar en el SQL Editor de tu proyecto de Supabase.

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric not null check (price >= 0),
  category text not null,
  image_url text,
  stock integer not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

alter table products enable row level security;

-- Cualquiera puede leer el catálogo (tienda pública)
create policy "Lectura pública de productos"
  on products for select
  using (true);

-- El login de /admin es propio de la app (usuario/clave, ver lib/admin-auth.ts),
-- no usa Supabase Auth, así que las escrituras se permiten con la clave anon
-- (la ruta /admin ya está protegida por el login antes de llegar aquí).
create policy "Escritura de productos"
  on products for insert
  with check (true);

create policy "Actualización de productos"
  on products for update
  using (true)
  with check (true);

create policy "Borrado de productos"
  on products for delete
  using (true);

-- Storage: bucket público para fotos de producto.
-- Crea el bucket "product-images" desde el panel de Supabase (Storage > New bucket,
-- marcado como "Public"), y luego corre esto para las políticas de escritura:

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Lectura pública de imágenes"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Subida de imágenes"
  on storage.objects for insert
  with check (bucket_id = 'product-images');

create policy "Borrado de imágenes"
  on storage.objects for delete
  using (bucket_id = 'product-images');
