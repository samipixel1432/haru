-- Haru: galería de varias fotos por producto. Ejecutar una vez en el SQL Editor de Supabase.
alter table products add column if not exists gallery text[];
