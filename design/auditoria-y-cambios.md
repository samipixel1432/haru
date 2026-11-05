# Haru: auditoría, dirección creativa y cambios

## Auditoría del sitio anterior (fallos priorizados)

**Críticos**
1. **Portada sin producto ni gancho.** Un logo en círculo y dos botones. No decía qué hace único a Haru ni empujaba a una acción de compra.
2. **Callejones sin salida.** Con 0 productos, "Destacados" y las categorías quedaban vacías, con un divisor decorativo y el texto "Todavía no hay productos".
3. **Ficha de producto pobre.** Foto, nombre, precio y una línea. No tenía notas olfativas, duración, ocasión, tamaño, confianza ni preguntas frecuentes, y no había cómo consultar un producto.
4. **Agregar al carrito te sacaba de la página** (redirección forzada a `/carrito`): rompe el flujo de compra.
5. **El pedido por WhatsApp no pedía datos de entrega** (nombre, ciudad).

**Importantes**
6. **Contraste insuficiente.** Texto dorado `#b8923f` sobre crema: 2,7:1 (mínimo AA: 4,5:1).
7. **Estética genérica.** Playfair Display + Inter + dorado brillante sobre negro.
8. Sin búsqueda por afinidad: ni familias olfativas, ni filtros, ni test.
9. Sin FAQ, sin bloque de confianza, sin barra de compra fija en móvil.
10. Objetivos táctiles pequeños (botones de cantidad de ~32 px) y sin estados de foco visibles.

**Menores**
11. Logo en JPEG con fondo propio dentro del header.
12. Sin datos estructurados de producto ni títulos por página para buscadores.

## Dirección creativa (elegida)

**Concepto: Haru, atelier de aromas y joyas.** *Haru* (春) es primavera: lo que despierta en silencio. Lujo discreto de nicho (referencias de método: Byredo, Diptyque, Henry Rose, Boy Smells), no lujo ostentoso.

| | |
|---|---|
| Paleta | Papel hueso `#F2EDE4`, tinta `#16130F`, noche `#100E0B`, bronce apagado `#7A5C3C` (texto, 4,9:1) / `#B89C78` (sobre fondo oscuro) |
| Tipografía | Instrument Serif (titulares, con cursiva como acento), Hanken Grotesk (texto), IBM Plex Mono (etiquetas técnicas) |
| Forma | Esquinas rectas, líneas finas de 1 px, mucho espacio en blanco |
| Movimiento | Entradas suaves de 0,6–0,9 s, hover lento en imágenes; todo respeta `prefers-reduced-motion` |
| Tono | Frases cortas y sensoriales, sin adjetivos vacíos. Titular: *"Lo que dejas al pasar."* |
| Foto | Naturaleza muerta editorial, luz lateral única, vidrio sin marca (ver `design/image-prompts.md`) |

## Qué cambió y por qué sube la conversión

| Cambio | Efecto esperado |
|---|---|
| Portada con promesa emocional + CTA único "Encontrar mi aroma" | Menos duda al llegar; lleva al visitante a una acción concreta |
| Test "Encuentra tu aroma" (4 preguntas) → recomienda 3 perfumes | Quita la parálisis de elegir; captura intención y la envía por WhatsApp |
| Filtros por familia olfativa y orden por precio | Encontrar rápido lo que va con cada persona |
| Ficha de producto con pirámide olfativa, duración, ocasión y tamaño | Responde las dudas antes de que pregunten |
| Barra de compra fija en móvil + carrito lateral (sin redirección) | Menos pasos entre "me gusta" y "lo pido" |
| Botón "Pedir solo este por WhatsApp" | Compra directa de un producto sin armar carrito |
| Carrito con nombre, ciudad y notas dentro del mensaje | Pedidos completos al primer mensaje |
| Escasez honesta ("Quedan 3", solo cuando `stock ≤ 5`) y "Avísame cuando llegue" | Urgencia real, sin inventar |
| Bloque de confianza, "Cómo comprar" en 3 pasos y FAQ | Reduce objeciones sobre pago, envío y asesoría |
| Contraste AA, foco visible, objetivos de 44 px, HTML semántico | Accesible y más usable en móvil |
| Datos estructurados `Product` y títulos por página | Mejor presencia en buscadores |

## Lo que NO se hizo, y por qué (sé honesto con tus clientes)

- **No inventé reseñas ni cifras.** La sección de reseñas existe pero queda oculta hasta que agregues opiniones reales en `lib/reviews.ts`.
- **No inventé políticas.** Textos de envío, pago y garantía en `lib/store-config.ts` son genéricos y verdaderos con el flujo actual (todo se acuerda por WhatsApp). **Revísalos** y ajústalos a lo que Haru realmente ofrece (por ejemplo, un monto de envío gratis en `freeShippingThreshold`).
- **No hay imágenes generadas.** No hay acceso a la API de OpenAI en esta sesión. Los prompts están en `design/image-prompts.md`.
- **Investigación parcial.** Solo pude leer en vivo la portada de Byredo, Diptyque, Henry Rose y Boy Smells; Le Labo, Margiela, Phlur y otras bloquearon la lectura automática. Los patrones de las otras 8 vienen de búsquedas web y no están verificados.
- **Ficha olfativa requiere una migración.** Corre `supabase/migration-002-ficha-olfativa.sql` en el SQL Editor de Supabase para poder guardar familia, notas, duración, ocasión y tamaño. Hasta entonces el panel sigue funcionando sin esos campos.
- **Shopify.** Las secciones Dawn están en `shopify/` y cubren la portada. Producto, carrito y test siguen en este sitio Next.js.
