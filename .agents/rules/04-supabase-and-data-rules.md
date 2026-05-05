# Supabase And Data Rules

## Principio de seguridad

- el cliente solo puede usar credenciales permitidas para cliente (`anon` / `publishable`) cuando aplique
- no introduzcas `service_role` en frontend o runtimes no seguros
- confía en RLS, RPCs, Edge Functions o backend server-side para operaciones sensibles

## Canal primario para inspección live

- cuando necesites inspeccionar, verificar o contrastar el estado real de un backend live, usa el canal primario más autoritativo disponible
- si el proyecto usa Supabase y el MCP está disponible, úsalo como canal primario de verificación
- no des por válido el estado live solo leyendo snapshots repo-safe o documentación derivada si la decisión depende del estado actual
- si el canal primario no está disponible, deja constancia explícita del límite y usa la mejor evidencia alternativa disponible

## Acceso a datos para código nuevo

Patrón preferido:

1. tipos y cliente en la capa de acceso a datos
2. lógica de dominio en `services/`, `lib/` o equivalente
3. consumo vía hooks o capa de orquestación
4. UI o rutas sin consultas directas si el trabajo es nuevo

## Backend sensible

Antes de editar, pide confirmación explícita cuando toques:

- `supabase/**`
- migraciones, SQL, RLS, RPCs, triggers o funciones
- `app/api/**`, `server/**` o equivalentes con impacto real en datos, auth o secretos
- `middleware.*` si afecta auth, sesiones o control de acceso
- secretos y archivos `.env*`

## Paridad repo-live cuando exista backend

- si el repo ya tiene una superficie backend versionada, debe mantenerse repo-safe y alineada con el runtime real en el scope tocado
- no cierres una tarea backend como completa si dejas drift consciente entre contratos live y artefactos versionados
- si todavía no existe una capa repo-local equivalente, documenta el límite explícitamente

## Migraciones y SQL

- todo cambio de esquema debe quedar versionado en la superficie correspondiente del repo
- no cambies contratos de datos sin actualizar tipos, servicios, tests y docs afectados
- todo archivo SQL nuevo o modificado de forma relevante debe incluir una cabecera breve explicando qué contiene y para qué sirve
- cualquier cambio de tabla, vista, función o trigger debe revisar permisos, índices, dependencias y efectos colaterales

## Auth, permisos y exposición de datos

- el backend debe ser la fuente autoritativa de permisos
- no derives autorización real desde estado local, metadata de conveniencia o copy de UI
- no expongas datos cross-user sin contrato explícito, sanitización y justificación
- si tocas auth o permisos, identifica claramente el owner de la validación autoritativa

## Tipado y contratos

- si cambias enums, tablas, payloads o respuestas, alinea los contratos tipados en el mismo cambio
- no uses `any` como atajo para llamadas RPC, joins, payloads o respuestas dinámicas
- en bordes externos, prefiere `unknown` + validación / narrowing antes que falsear el tipo
- si el tipado actual es parcial o manual, documéntalo; no lo presentes como esquema generado completo
