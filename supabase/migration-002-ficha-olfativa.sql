-- Haru Boutique — ficha olfativa de los perfumes.
-- Ejecutar UNA vez en el SQL Editor de Supabase. Es seguro volver a correrlo.

alter table products add column if not exists family text;
alter table products add column if not exists notes_top text;
alter table products add column if not exists notes_heart text;
alter table products add column if not exists notes_base text;
alter table products add column if not exists longevity text;
alter table products add column if not exists occasion text;
alter table products add column if not exists size_ml integer;
