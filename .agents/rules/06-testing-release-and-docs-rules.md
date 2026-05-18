# Testing, Release And Docs Rules

## Validación mínima por tipo de cambio

- lógica no trivial: validación estática y revisión del contrato afectado
- UI simple: `lint` + smoke review del flujo tocado
- cambio visual relevante o responsive: `build` cuando exista + revisión manual del scope
- si tocas `DESIGN.md` o el sistema visual reutilizable: `npm run design:lint` + revisión proporcional del scope afectado
- metadata, schema o discoverability: revisión del HTML, salida o contrato resultante
- integraciones, auth o backend: validación proporcional al riesgo y documentación explícita de lo no verificado

## Estado real del repo

- no presentes como ejecutados tests o scripts que el repo no tiene configurados
- si una tarea merecería tests pero el repo aún no dispone de esa infraestructura, dilo explícitamente
- verifica siempre `package.json` o el tooling equivalente antes de citar comandos como hechos

## Verificación de dependencias citadas

- cada vez que una tarea, documento o propuesta mencione paquetes concretos, comprueba si están instalados en el proyecto actual antes de tratarlos como parte del stack
- la comprobación mínima es `package.json` + lockfile; si el repo usa otro gestor, usa su manifiesto equivalente
- si faltan dependencias mencionadas y serían necesarias para implementar o validar el cambio, pregunta a Martín cuáles quiere instalar antes de tocar manifiestos o lockfiles
- no confundas dependencias instaladas con herramientas ejecutadas bajo demanda mediante `npx <paquete>@...`; estas deben documentarse como no instaladas si no aparecen en el manifiesto

## Comandos útiles del repo

La plantilla deja configurados estos scripts mínimos para `change-log`:

- `npm run changes:group:new`
- `npm run changes:entry:new`
- `npm run changes:validate`
- `npm run changes:index`
- `npm run changes:sync`
- `npm run design:lint`
- `npx react-doctor@latest`

Si el repo real tiene `lint`, `build`, `test` u otros comandos, documenta aquí su foto actual verificada.

### Diagnóstico React bajo demanda

- usa `npx react-doctor@latest` cuando el scope pida auditar salud de React/Next.js, rendimiento, corrección, accesibilidad, bundle o arquitectura de componentes
- trátalo como diagnóstico complementario: no sustituye `lint`, `typecheck`, `build` ni pruebas específicas
- si el comando propone cambios, revisa cada hallazgo antes de modificar código; no ejecutes fixes automáticos por inercia

## Auditoría y cambios de dependencias

- si la tarea pide revisar paquetes, vulnerabilidades, drift o upgrades, usa `.agents/workflows/dependency-audit.md` y `.agents/skills/dependency-audit/SKILL.md`
- si detectas dependencias mencionadas en documentación, prompts o código pero ausentes del proyecto actual, solicita a Martín qué quiere instalar antes de convertirlas en parte del stack
- por defecto, la auditoría es read-only; no ejecutes fixes automáticos ni upgrades globales sin alcance explícito
- cualquier cambio en `package.json` o lockfile debe cerrar con validación proporcional al riesgo

## Reglas de release

Requieren atención especial:

- cambios en configuración del framework o del runtime
- cambios en metadata global, rutas públicas o runtime de servidor
- cambios en dominios remotos, scripts de terceros o integraciones externas
- cambios en variables de entorno, auth o contratos de backend

En esos casos, indica explícitamente:

- si el cambio afecta frontend, backend o ambos
- si faltan secretos, env vars o configuración externa para verificarlo bien
- si el despliegue requiere revisar infraestructura o proveedor

## Reglas de documentación

Actualiza documentación cuando cambies:

- arquitectura o estructura del repo
- reglas de negocio o de producto
- seguridad, auth o permisos
- tooling, scripts o forma de validar
- sistema visual, tokens o componentes base documentados en `DESIGN.md`
- decisiones del sistema de agentes

## Change log repo-only obligatorio

El repo mantiene un subsistema canónico de entregas en `doc/change-log/`.

- es obligatorio para toda entrega lógica repo-tracked
- es repo-only: no vive en el vault ni sustituye `.agents/decisions-log.md`
- `doc/change-log/index.md` es derivado y se genera por script
- antes de operar sobre él, verifica la fecha real actual del sistema

## Sincronización obligatoria con el vault de Obsidian

Si la tarea cambia cualquiera de estos ámbitos, sincroniza también el vault en la misma tarea:

- arquitectura
- stack o tooling operativo
- reglas de negocio
- decisiones técnicas o de producto vigentes
- features nuevas o cambios funcionales con impacto documental

Canal de acceso por defecto al vault:

- prioriza `filesystem`
- usa el MCP de Obsidian solo como fallback

## Actualización del sistema de agentes

Si una tarea cambia cualquiera de los siguientes elementos, actualiza los archivos `.agents/` afectados en la misma tarea:

- reglas de negocio
- contratos de datos o seguridad
- arquitectura del repo
- convenciones de implementación
- workflows del sistema de agentes

Además, verifica que `AGENTS.md` en la raíz siga alineado con esos cambios.
