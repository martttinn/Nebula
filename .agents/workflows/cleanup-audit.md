---
description: auditoría canónica de higiene técnica para hilos nuevos cuando Martín use el trigger `cleanup`
---

# Workflow - Cleanup Audit

## Objetivo

Convertir `cleanup` en una auditoría operativa fiable para detectar deuda higiénica real del repo antes de borrar, fusionar o sanear código.

El resultado esperado es que el agente entregue un mapa priorizado de:

- código huérfano o sin ruta runtime clara
- wrappers o primitives duplicadas que convendría colapsar
- drift documental o registral
- tooling o dependencias sobredimensionadas
- candidatos de borrado seguro frente a candidatos de alto riesgo

## Alcance y límites

- por defecto es **read-only**
- `cleanup` no autoriza borrar módulos, assets, docs ni backend sensible por sí solo
- si detectas basura potencial, primero clasifícala; solo la eliminas después si Martín lo pide o si el propio mensaje ya incluye un objetivo de limpieza explícito y acotado
- si el hallazgo toca backend sensible, contratos de datos, auth, `supabase/**` o artefactos compartidos de alto riesgo, se mantiene el requisito de confirmación explícita antes de editar

## Secuencia obligatoria

### 1. Carga mínima del sistema de agentes

Lee siempre:

1. `rules/00-operating-mode.md`
2. `rules/01-project-context.md`
3. `roles/01-role-architecture-audit.md` como rol principal por defecto
4. `roles/02-role-performance-audit.md` como apoyo cuando el coste de runtime o bundle forme parte del saneamiento

Carga además:

- `rules/03-nextjs-web-rules.md`
- `rules/06-testing-release-and-docs-rules.md`
- `rules/07-code-style-and-implementation-rules.md`

Si el mensaje ya deja claro que tras la auditoría tocarás implementación, carga también `roles/00-role-senior-developer.md`.

### 2. Inspección de integridad del repo

Antes de concluir nada:

1. revisa el worktree real (`git status`)
2. inspecciona la estructura top-level del repo
3. contrasta `package.json`, `tsconfig.json`, `next.config.mjs`, `tailwind.config.ts` y el lint setup vigente
4. localiza las superficies dueñas del sistema:
   - `app/`
   - `components/`
   - `lib/`
   - `public/`
   - `supabase/`
   - `.agents/`
   - `DESIGN.md`
   - `doc/`
5. lee la documentación mínima:
   - `README.md`
   - `AGENTS.md`
   - `DESIGN.md` si la higiene afecta UI o primitives visuales
   - `doc/README.md`
   - `doc/reference/technical-reference.md`
   - `doc/reference/domain-reference.md`
   - `.agents/decisions-log.md`

### 3. Auditoría profunda de higiene

Revisa como mínimo estos ejes:

#### A. Código huérfano o sin consumo real

- exports no importados ni usados
- primitives o shells que solo sobreviven en histórico documental
- helpers, wrappers o tipos no consumidos por ningún runtime activo
- capas aparcadas que siguen presentes por estrategia futura, distinguiéndolas de basura real

#### B. Duplicación estructural

- wrappers que duplican comportamiento de otra primitive
- variantes o componentes importados desde registries externas que podrían colapsarse en una única base
- estilos o reglas CSS repetidas sin necesidad

#### C. Drift factual y documental

- rutas, directorios o archivos mencionados en docs/reglas que ya no existen
- claims sobre el runtime público que ya no describen el código real
- incoherencias entre `.agents/**`, `AGENTS.md`, `doc/reference/**` y el árbol real
- integridad de `doc/change-log/`: IDs únicos, reciprocidad entrada/grupo, índice derivado y tooling declarado

#### D. Dependencias y tooling

- dependencias instaladas sin uso claro
- coexistencia de librerías solapadas que convendría unificar
- scripts o tooling documentados pero no expuestos realmente
- assets o variantes de marca sin uso runtime, distinguiendo librería de marca de basura eliminable

#### E. Runtime y boundaries

- islas cliente sobredimensionadas
- efectos visuales costosos sin encapsulación suficiente
- código temporal o fallbacks que ya no aportan valor perceptible
- secciones, anchors o wiring público que ya no conectan con surfaces reales

### 4. Clasificación obligatoria de hallazgos

Cada hallazgo debe salir clasificado como uno de estos tipos:

- `basura probable`
- `legacy aparcado`
- `drift factual`
- `duplicación estructural`
- `drift de tooling`
- `riesgo alto, no borrar sin confirmación`

Y además con:

- severidad: `alta`, `media` o `baja`
- confianza: `alta`, `media` o `baja`
- coste de limpieza estimado: `bajo`, `medio` o `alto`
- validación necesaria antes de borrar: `ninguna`, `build/lint`, `revisión visual`, `confirmación de Martín`, `verificación backend`

### 5. Verificación adicional si el hallazgo toca backend o docs vivas

Si un candidato de cleanup afecta:

- `supabase/**`
- `lib/supabase/**`
- contratos de datos
- auth o middleware
- o documentación que pueda haberse propagado al vault

entonces:

1. marca el hallazgo como sensible
2. verifica si la evidencia repo-local basta
3. si no basta, usa la fuente primaria adecuada antes de recomendar borrado o saneamiento

## Salida esperada tras `cleanup`

La respuesta al usuario debe dejar claro:

1. qué verificaste realmente
2. fecha exacta de la verificación
3. lista priorizada de hallazgos
4. qué es basura probable y qué es legacy aparcado que quizá conviene conservar
5. quick wins de limpieza segura
6. limpiezas que requieren confirmación antes de tocarse
7. límites de la auditoría

## Comportamiento operativo del trigger

- si Martín escribe exactamente `cleanup` o lo usa de forma inequívoca como comando, ejecuta este workflow antes de proponer borrados o refactors de higiene
- si `cleanup` llega solo, detente tras el informe y espera instrucción
- si `cleanup` llega acompañado de un objetivo concreto, primero completa la auditoría y después continúa solo con la limpieza segura y directamente relacionada con ese objetivo
