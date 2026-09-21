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

-- Solo usuarios autenticados (la dueña, vía /admin) pueden crear/editar/borrar
create policy "Escritura solo autenticados"
  on products for insert
  to authenticated
  with check (true);

create policy "Actualización solo autenticados"
  on products for update
  to authenticated
  using (true)
  with check (true);

create policy "Borrado solo autenticados"
  on products for delete
  to authenticated
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

create policy "Subida de imágenes solo autenticados"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Borrado de imágenes solo autenticados"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
