# Imágenes de Haru: prompts listos para pegar

No tengo acceso a la API de OpenAI desde esta sesión (no hay `OPENAI_API_KEY`), así que no se generaron imágenes. Aquí están los prompts exactos para `gpt-image` (o cualquier generador). El sitio ya funciona sin fotos con fondos atmosféricos; cuando las tengas, ponlas en `public/images/` y escribe la ruta en `lib/site-images.ts`.

## Bloque de estilo (pégalo al inicio de TODOS los prompts)

> Editorial luxury still-life photography, quiet and minimal, in the spirit of niche perfume houses. Warm bone-paper tones (#F2EDE4), deep ink black (#16130F), muted antique bronze accents (#7A5C3C). Single soft directional window light from the left, long gentle shadows, matte surfaces, natural film grain, shallow depth of field, generous negative space. Photographed on a 50mm lens. No text, no logos, no brand names, no watermark, no hands holding the product, no people's faces, no glitter, no neon, no stock-photo look.

Regla: nada de marcas reales ni etiquetas en los frascos. Usa vidrio sin marca para que la foto sirva con cualquier producto.

## Lista de imágenes

| Archivo | Tamaño | Dónde aparece | `lib/site-images.ts` |
|---|---|---|---|
| `hero.jpg` | 2400×1350 (16:9) | Fondo de la portada (se oscurece con degradado) | `hero` |
| `perfumes.jpg` | 1600×2000 (4:5) | Tarjeta "Perfumes" | `perfumes` |
| `joyeria.jpg` | 1600×2000 (4:5) | Tarjeta "Joyería" | `joyeria` |
| `story.jpg` | 1600×2000 (4:5) | Bloque manifiesto (opcional) | `story` |
| `quiz.jpg` | 2000×1200 | Banda del test (opcional) | `quiz` |

### 1. `hero.jpg`
[Bloque de estilo] A single unbranded clear glass perfume bottle with a matte black cap standing on a dark slate surface, very low-key lighting, the background falling into near-black with a faint warm bronze glow on the right, a few drifting dust particles caught in the light, generous empty space on the left for headline text. Moody, cinematic, quiet.

### 2. `perfumes.jpg`
[Bloque de estilo] Three unbranded amber and clear glass perfume bottles of different heights grouped on a dark walnut surface, raking light from the left, deep shadows, a single dried eucalyptus branch lying beside them, dark warm background, bronze highlights on the glass.

### 3. `joyeria.jpg`
[Bloque de estilo] A thin gold chain necklace with a small teardrop pendant and a pair of minimalist hoop earrings resting on a folded piece of natural unbleached linen, soft diffused window light, warm bone and sand colors, extremely clean composition, shallow depth of field on the pendant.

### 4. `story.jpg`
[Bloque de estilo] Close crop of a bare wrist and forearm resting on an unmade linen bed sheet, one fine perfume mist caught in the window light in front of it, intimate and calm, soft morning light, neutral warm tones, no face visible.

### 5. `quiz.jpg`
[Bloque de estilo] Flat-lay on a dark surface of six small ingredient groups arranged in an even row with space between them: bergamot slices, sandalwood chips, jasmine flowers, vanilla pods, green tea leaves, a single rose. Top-down, even soft light, deep black background, bronze-toned.

## Ingredientes sueltos (opcional, 1200×1200 cada uno)
Usa el bloque de estilo + una sola frase: *citrus slices on dark stone*, *sandalwood and cedar shavings*, *white jasmine flowers on linen*, *vanilla pods and dark amber resin*, *green tea leaves in soft mist*, *a single dew-covered garden rose on slate*.

## Cómo conectarlas
1. Guarda los archivos en `public/images/`.
2. En `lib/site-images.ts` cambia, por ejemplo, `hero: null` por `hero: "/images/hero.jpg"`.
3. Comprímelas a menos de 400 KB cada una (squoosh.app) para mantener la portada rápida.
