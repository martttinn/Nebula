---
change_id: NBS-CHG-2026-05-04-063
date: 2026-05-04
title: Seccion de propuesta de valor con cambio de color palabra a palabra en scroll
group_id: NBS-TSK-2026-063
category: frontend
subcategories:
  - feature
  - ui-ux-redesign
  - motion
origin: client-request
complexity: medium
scope: local
user_visible: true
release_impacts:
  - frontend-runtime
architecture_layers:
  - components
  - web
  - docs
backend_sensitive: false
files_touched:
  - app/page.tsx
  - components/home/value-proposition-section.tsx
  - components/ui/word-by-word-color-change.tsx
  - DESIGN.md
  - .agents/decisions-log.md
  - doc/reference/technical-reference.md
  - doc/change-log/**
verification:
  - npm run lint
  - npm run typecheck
  - npm run build
---

# Resumen corto

La home pública gana una sección de propuesta de valor inmediatamente después del hero, donde tres frases diferenciales cambian palabra a palabra de color conforme el usuario hace scroll.
La banda usa además un fondo en gradiente vertical `#09090F -> #0A0F2E` para enlazar con más suavidad la salida del hero y la entrada del bloque editorial.

## Contexto / problema

Después del hero, la página todavía no ofrecía una segunda capa narrativa real que reforzara diferenciación. Martín pidió una banda de propuesta de valor con tres frases cortas y un efecto premium de lectura por scroll, donde cada palabra progresara visualmente desde un blanco tenue hacia el blanco `Silver` de marca.

## Cambio realizado

- se crea la primitive reusable `WordByWordColorChange`
- cada frase usa `useScroll` con offset `start 80% / end 20%`
- cada palabra ocupa su propio tramo `1/N` dentro del rango de scroll que le corresponde, y las tres frases se consumen en secuencia estricta dentro de una única ventana de scroll compartida por la banda
- la home integra una nueva sección `Navy` reducida a tres frases en `Syne`, sin numeración y sin título ni subtítulo de apoyo
- se elimina el glow radial superior para que el bloque arranque más limpio y el peso visual quede abajo
- el efecto de lectura de las frases pasa de lila sobre lila a blanco tenue hacia `Silver`, más sobrio y más alineado con el tono editorial del bloque
- la primitive cambia su contrato de override por palabra para pedir `initialColor` y `activeColor`; la opacidad inicial se deriva de forma consistente del estado base de la frase
- se eliminan las líneas divisorias entre frases y la composición pasa a centrarse horizontalmente en pantalla
- cada frase gana una entrada `float` vertical suave inspirada en `ScrollFloat`, sincronizada con la misma progresión de scroll del bloque
- la banda añade runway interno al final para que la última frase complete su entrada sin depender de que exista otra sección debajo
- el copy actual de las tres frases pasa a centrarse en comprensión de negocio, ahorro de tiempo operativo y mantenimiento/evolución continua del producto
- el copy actual vuelve a consumir overrides por palabra para destacar en lila una keyword por frase: `construir.`, `tiempo` y `producto.`

## Objetivo

Reforzar autoridad y propuesta de valor después del hero con una surface más editorial, menos atmosférica y más argumental.

## Impacto arquitectónico

La home deja de ser solo `Hero` y gana una segunda sección pública real. La capa UI suma una primitive cliente scroll-driven reusable para copy corto de alto impacto.

## Desglose denso

- `WordByWordColorChange` divide el texto en palabras y delega cada tramo de color a un subcomponente con `motion.span`
- la banda de propuesta de valor usa una isla cliente de orquestación para repartir una única progresión de scroll entre las tres frases y evitar solapes entre titulares consecutivos
- el color de cada palabra interpola de blanco con baja opacidad a `#E8E8F0`
- la primitive admite overrides de color por índice de palabra, usados aquí para fijar en lila de marca una keyword por frase manteniendo la misma opacidad base inicial
- se usa un `useSpring` ligero sobre `scrollYProgress` para que la lectura se sienta más suave sin independizar la animación del scroll real
- cada statement usa además una traslación vertical y una entrada de opacidad calculadas sobre ese mismo progreso compartido, evitando otro sistema paralelo de triggers
- se compacta aún más el runway final reduciendo de nuevo el spacer posterior y adelantando todavía más el cierre del rango de scroll, para que la última frase complete su entrada con el mínimo vacío posible
- la composición de la sección mantiene base `#0A0F2E`, copy de apoyo en `Inter` y titulares en `Syne`
- la sección queda colocada justo después del hero en `app/page.tsx`

## Validación

- `npm run lint`
- `npm run typecheck`
- `npm run build`

## Pendientes / límites

- no se ha hecho todavía revisión visual asistida en navegador para calibrar el ritmo exacto del efecto en mobile y desktop
- no se ha ejecutado `npm run changes:sync` porque los scripts `changes:*` siguen documentados pero no existen en `package.json`

## Notas para presupuesto

Feature visible de frontend con componente reusable, motion de scroll y mejora directa del storytelling de la landing pública.
