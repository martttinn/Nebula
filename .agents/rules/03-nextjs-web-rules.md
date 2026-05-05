# Next.js And Web Rules

## Base del frontend web

- routing con Next.js App Router
- render híbrido server/client según necesidad real
- estilos con Tailwind CSS y `app/globals.css`
- metadata y layout global desde `app/layout.tsx`
- si existe `DESIGN.md` y el cambio toca identidad visual o primitives, úsalo como contrato visual antes de abrir estilos paralelos

## Reglas para código nuevo

- rutas, layouts y metadata en `app/`
- UI reutilizable en `components/**`
- catálogos estáticos en `data/`
- helpers compartidos en `lib/`
- acceso a APIs de navegador solo en componentes client

## Server vs Client

- `Server Components` por defecto
- usa `'use client'` solo cuando necesites estado local, refs, listeners, animación, interacción o APIs del navegador
- no subas la marca `'use client'` a shells grandes por comodidad
- no importes código server-only dentro de un client component
- si un componente es casi todo estático con una isla interactiva pequeña, aísla la isla

## Metadata, semántica y SEO técnico

- toda ruta pública relevante debe poder expresar metadata correcta
- no rompas jerarquía de headings por perseguir estilo visual
- si cambias copy, headings, navegación, contacto, FAQs, schema o CTA, evalúa impacto en indexación y conversión
- si una tarea toca metadata, schema, indexabilidad, enlazado o semántica, carga también `rules/05-marketing-seo-and-conversion-rules.md`

## Performance y React

- no añadas `useMemo` o `useCallback` por reflejo; úsalos solo con evidencia o patrón ya establecido
- evita enviar al cliente lógica o librerías que puedan quedarse en server
- no montes motion, smooth scroll, carruseles o efectos pesados antes de que aporten valor real
- cuida bundle, above-the-fold y coste de hidratación
- si una superficie es costosa, evalúa `dynamic()` o lazy loading cuando mejore el balance UX/rendimiento

## UX web

- diseño responsive obligatorio en desktop y mobile
- toda surface pública debe contemplar estados razonables de loading, error o fallback cuando aplique
- prioriza claridad comercial sobre artificio visual
- animación sí, pero con intención: evita microanimación gratuita que añada peso sin mejorar comprensión
- si la tarea es principalmente de interfaces premium, motion, scroll storytelling, sistemas visuales o frontend de alto impacto, carga también `roles/07-role-frontend-developer.md`
- respeta accesibilidad básica: contraste, foco visible, `aria-*` cuando corresponda, semántica y elementos interactivos reales
- si el cambio introduce o altera tokens reutilizables de color, tipografía, radios o espaciado, actualiza `DESIGN.md` en la misma tarea

## Integraciones y assets

- no añadas dominios externos de imágenes o scripts de terceros sin verificar coste, seguridad y necesidad
- si tocas assets remotos o config de imágenes, revisa también `next.config.mjs`
- evita duplicar assets o abrir carpetas de `public/` sin una razón clara

## Formularios y captación

- todo formulario público debe validar entrada
- si una tarea introduce lead capture real, contempla spam, rate limiting, almacenamiento, consentimiento y UX de éxito/error
- no inventes endpoints o automatizaciones de captación si todavía no están implementados
