# Code Style And Implementation Rules

## Objetivo

Esta regla integra la guía de implementación del repo dentro del sistema canónico de agentes.

- aplica a código nuevo y refactor seguro
- no obliga a maquillar legacy si el repo todavía no lo está
- si entra en conflicto con una regla más específica, prevalece la regla específica del área

## Tipado y lenguaje

- TypeScript siempre cuando el stack del repo lo soporte
- no uses `any` ni `as any` para forzar compilación
- si un tipo no encaja, corrige el contrato real o añade narrowing / guards
- en bordes externos o datos dinámicos, prefiere `unknown` + validación

## Arquitectura y ownership

Dirección preferida para código nuevo:

1. superficie de entrada (`route`, `page`, `screen`, `layout`)
2. componente o UI
3. hook / estado / orquestación local
4. servicio o dominio
5. backend o datos

Ownership esperado por carpeta, si existen equivalentes:

- `app/` o `src/app/`: rutas, layouts, metadata y orquestación route-level
- `components/` o `app/components/`: UI y shells
- `hooks/`: lógica reutilizable y orquestación local
- `services/`, `data/` o `lib/`: dominio, acceso a datos e integraciones
- `store/`: estado global solo cuando esté justificado
- `public/`: assets públicos
- `scripts/`: tooling repo-local
- `DESIGN.md`: tokens y canon visual reutilizable cuando exista
- `doc/`: documentación y `change-log`

Reglas derivadas:

- no dupliques lógica de negocio entre rutas, componentes, hooks y servicios
- no metas contenido repetitivo hardcodeado en varias superficies si puede vivir en un catálogo claro
- cuando dos superficies compartan infraestructura o shell con semánticas distintas, evalúa extraer una primitive antes de copiar estructura
- abstrae solo cuando la similitud esté verificada o sea inminente en el scope

## Politica canónica de `components/`

### `components/home/`

- cada sección pública sustancial de la home debe vivir en una carpeta propia
- el entrypoint público de esa carpeta debe ser `index.tsx`
- los consumidores route-level deben importar el directorio canónico, no un archivo interno profundo ni una fachada paralela
- la estructura interna preferida de cada sección es:
  - `index.tsx` para la surface pública
  - `primitives.tsx` para piezas visuales privadas o subcomponentes internos
  - `constants.ts` para valores canónicos de layout, motion o color específicos de la sección
  - `types.ts` para contratos internos
  - `content.ts` cuando copy, catálogos u ornamentos sean locales a la sección
  - `geometry.ts`, `path.ts` o nombre equivalente cuando haya cálculo puro de layout, SVG, motion o posicionamiento
  - CSS Modules colocalizados solo cuando el estilo sea específico de esa sección
- no abras nuevos archivos sueltos en la raíz de `components/home/` para implementar secciones complejas o familias que ya tienen carpeta propia
- si una sección empieza simple pero gana varias responsabilidades, migra a carpeta antes de seguir ampliándola
- las fachadas de compatibilidad en `components/home/*.tsx` solo se permiten como ayuda de transición en migraciones explícitas; deben retirarse cuando los consumidores ya estén actualizados, salvo instrucción contraria de Martín

### `components/ui/`, `components/layout/` y ownership compartido

- primitives reutilizables entre varias secciones o varias rutas van en `components/ui/`
- shells globales, navegación y wrappers de layout van en `components/layout/`
- una pieza reusable pero claramente owned por una familia concreta puede quedarse en su carpeta si el ownership es inequívoco y no complica consumo
- no promociones a `ui/` por reflejo: extrae solo cuando la reutilización ya es real o inmediatamente inminente

## Boundaries de runtime

- protege los límites entre código server, client, mobile, tooling y backend según el stack real del repo
- no importes código server-only dentro de surfaces client
- side effects y APIs de entorno solo donde el runtime lo permita

## Estado y side effects

- estado local efímero con `useState` / `useReducer` o equivalente ligero
- no añadas stores globales sin necesidad clara y justificada
- si una surface requiere efectos costosos o listeners, planifica cleanup y coste de render
- cada dataset debería tener un owner claro de fetch, invalidación y lifecycle

## Convenciones visuales

- respeta el lenguaje visual existente del repo salvo rediseño explícito
- si existe `DESIGN.md`, sus tokens YAML mandan sobre valores inventados para color, tipografía, spacing o radios
- usa variables, tokens o primitives ya presentes antes de abrir una capa paralela
- no abras paletas, spacing, tipografías o shapes paralelos sin decisión explícita y actualización correspondiente en `DESIGN.md`
- si introduces o cambias un componente base reusable, alinea su contrato visual con `DESIGN.md`
- la estética no justifica perder claridad, foco o accesibilidad
- si una decisión visual choca con SEO, rendimiento o comprensión, documenta el trade-off y prioriza el resultado neto

## Naming, comentarios y documentación

- prioriza nombres explícitos frente a abreviaturas
- comenta solo contratos, invariantes o reglas no evidentes
- todo script o artefacto operativo nuevo o modificado de forma relevante debe incluir una cabecera breve
- comentarios de código y documentación interna: español por defecto
- toda entrega lógica repo-tracked debe quedar registrada en `doc/change-log/`

## Calidad de cambio

- haz el cambio mínimo seguro
- no mezcles refactors laterales si el task no los pide
- evita duplicación nueva aunque el repo arrastre legacy
- si el estado real diverge de la convención objetivo, documenta la excepción; no la presentes como resuelta
