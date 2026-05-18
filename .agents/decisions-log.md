# Decisions Log

Registro de decisiones de arquitectura, producto, SEO, diseño y operación que afectan al comportamiento del sistema.

---

## 2026-05-18 — `HeroParticles` se restaura como atmósfera de continuidad

**Decisión:** `HeroParticles` vuelve a montarse en `services-carousel`, `how-we-work` y `testimonials`, tanto en las variantes desktop como en las degradaciones móviles donde ya existía antes de la optimización de Speed Insights.

**Motivo:** Martín pidió restaurar explícitamente la capa de partículas para recuperar la continuidad atmosférica de la home. Se mantiene el resto de ajustes de performance ya aplicados: heading principal pintable, `Preloader` más corto y `GridDistortion` bajo demanda.

**Efecto:** El runtime vuelve a priorizar la firma visual de partículas en las secciones posteriores al hero. La decisión puede reintroducir parte del riesgo de CLS de sesión medido durante la auditoría anterior, por lo que cualquier revisión futura de Speed Insights deberá distinguir este trade-off visual del resto de optimizaciones conservadas.

**Archivos / artefactos relevantes:** `components/home/services-carousel/index.tsx`, `components/home/how-we-work/index.tsx`, `components/home/testimonials/index.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-18 — La home prioriza estabilidad y LCP de campo frente a ornamento above-the-fold

**Decisión:** La home mantiene el heading principal del hero como contenido inmediatamente pintable, acorta la retención del `Preloader`, retrasa el fondo `GridDistortion` de la card final hasta proximidad al viewport y retira `HeroParticles` de los stages sticky/fixed de servicios, proceso y testimonials.

**Motivo:** Las métricas reales de Vercel Speed Insights en producción mostraban `RES 51`, `LCP 4.62s` y `CLS 1.07` en desktop. La comprobación local confirmó que el servidor no era el cuello de botella (`x-vercel-cache: HIT`, prerender estático) y que los riesgos principales estaban en bloqueo visual del hero, carga temprana de assets below-the-fold y desplazamientos acumulados por capas ornamentales full-viewport durante scroll.

**Efecto:** La experiencia conserva identidad Nebula, pero reduce coste y variabilidad en puntos críticos de Core Web Vitals: el H1 deja de depender de un reveal oculto, el loader lanza antes la secuencia del hero, `GridDistortion` no adelanta WebGL ni `cta-background.png` al primer render y las partículas dejan de intervenir en stages donde podían inflar CLS de sesión. La primitive `HeroParticles` no se borra; queda reservada para usos aislados y medidos.

**Archivos / artefactos relevantes:** `components/ui/preloader.tsx`, `components/home/hero/lead.tsx`, `components/home/services-carousel/index.tsx`, `components/home/how-we-work/index.tsx`, `components/home/testimonials/**`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-18 — El runtime público integra Vercel Web Analytics

**Decisión:** La web pública añade `@vercel/analytics` y monta `Analytics` desde `@vercel/analytics/next` en el root layout junto a `SpeedInsights`.

**Motivo:** Martín activó la integración de Web Analytics en Vercel para `somosnebula.com` y pidió dejar el proyecto preparado para empezar a contar visitantes y page views tras el siguiente despliegue.

**Efecto:** El runtime público queda instrumentado con la vía oficial de Vercel para Next.js App Router. La recopilación real de datos depende de que el proyecto esté desplegado en Vercel y de que Web Analytics siga habilitado en el dashboard; no se añade backend propio ni canal de captación nuevo.

**Archivos / artefactos relevantes:** `app/layout.tsx`, `package.json`, `package-lock.json`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-11 — Las dependencias mencionadas deben verificarse contra el proyecto actual antes de instalarse o usarse como stack

**Decisión:** Cualquier dependencia, paquete, plugin o herramienta mencionada por una tarea, documentación o propuesta debe contrastarse contra `package.json`, lockfile y configuración equivalente antes de tratarse como instalada o parte del stack real.

**Motivo:** La incorporación de tooling bajo demanda como React Doctor hizo explícito un riesgo recurrente: confundir dependencias mencionadas con dependencias instaladas. El sistema de agentes debe evitar asumir disponibilidad runtime o modificar manifiestos sin confirmación.

**Efecto:** Si una dependencia mencionada no está instalada, el agente debe marcarla como `mencionada/no instalada` y preguntar a Martín cuáles quiere instalar antes de tocar `package.json`, lockfile o código que dependa de ella. El tooling expresamente documentado como `npx <paquete>@...` queda permitido como ejecución bajo demanda, pero no se presenta como dependencia instalada.

**Archivos / artefactos relevantes:** `AGENTS.md`, `.agents/rules/00-operating-mode.md`, `.agents/rules/06-testing-release-and-docs-rules.md`, `.agents/workflows/task-start.md`, `.agents/workflows/dependency-audit.md`, `.agents/skills/dependency-audit/SKILL.md`, `doc/change-log/**`.

---

## 2026-05-11 — React Doctor queda documentado como diagnóstico React bajo demanda

**Decisión:** El stack operativo de Nebula incorpora React Doctor como herramienta de diagnóstico bajo demanda mediante `npx react-doctor@latest`, sin instalarlo ni fijarlo en `package.json`.

**Motivo:** Martín pidió incluir `react-doctor` en la documentación del proyecto, en el sistema de agentes y en la plantilla base. La verificación con npm el `2026-05-11` confirma que el paquete existe en versión `0.1.6` y expone el binario `react-doctor`.

**Efecto:** Las auditorías de salud React/Next.js pueden usar React Doctor como complemento para seguridad, rendimiento, corrección, accesibilidad, bundle y arquitectura. Sus hallazgos deben tratarse como señal diagnóstica, no como fixes automáticos ni sustituto de `lint`, `typecheck` o `build`.

**Archivos / artefactos relevantes:** `README.md`, `.agents/rules/01-project-context.md`, `.agents/rules/06-testing-release-and-docs-rules.md`, `.agents/workflows/dependency-audit.md`, `.agents/skills/dependency-audit/SKILL.md`, `.agents/roles/02-role-performance-audit.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-09 — El footer público adopta cierre de marca + navegación con catálogo compartido

**Decisión:** La home añade un footer sobrio de marca + navegación al final del documento, reutilizando el mismo lockup de marca del navbar y extrayendo los links públicos a un catálogo compartido. Los legales (`Términos y condiciones`, `Política de privacidad`) se muestran ya en footer, pero desactivados mientras no existan sus páginas reales.

**Motivo:** Martín pidió cerrar la home con un footer claro y premium, sin densidad excesiva ni duplicación manual de enlaces entre navbar y footer. Además, los destinos legales faltaban en la navegación pública y convenía exponerlos sin fingir rutas ya publicadas.

**Efecto:** El runtime público gana un cierre global más completo y coherente con la arquitectura actual de anclas internas. `data/navigation.ts` pasa a ser la fuente de verdad para navbar y footer, `components/layout/brand-lockup.tsx` evita duplicar el shell de marca, y el footer refuerza orientación sin competir con `testimonials`.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/layout/footer.tsx`, `components/layout/brand-lockup.tsx`, `components/layout/navbar.tsx`, `components/layout/navbar-staggered-menu.tsx`, `data/navigation.ts`, `DESIGN.md`, `.agents/rules/01-project-context.md`, `doc/reference/technical-reference.md`, `doc/reference/domain-reference.md`, `doc/change-log/**`.

---

## 2026-05-09 — El cierre `#contacto` se integra como última card de `testimonials` con `GridDistortion` exacto de React Bits

**Decisión:** El cierre comercial asociado a `#contacto` deja de vivir como sección autónoma al final de la home y pasa a integrarse como la última card del stack de `testimonials`, usando `GridDistortion` importado exactamente desde el registry de React Bits, sin editar el componente base.

**Motivo:** La navegación pública ya apuntaba a `/#contacto`, pero el cierre separado duplicaba superficies al final de la home y competía con el propio ritmo de `testimonials`. Martín pidió integrar esa card dentro del carrusel de reseñas para que apareciera como el último panel del mismo flujo sin perder el fondo exacto de React Bits ni la honestidad funcional mientras la página de contacto sigue sin existir.

**Efecto:** `Testimonials` pasa a tener cuatro panels en su stage sticky desktop y cuatro cards en su degradación móvil: tres reseñas verificadas y una card final de contacto. El ancla `#contacto` apunta ahora a esa misma sección, el fondo del panel sigue dependiendo de `components/GridDistortion.tsx` y `components/GridDistortion.css` cargados desde una shell cliente colocalizada dentro de la familia `components/home/testimonials/`, y el botón principal se muestra habilitado como affordance visual sin ruta de redirección mientras el canal real siga pendiente. El árbol mantiene `three` en `0.180.x` como única versión efectiva compatible con `postprocessing`.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/home/testimonials/**`, `components/GridDistortion.tsx`, `components/GridDistortion.css`, `DESIGN.md`, `.agents/rules/01-project-context.md`, `doc/reference/technical-reference.md`, `doc/reference/domain-reference.md`, `doc/change-log/**`.

---

## 2026-05-08 — El hero sustituye `GridScan` por `DotField` y mantiene el contrato de readiness del preloader

**Decisión:** El fondo principal del hero deja de usar la isla WebGL `GridScan` y pasa a apoyarse en un `DotField` sobre canvas derivado de React Bits, encapsulado dentro de la familia `components/home/hero/`. En el mismo ajuste se retiran del hero el radial decorativo del overlay y la capa local de partículas flotantes. El preloader conserva por compatibilidad el evento `hero-grid-ready` como señal de readiness.

**Motivo:** El hero necesitaba reemplazar su fondo visual sin romper la secuencia actual de entrada ni la coordinación existente entre loader, copy y shell pública. Después, Martín pidió depurar aún más esa superficie quitando ruido atmosférico adicional. Mantener el contrato del evento evita reescribir la orquestación superior para un cambio acotado al fondo.

**Efecto:** El runtime above-the-fold ya no depende de `GridScan` para el render del hero, y el hero queda visualmente más sobrio al descansar sobre `DotField` y la secuencia tipográfica. La transición con la siguiente sección se resuelve ahora con un gradiente aplicado solo en la mitad inferior del hero, dejando intacta la visibilidad del campo en la mitad superior. La salida del preloader sigue esperando la misma señal `hero-grid-ready` emitida ahora por `DotField`. La primitive `HeroParticles` permanece disponible para otras secciones que ya la reutilizan fuera del hero.

**Archivos / artefactos relevantes:** `components/home/hero/index.tsx`, `components/home/hero/dot-field.tsx`, `components/home/hero/dot-field-shell.tsx`, `components/ui/preloader.tsx`, `doc/reference/technical-reference.md`.

---

## 2026-05-03 — Nebula Studios adopta `AGENTS.md` + `DESIGN.md` + `.agents/` como sistema canónico

**Decisión:** El repo arranca con `AGENTS.md` como bootstrap raíz, `DESIGN.md` como canon visual reutilizable y `.agents/` como capa canónica de reglas, roles, workflows, skills y decisiones.

**Motivo:** La base del proyecto debe nacer con criterios operativos y visuales explícitos, no como documentación a posteriori.

**Efecto:** Cualquier agente debe arrancar por `AGENTS.md`, cargar `.agents/rules/**`, usar `DESIGN.md` para trabajo visual y registrar entregas en `doc/change-log/`.

**Archivos / artefactos relevantes:** `AGENTS.md`, `DESIGN.md`, `.agents/**`, `doc/change-log/**`, `scripts/*.js`.

---

## 2026-05-03 — El repo actual es una web pública de marketing sin backend live ni canal comercial conectado

**Decisión:** El estado real del proyecto se interpreta como una web pública de posicionamiento y captación para Nebula Studios. No existe a fecha `2026-05-03` una capa backend live verificada, auth activa ni un canal comercial operativo conectado.

**Motivo:** El árbol real muestra una landing pública, metadata, robots y sitemap. Aunque ahora existe bootstrap repo-safe de Supabase, todavía no hay formularios conectados, APIs operativas ni contratos de datos live verificados.

**Efecto:** Los agentes no deben documentar CRM, formularios live, auth o automatizaciones como si ya existieran. Si esa capa aparece, debe añadirse de forma explícita y repo-safe.

**Archivos / artefactos relevantes:** `.agents/rules/01-project-context.md`, `.agents/rules/04-supabase-and-data-rules.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-03 — Supabase queda bootstrappeado en el repo con CLI, env moderno y carpeta de migraciones

**Decisión:** Nebula Studios mantiene desde ahora un bootstrap repo-safe de Supabase con `@supabase/ssr`, helper de entorno que prioriza publishable keys, `supabase/config.toml`, `supabase/seed.sql` y `supabase/migrations/`.

**Motivo:** El repo necesitaba una base coherente con el flujo oficial actual de Supabase para Next.js y con los otros proyectos locales que ya versionan migraciones.

**Efecto:** La evolución futura de auth o esquema debe partir de ese bootstrap. Mientras no exista un proyecto live vinculado o un esquema real versionado, sigue prohibido presentar esta base como backend operativo cerrado.

**Archivos / artefactos relevantes:** `lib/supabase/**`, `middleware.ts`, `supabase/**`, `package.json`, `.env.example`.

---

## 2026-05-03 — Supabase queda aparcado fuera del runtime público hasta cerrar el frontend

**Decisión:** El repo conserva el bootstrap de Supabase, pero la web pública no debe depender todavía de ese stack. No se monta ningún `proxy` o `middleware` para Supabase y la conexión runtime se reactivará cuando la fase frontend esté cerrada.

**Motivo:** La prioridad actual es iterar sobre la superficie pública sin arrastrar auth, cookies, variables de entorno o refresco de sesión que hoy no aportan valor al frontend y sí añaden fricción operativa.

**Efecto:** `lib/supabase/**` y `supabase/**` siguen siendo la base futura para auth, datos y migraciones, pero cualquier trabajo de frontend puede avanzar sin Supabase montado en el runtime ni envs requeridas para renderizar la web pública.

**Archivos / artefactos relevantes:** `lib/supabase/**`, `.env.example`, `README.md`, `.agents/rules/01-project-context.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-03 — El modo operativo base del sistema de agentes se consolida en una sola regla

**Decisión:** Nebula Studios mantiene una única regla base para el modo operativo del agente en `rules/00-operating-mode.md`. La antigua separación entre `00-operating-mode.md` y `02-agent-operating-rules.md` se elimina.

**Motivo:** Ambas reglas solapaban identidad, protocolos y guardrails operativos. Mantener dos fuentes para el mismo nivel de comportamiento base introduce ambigüedad y drift documental.

**Efecto:** La carga mínima del sistema queda reducida a `rules/00-operating-mode.md` y `rules/01-project-context.md` antes de seleccionar rol y reglas técnicas. Cualquier actualización futura del modo operativo debe hacerse en una sola fuente de verdad.

**Archivos / artefactos relevantes:** `AGENTS.md`, `.agents/README.md`, `.agents/rules/00-operating-mode.md`, `.agents/workflows/init-context.md`, `.agents/workflows/task-start.md`.

---

## 2026-05-03 — La narrativa pública debe comunicar criterio técnico en menos de tres segundos

**Decisión:** La home, los CTA y la capa SEO deben dejar claro de inmediato que Nebula Studios no es una agencia genérica, sino un estudio de software orientado a arquitectura pensada para negocio.

**Motivo:** La propuesta de valor del proyecto depende de la claridad y de la diferenciación técnica visible desde el primer scroll.

**Efecto:** El copy evita humo, métricas inventadas y épica vacía. La autoridad pública sale de explicar mejor el problema, el método y el tipo de cliente ideal.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/home/**`, `data/site.ts`, `.agents/rules/05-marketing-seo-and-conversion-rules.md`.

---

## 2026-05-03 — SEO, semántica, conversión y accesibilidad son parte del runtime público

**Decisión:** En Nebula Studios, metadata, headings, semántica HTML, señales locales, CTA y accesibilidad básica se tratan como requisitos funcionales de la web pública.

**Motivo:** La web existe para posicionar la marca, generar confianza y preparar una captación cualificada. Un cambio visual que degrade comprensión o discoverability es una regresión real.

**Efecto:** Toda tarea sobre la superficie pública debe evaluar impacto en indexación, claridad comercial, jerarquía semántica y conversión.

**Archivos / artefactos relevantes:** `.agents/roles/05-role-seo-strategy.md`, `.agents/rules/05-marketing-seo-and-conversion-rules.md`, `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`.

---

## 2026-05-03 — `Server Components` por defecto y motion aislado en islas cliente

**Decisión:** La política por defecto del repo es `Server Components first`. Framer Motion y cualquier interacción se aíslan en componentes cliente pequeños y justificados.

**Motivo:** La web necesita una percepción premium, pero no a costa de aumentar sin control el bundle cliente o la hidratación.

**Efecto:** Los agentes deben evitar subir `'use client'` a shells grandes y justificar cualquier frontera cliente por estado, refs, listeners o animación real.

**Archivos / artefactos relevantes:** `.agents/rules/03-nextjs-web-rules.md`, `components/home/reveal.tsx`, `components/home/hero-cube.tsx`, `doc/reference/technical-reference.md`.

---

## 2026-05-03 — Los efectos visuales pesados quedan permitidos solo como islas cliente aisladas y justificadas

**Decisión:** Nebula Studios puede usar `three` y `postprocessing` en la web pública cuando el efecto visual aporte identidad clara, pero siempre encapsulado en una isla cliente concreta y sin contaminar el shell server principal.

**Motivo:** La percepción premium del estudio puede beneficiarse de capas visuales distintivas, pero el coste de bundle y complejidad debe permanecer contenido.

**Efecto:** Cualquier efecto visual avanzado similar a `GridScan` debe vivir en componentes cliente aislados, con integración deliberada y sin convertir la home en un lienzo WebGL indiscriminado.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/home/grid-scan.tsx`, `.agents/rules/03-nextjs-web-rules.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-03 — El sistema visual de Nebula es dark-tech, sobrio y centrado en el cubo isométrico

**Decisión:** La identidad pública del repo se apoya en fondo `Void`, profundidad `Navy`, acento `Lilac`, texto `Silver`, tipografía `Syne + Inter` y un cubo isométrico de seis facetas como firma visual.

**Motivo:** Nebula necesita una estética técnica y premium con memoria visual clara, sin caer en un futurismo ruidoso ni en una web de agencia intercambiable.

**Efecto:** Tokens, composición, botones, cards y motion deben seguir `DESIGN.md`. Cualquier cambio reutilizable de identidad visual exige actualizar ese archivo.

**Archivos / artefactos relevantes:** `DESIGN.md`, `app/globals.css`, `components/home/brand-mark.tsx`, `components/ui/button.tsx`.

---

## 2026-05-03 — El navbar global adopta una sola superficie pill con símbolo oficial oscuro y `NEBULA` en Syne

**Decisión:** La navegación global reusable de Nebula se construye como una cápsula alargada única con tres zonas internas fijas: logo, links y CTAs. El lado izquierdo usa un lockup compuesto por el símbolo oficial oscuro de `public/logo/symbol/` seguido de la palabra `NEBULA` en Syne, y las secciones internas no deben crear subcápsulas ni fondos propios.

**Motivo:** El navbar necesita sentirse premium y reconocible como shell global, pero sin fragmentarse en varias superficies competitivas ni inventar un logomark paralelo al sistema de marca ya disponible en `public/`.

**Efecto:** Cualquier futura navegación global o variante derivada debe partir de `components/layout/navbar.tsx`, mantener la estructura tripartita y tratar el blur como una única superficie de alto nivel, no como un patrón repetido dentro del propio navbar.

**Archivos / artefactos relevantes:** `components/layout/navbar.tsx`, `app/globals.css`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-03 — El CTA `Contactar` del navbar usa `StarBorder` de referencia con override transparente y destello lila controlado

**Decisión:** El CTA principal `Contactar` del navbar usa una primitive reusable `StarBorder` alineada con la referencia original de React Bits, y el acabado transparente se aplica como override local desde el propio navbar. El pulso lila debe leerse fuera del borde o sobre su perímetro, no dentro del interior transparente del botón. En `hover`, el CTA rellena el interior en blanco, pasa el texto a negro, adapta la línea del borde a blanco, pausa temporalmente el pulso y mantiene la escala `1.05`.

**Motivo:** El navbar necesitaba una pieza de énfasis más distintiva que el botón plano, pero sin mantener una fork innecesaria del componente base. Mantener la primitive cerca de la referencia reduce drift y deja la personalización de marca en la capa de consumo.

**Efecto:** `StarBorder` queda disponible como primitive reusable en `components/ui/` con una base más fiel a React Bits, mientras que shells oscuros como el navbar pueden aplicar overrides visuales de marca sin redefinir la primitive completa ni convertir el destello animado en un relleno interior accidental. Los links centrales del navbar usan además un hover con inercia suave, basado en microescala y una curva elástica contenida, sin desplazamiento físico para evitar reactivaciones espurias al salir.

**Archivos / artefactos relevantes:** `components/ui/star-border.tsx`, `components/ui/star-border.module.css`, `components/layout/navbar.tsx`, `DESIGN.md`.

---

## 2026-05-03 — La home pública arranca con un `Preloader` de branding heredado de `nebula-legacy`

**Decisión:** La entrada inicial de la home monta un `Preloader` overlay con logo animado y barra de progreso, adaptado desde `nebula-legacy` y conectado al evento `hero-grid-ready` emitido por `GridScan`.

**Motivo:** El legacy ya tenía una pieza de entrada coherente con la identidad de marca. Reutilizarla aquí preserva continuidad visual y evita reconstruir desde cero una experiencia de carga ya validada.

**Efecto:** La home pública gana una transición de entrada con duración mínima de branding y salida coordinada con la disponibilidad del hero. El loader queda como primitive específica de la home, no como patrón indiscriminado para todo el sitio.

**Archivos / artefactos relevantes:** `components/ui/preloader.tsx`, `components/ui/nebula-logo-animated.tsx`, `components/home/grid-scan.tsx`, `app/page.tsx`, `DESIGN.md`.

---

## 2026-05-03 — El hero principal entra en tres tiempos con `SplitText` y CTAs en fade-up

**Decisión:** El copy principal del hero usa una secuencia de entrada en tres tiempos: heading primero mediante `SplitText`, subheading después con el mismo lenguaje de `SplitText` pero más calmado, y CTAs al final con `fade-up`, sincronizado con la salida del preloader.

**Motivo:** El hero ya tenía una capa visual fuerte con `GridScan` y preloader. Añadir motion al copy sin orquestación temporal degradaría la lectura y competiría con la entrada de marca.

**Efecto:** La animación del bloque principal queda subordinada a la transición del preloader con un stagger por caracteres coherente entre heading y subheading, pero con timings ágiles y sin pausas muertas largas antes de la entrada de CTAs. `DecryptedText` sigue disponible en la librería local para otros reveals tipográficos donde convenga un comportamiento distinto.

**Archivos / artefactos relevantes:** `components/ui/split-text.tsx`, `components/ui/decrypted-text.tsx`, `components/home/hero-lead.tsx`, `components/home/hero.tsx`, `components/ui/preloader.tsx`, `DESIGN.md`.

---

## 2026-05-03 — `Frontend Developer` y `ui-ux-pro-max` quedan activos para superficies premium

**Decisión:** El sistema de agentes del repo mantiene `Frontend Developer` como rol especializado para frontend premium y `ui-ux-pro-max` como skill repo-local de apoyo para diseño, motion y UX.

**Motivo:** La percepción del estudio depende tanto de la arquitectura del código como de la calidad del shell público.

**Efecto:** Tareas centradas en interfaz, storytelling visual, jerarquía o responsive exigente pueden cargar `roles/07-role-frontend-developer.md` y `skills/ui-ux-pro-max/`.

**Archivos / artefactos relevantes:** `AGENTS.md`, `.agents/README.md`, `.agents/skills/README.md`, `.agents/roles/07-role-frontend-developer.md`.

---

## 2026-05-04 — Todas las buttons reutilizables comparten una primitive motion de `animate-ui`

**Decisión:** Nebula adopta la primitive `animate-ui` de botones como base técnica compartida para `components/ui/button.tsx` y para el shell `StarBorder` del CTA del navbar, manteniendo las variants visuales propias del proyecto por encima de esa base.

**Motivo:** La web necesitaba unificar interacción y micro-motion entre botones sin perder el lenguaje visual Nebula ni duplicar comportamientos de hover/tap en primitives separadas.

**Efecto:** Los CTAs del hero y el CTA premium del navbar pasan a apoyarse en la misma primitive motion subyacente. El styling sigue viviendo en wrappers Nebula, pero la semántica de interacción queda centralizada.

**Archivos / artefactos relevantes:** `components/animate-ui/primitives/buttons/button.tsx`, `components/animate-ui/components/buttons/button.tsx`, `components/ui/button.tsx`, `components/ui/star-border.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — El navbar responsive usa un `StaggeredMenu` fullscreen retemado a Nebula

**Decisión:** La navegación responsive de Nebula adopta un overlay escalonado fullscreen basado en `StaggeredMenu` de React Bits para móvil y tablet, con hamburguesa de tres líneas en reposo y tratamiento tipográfico homogéneo para todos los destinos del menú. La versión desktop conserva el shell glass con links inline y CTA premium.

**Motivo:** El navbar necesitaba una solución responsive con más carácter que un drawer genérico, pero sin sacrificar continuidad visual con el lenguaje dark-tech del proyecto.

**Efecto:** Por debajo de desktop, la navegación se resume a lockup + hamburguesa y se resuelve dentro de un overlay escalonado a pantalla completa con GSAP, adaptado al App Router, a `Link` de Next.js y al branding Nebula.

**Archivos / artefactos relevantes:** `components/layout/navbar.tsx`, `components/layout/navbar-staggered-menu.tsx`, `components/StaggeredMenu.tsx`, `components/StaggeredMenu.css`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — La primitive local `DecryptedText` se retira del repo

**Decisión:** Nebula elimina `components/ui/decrypted-text.tsx` y su stylesheet asociado al no existir ya ningún uso runtime ni una necesidad clara de mantener esa primitive en la librería local.

**Motivo:** Mantener primitives sin consumo real añade superficie muerta, ruido documental y coste de mantenimiento innecesario en un repo que hoy solo necesita `SplitText` para los reveals tipográficos activos.

**Efecto:** La librería UI queda más estrecha y coherente con el runtime actual. El histórico del `change-log` conserva el rastro de su uso pasado, pero la referencia técnica viva deja de listarlo como primitive disponible.

**Archivos / artefactos relevantes:** `components/ui/decrypted-text.tsx`, `components/ui/decrypted-text.module.css`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — El sistema de agentes reconoce `cleanup` como auditoría de higiene read-only

**Decisión:** Nebula añade `cleanup` como trigger operativo del sistema de agentes para lanzar una auditoría profunda de higiene técnica antes de borrar, fusionar o sanear código.

**Motivo:** El repo ya presenta categorías de drift que no son bugs de runtime puros: referencias documentales a superficies inexistentes, tooling declarado pero no expuesto, primitives potencialmente huérfanas, bootstrap aparcado y registros del `change-log` con riesgo de incoherencia. Hacía falta una entrada canónica equivalente a `init`, pero centrada en limpieza segura y no en bootstrap.

**Efecto:** Cuando Martín use `cleanup`, el agente debe ejecutar primero `workflows/cleanup-audit.md`, tratarlo como read-only por defecto, clasificar hallazgos por riesgo y coste, y distinguir basura probable de legacy aparcado antes de tocar nada. Si `cleanup` llega solo, el flujo se detiene tras el informe; si llega con objetivo concreto, la auditoría precede a la limpieza dentro de ese scope.

**Archivos / artefactos relevantes:** `AGENTS.md`, `.agents/rules/00-operating-mode.md`, `.agents/workflows/cleanup-audit.md`, `.agents/workflows/task-start.md`, `.agents/README.md`.

---

## 2026-05-04 — El CTA `Contactar` del navbar deja de usar `StarBorder` y la primitive se retira

**Decisión:** Nebula elimina `StarBorder` del navbar y retira la primitive local `components/ui/star-border.*` al no quedar ya ningún uso runtime que justifique mantenerla.

**Motivo:** El efecto había dejado de ser necesario para la jerarquía actual del navbar. Mantener una primitive específica solo para un borde animado sin consumo restante añade superficie muerta, ruido documental y más coste de mantenimiento del que aporta.

**Efecto:** El CTA `Contactar` pasa a resolverse con la primitive estándar `Button`, en variante outlined transparente sobre shell oscuro, con hover blanco y texto negro. La librería UI queda más estrecha y el sistema de botones se simplifica alrededor de una única base reusable.

**Archivos / artefactos relevantes:** `components/layout/navbar.tsx`, `components/ui/button.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — La home incorpora una banda de propuesta de valor con lectura palabra a palabra en scroll

**Decisión:** Nebula añade inmediatamente después del hero una sección editorial de propuesta de valor con dos frases activas y una primitive reusable `WordByWordColorChange` que interpola cada palabra de blanco con opacidad baja a `#E8E8F0` según una progresión de scroll compartida por toda la banda.

**Motivo:** La home necesitaba una segunda capa de autoridad tras el hero: menos atmosférica y más argumental. El objetivo no era sumar otra tarjeta o otro bloque genérico de servicios, sino reforzar diferenciación con statements tajantes y una lectura guiada por scroll que se sienta premium sin romper la sobriedad del sistema.

**Efecto:** La narrativa pública gana una segunda banda editorial de autoridad inmediatamente después del hero. La capa UI incorpora además una primitive reutilizable para copy corto animado por scroll, útil en nuevas surfaces editoriales si siguen el mismo criterio de densidad y legibilidad.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/home/value-proposition-section.tsx`, `components/ui/word-by-word-color-change.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — La banda de propuesta de valor abandona el gradiente `Navy` para no cortar con el hero

**Decisión:** La sección de propuesta de valor deja de usar el gradiente vertical `Void -> Navy -> Void` y pasa a apoyarse sobre base `Void` continua, con un único acento radial lila muy tenue.

**Motivo:** En runtime seguía percibiéndose una costura visible entre la salida del hero y la entrada de la banda editorial. El gradiente `Navy` abría un bloque cromático nuevo justo donde el usuario necesitaba continuidad.

**Efecto:** La transición hero → benefits deja de leerse como cambio de superficie. La sección mantiene atmósfera propia por tipografía y ritmo, pero no por una banda de color separada.

**Archivos / artefactos relevantes:** `components/home/value-proposition-section.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — El toggle hamburguesa del navbar responsive morfea a `X` con `framer-motion`

**Decisión:** La navegación responsive de Nebula deja de alternar dos SVGs estáticos para el toggle y pasa a resolver la transición hamburguesa → `X` con tres barras animadas mediante `framer-motion`.

**Motivo:** Martín pidió una transición visible y más pulida entre el icono cerrado y el estado abierto del menú móvil. El swap brusco anterior funcionaba, pero se sentía más como reemplazo de asset que como transformación del mismo control.

**Efecto:** El navbar responsive gana una microinteracción más coherente con el resto del motion del proyecto, manteniendo además respeto por `prefers-reduced-motion`.

**Archivos / artefactos relevantes:** `components/StaggeredMenu.tsx`, `components/StaggeredMenu.css`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — La banda de propuesta de valor pasa a un stage sticky de frase unica

**Decisión:** Nebula deja de resolver la banda de benefits como una secuencia vertical de frases con runway final y la convierte en un stage sticky de viewport completo donde solo una frase permanece activa y centrada cada vez.

**Motivo:** El modelo anterior seguía dependiendo de espacio residual al final de la sección y no aislaba bien cada statement. Martín pidió una lectura más controlada: una frase por pantalla, con entrada y salida limpias, sin acumular varias a la vez en el viewport.

**Efecto:** La banda gana un ritmo editorial más firme y autosuficiente. Cada frase entra desde abajo, se asienta en el centro, colorea sus palabras durante su propio tramo de scroll y desaparece antes de ceder el escenario a la siguiente, sin requerir runway vacío extra posterior.

**Archivos / artefactos relevantes:** `components/home/value-proposition-statements.tsx`, `components/home/value-proposition-section.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — La home reincorpora el carrusel de servicios de `nebula-legacy` retemado al sistema actual

**Decisión:** Nebula recupera la mecánica del carrusel de servicios existente en `nebula-legacy`, pero la integra como sección propia del proyecto actual, con datos públicos en español, palette Nebula vigente y comportamiento responsive diferenciado por breakpoint.

**Motivo:** La home ya necesitaba aterrizar capacidades reales del estudio después del framing inicial y la banda de propuesta de valor. Reutilizar la mecánica del carrusel legado evita reinventar una primitive compleja que ya estaba probada, pero era necesario retemarla para que no entrase como un bloque visual ajeno ni con copy desalineado del dominio actual.

**Efecto:** La narrativa pública gana una tercera sección clara para evaluar encaje. Desktop usa un arco sticky guiado por scroll vertical y móvil/tablet un carrusel horizontal con snap nativo. El catálogo de servicios queda explicitado alrededor de cuatro capacidades confirmadas del estudio: arquitectura a medida, desarrollo full-stack, evolución continua y consultoría/digitalización.

**Archivos / artefactos relevantes:** `components/home/services-carousel.tsx`, `data/services.ts`, `app/page.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — El navbar desktop mantiene navegación inline simple

**Decisión:** Nebula retira el chevron y cualquier preview expandida o dropdown asociada a `Servicios` en desktop. Todos los destinos del navbar vuelven a resolverse como links inline simples dentro del shell principal.

**Motivo:** La capa expandida añadió complejidad visual y técnica sin alcanzar una transición suficientemente suave, ordenada y seamless para el estándar del proyecto. La navegación inline vuelve a ser la opción más limpia y robusta.

**Efecto:** El navbar desktop recupera una sola altura, una sola lectura material y una interacción más estable. El catálogo público de servicios permanece únicamente en su sección propia de la home.

**Archivos / artefactos relevantes:** `components/layout/navbar.tsx`, `data/services.ts`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — El scroll raíz público se suaviza con `Lenis` y preserva opt-out en superficies anidadas

**Decisión:** Nebula integra `Lenis` a nivel global sobre el scroll raíz de la web pública, con anclas internas activas, offset para el navbar fijo y desactivación automática cuando el usuario expresa `prefers-reduced-motion`.

**Motivo:** La home actual ya depende mucho de atmósfera, ritmo y composición; el scroll nativo era funcional, pero no acompañaba con la misma calidad percibida el resto de motion del proyecto. Aun así, suavizarlo sin respetar accesibilidad o sin proteger scrollers locales habría sido un empeoramiento, no un upgrade.

**Efecto:** El sitio gana un desplazamiento más controlado y coherente con el lenguaje premium de Nebula. Al mismo tiempo, el `Preloader`, el panel del `StaggeredMenu` y el carrusel móvil de servicios preservan su comportamiento mediante opt-out explícito del scroll raíz; cuando una superficie necesita conservar swipe horizontal sin matar el scroll vertical del documento, la protección debe ser granular (`data-lenis-prevent-touch`) y no un bloqueo total.

**Archivos / artefactos relevantes:** `package.json`, `package-lock.json`, `app/layout.tsx`, `app/globals.css`, `components/layout/lenis-provider.tsx`, `components/ui/preloader.tsx`, `components/StaggeredMenu.tsx`, `components/home/services-carousel.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — Las cards del carrusel de servicios se simplifican a heading, símbolo 3D y descripción

**Decisión:** Las cards del carrusel de servicios eliminan `eyebrow` e iconografía específica por servicio. Su composición queda fijada como `heading superior / símbolo 3D oficial de Nebula en el centro / descripción inferior`.

**Motivo:** La versión anterior seguía heredando una jerarquía más genérica de `eyebrow + icono + copy`. Martín pidió una lectura más limpia y más alineada con la identidad visual propia de Nebula, usando el cubo 3D de marca como pieza central en vez de iconos de categoría.

**Efecto:** La sección de servicios gana una composición más consistente con el sistema visual del proyecto y el catálogo `data/services.ts` se estrecha a los únicos campos que realmente consume la UI.

**Archivos / artefactos relevantes:** `components/home/services-carousel.tsx`, `data/services.ts`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — Las cards de servicios añaden un CTA secundario de cierre

**Decisión:** Cada card del carrusel de servicios incorpora un único CTA `Ver más` usando la variante `secondary` del sistema de botones.

**Motivo:** La sección ya explicaba capacidades, pero no ofrecía una salida contextual directa desde cada servicio. El CTA debía existir sin romper la composición principal ni convertir la sección en una rejilla de llamadas a la acción agresivas.

**Efecto:** Cada card gana una salida comercial ligera al final de su franja inferior. La jerarquía del carrusel se mantiene estable y el sistema reutiliza una primitive de botón ya canónica.

**Archivos / artefactos relevantes:** `components/home/services-carousel.tsx`, `components/ui/button.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-06 — El CTA de las cards de servicios adopta una huella mayor

**Decisión:** El botón `Ver más` de las cards del carrusel de servicios pasa a usar tamaño `lg` del sistema, con algo más de respiración horizontal y una flecha ligeramente mayor.

**Motivo:** Martín pidió hacer más grande el botón dentro de las cards para mejorar presencia y legibilidad sin cambiar la jerarquía general de la composición.

**Efecto:** El CTA gana peso visual moderado y se lee mejor en desktop y móvil, manteniéndose todavía como acción de apoyo y no como foco principal de la card.

**Archivos / artefactos relevantes:** `components/home/services-carousel.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-06 — La sección de servicios abandona el carrusel horizontal en móvil y pasa a lista vertical

**Decisión:** La variante móvil de `services-carousel` deja de resolverse como carrusel horizontal con swipe y pasa a renderizar una lista vertical de cards completas, manteniendo el mismo shell visual, iconografía 3D, CTA y atmósfera de partículas.

**Motivo:** Martín priorizó navegación móvil limpia por encima del gesto horizontal oculto. Con solo cuatro servicios, el carrusel añadía fricción, competía con el scroll natural del documento y obligaba a descubrir una interacción secundaria para leer toda la oferta.

**Efecto:** En desktop se conserva el arco sticky como pieza diferencial. En móvil, la sección gana claridad, accesibilidad y compatibilidad con `Lenis`: el usuario puede seguir bajando sin pelearse con una superficie horizontal, mientras todas las capacidades quedan visibles en una sola lectura vertical.

**Archivos / artefactos relevantes:** `components/home/services-carousel.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — El carrusel de servicios usa el icono 3D de `public/3d-Icons` como pieza central

**Decisión:** Las cards del carrusel de servicios dejan de usar el símbolo oficial de Nebula como pieza central y pasan a renderizar el asset `public/3d-Icons/iphone-icon-3d.png`.

**Motivo:** Martín pidió reutilizar el icono 3D disponible en el repo para esta sección. El objetivo es dar más carácter de objeto/producto a las cards y separar visualmente esta surface del uso más identitario del símbolo oficial de Nebula.

**Efecto:** La sección de servicios mantiene la misma composición y glow de soporte, pero reemplaza el cubo de marca por un icono 3D dedicado servido desde `public/3d-Icons`.

**Archivos / artefactos relevantes:** `components/home/services-carousel.tsx`, `public/3d-Icons/iphone-icon-3d.png`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — El catálogo visible de servicios se renombra a móvil, web, evolución y auditoría

**Decisión:** Las cuatro cards del carrusel pasan a usar los títulos `Desarrollo móvil`, `Desarrollo web`, `Evolución continua` y `Consultoría y digitalización`.

**Motivo:** Martín pidió alinear el naming visible del bloque a esas cuatro capacidades concretas. El cambio no afecta a la mecánica del carrusel, pero sí al framing comercial con el que la home presenta el catálogo.

**Efecto:** El carrusel deja de vender `arquitectura a medida` y `desarrollo full-stack` como labels primarios y pasa a presentarse con una lectura más directa y más comercial de capacidades.

**Archivos / artefactos relevantes:** `data/services.ts`, `components/home/services-carousel.tsx`, `doc/reference/technical-reference.md`.

---

## 2026-05-04 — Cada servicio usa su propio icono 3D del set público

**Decisión:** El carrusel de servicios deja de reutilizar un único icono 3D para todas las cards y pasa a mapear un asset específico por servicio desde `public/3d-Icons`.

**Motivo:** Martín pidió que las cards usaran los iconos del set público “en sus respectivas cards”. El cambio refuerza diferenciación visual entre servicios sin alterar la mecánica del carrusel.

**Efecto:** `Desarrollo móvil`, `Desarrollo web`, `Evolución continua` y `Consultoría y digitalización` quedan asociados respectivamente a `iphone`, `webPanel`, `grafico` y `lupa`.

**Archivos / artefactos relevantes:** `data/services.ts`, `components/home/services-carousel.tsx`, `public/3d-Icons/*`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — Las cards del carrusel de servicios adoptan un `BorderGlow` perimetral visible y sin cambio geométrico

**Decisión:** Las cards de servicios integran una primitive repo-local `BorderGlow`, inspirada en React Bits, pero adaptada para que el glow sea legible en Chrome sobre fondos oscuros y no altere la geometría base de la card.

**Motivo:** Martín pidió aplicar el efecto `@react-bits/BorderGlow-TS-CSS` al carrusel. La receta importada funcionaba en código, pero en runtime el efecto era demasiado débil y, en pruebas reales sobre `localhost`, resultaba prácticamente invisible. Fue necesario simplificar la lógica visual y reforzar el halo perimetral para obtener una lectura clara sin convertir la card en un objeto interactivo agresivo.

**Efecto:** El hover de las cards sigue sin mover, escalar ni deformar la composición, pero ahora sí añade un acento luminoso visible alrededor del perímetro. La primitive queda además reusable para futuras superficies dark-tech del sistema.

**Archivos / artefactos relevantes:** `components/BorderGlow.tsx`, `components/BorderGlow.module.css`, `components/home/services-carousel.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — La banda de benefits añade dos `abstract-icons` sincronizados por frase

**Decisión:** La sección sticky de benefits incorpora una capa ornamental propia con dos imágenes de `public/abstract-icons` por frase, sincronizadas con el ciclo del statement activo en vez de ejecutarse como partículas autónomas genéricas.

**Motivo:** Martín pidió reforzar la atmósfera espacial de la banda sin convertirla en ruido. El patrón correcto no era reutilizar la primitive de partículas, porque aquí los elementos debían aparecer junto al copy, sostenerse visibles durante todo el tramo activo y salir solo al cambiar de frase.

**Efecto:** Cada statement gana dos masas visuales lilas detrás del titular, con `pop-in` de entrada, deriva lenta y salida por `fade`. La sección mantiene así continuidad estética con hero y services, pero con un comportamiento ornamental propio y más editorial.

**Archivos / artefactos relevantes:** `components/home/value-proposition-statements.tsx`, `components/home/value-proposition-ornaments.module.css`, `public/abstract-icons/*`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — El navbar público recupera el patrón hide-on-scroll de `nebula-legacy`

**Decisión:** El navbar actual replica el comportamiento de `nebula-legacy`: visible al subir o cerca del top, oculto al bajar pasado un umbral. Si el menú responsive está abierto, el navbar se mantiene visible.

**Motivo:** Martín pidió preservar esa sensación de limpieza en scroll del proyecto anterior sin renunciar al shell y a la navegación responsive actuales.

**Efecto:** La cabecera pública ocupa menos presencia al descender por la página, pero sigue siendo recuperable de forma inmediata al remontar. La versión móvil no queda en un estado incoherente porque la apertura del menú responsive fuerza la visibilidad del navbar.

**Archivos / artefactos relevantes:** `components/layout/navbar.tsx`, `components/layout/navbar-staggered-menu.tsx`, `components/StaggeredMenu.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — El path de `How we work` solo toca borde al entrar y al salir

**Decisión:** La línea SVG desktop de `How we work` ya no debe apurar lateralmente cada tramo entre nodos. El path solo toca el borde del viewport en su punto inicial y en su punto final; entre hitos empieza a curvar hacia el siguiente nodo justo después de atravesar el actual y reserva su mayor amplitud para las curvas de nodos intermedios, no para los extremos.

**Motivo:** Martín pidió eliminar la sensación de que el serpenteo rebota innecesariamente contra los bordes en cada cambio de lado y, después, abrir más la curva porque el recorrido seguía viéndose demasiado forzado. A continuación precisó que esa amplitud extra debía vivir solo en los nodos intermedios. El timeline debía seguir sintiéndose full-width, pero con una lectura más limpia, menos mecánica y más orgánica entre nodos.

**Efecto:** El timeline mantiene la entrada y salida desde los laterales con un gesto más sobrio, mientras concentra la mayor apertura visual en las curvas que enlazan nodos intermedios. La amplitud visual sale de la alternancia entre nodos y del stage vertical, no de forzar contacto lateral repetido ni de sobreactuar los extremos.

**Archivos / artefactos relevantes:** `components/home/how-we-work.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — Los nodos de `How we work` se simplifican a un único círculo opaco con icono

**Decisión:** Los hitos visuales de `How we work` dejan de usar círculos concéntricos y pasan a resolverse como una única pieza circular opaca con el icono centrado.

**Motivo:** Martín pidió reducir ruido visual en los nodos y asegurar que su masa se leyera sólida. El tratamiento anterior funcionaba como foco luminoso, pero añadía demasiada ornamentación y todavía dejaba una sensación de transparencia innecesaria para una primitive que debía actuar más como hito limpio que como medallón complejo.

**Efecto:** El timeline mantiene presencia y legibilidad, pero gana una lectura más sobria y directa. Los nodos bloquean visualmente la línea al cruzarlos y se alinean mejor con un lenguaje simple y técnico tanto en desktop como en móvil.

**Archivos / artefactos relevantes:** `components/home/how-we-work.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — `How we work` alinea su paleta con el lila de marca del resto del sitio

**Decisión:** La sección `How we work` deja de apoyarse en un violeta más morado para sus halos, línea y superficies de acento, y pasa a usar el mismo lila azulado que hoy domina `services-carousel`, con `Haze` como apoyo secundario.

**Motivo:** Martín detectó que la sección seguía desviándose cromáticamente respecto al resto del sitio. Aunque estaba cerca del sistema, todavía usaba un tono más morado en puntos clave del path y de los overlays. Después pidió explícitamente que se tomase como referencia el lila azulado ya usado en servicios para cerrar de verdad esa continuidad visual.

**Efecto:** El timeline mantiene su estructura y motion, pero ahora se percibe como parte del mismo lenguaje de marca que el resto de la home. La continuidad sale del mismo lila azulado de servicios, no de una variación paralela más saturada.

**Archivos / artefactos relevantes:** `components/home/how-we-work.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — Las cards de `How we work` usan un gradiente vertical dark-tech fijo

**Decisión:** Las cards de proceso usan como superficie base un gradiente vertical fijo `#0B0C17 -> #0D0F24 -> #0A0F2E`, aplicado de arriba abajo tanto en desktop como en móvil.

**Motivo:** Martín pidió endurecer la base material de las cards con una secuencia tonal exacta, manteniendo el resto de la atmósfera lila como overlay y no como fondo principal.

**Efecto:** La sección gana una base más consistente y más cercana al lenguaje dark-tech del sitio. Los halos lilas siguen existiendo, pero ya no definen por sí solos la masa de la card.

---

## 2026-05-05 — `How we work` integra la familia Navy como base ambiental de sección

**Decisión:** La sección `How we work` deja de descansar sobre `Void` plano y pasa a usar las tonalidades `Navy` `#0B0C17 -> #0D0F24 -> #0A0F2E` como base ambiental del bloque, manteniendo el lila azulado solo para línea, halos y acentos.

**Motivo:** Martín pidió que esas mismas tonalidades no se quedaran encapsuladas en las cards, sino que impregnasen la sección completa para unificar materialidad y fondo.

**Efecto:** La sección se percibe más cohesionada: cards, nodos y ambiente comparten el mismo sustrato dark-tech, mientras el lila conserva su función de firma lumínica y no de color dominante.

---

## 2026-05-05 — `How we work` recupera base `Void` en el fondo de sección

**Decisión:** El fondo base de `How we work` vuelve a usar `Void`, igual que el resto de secciones públicas. La familia `Navy` `#0B0C17 -> #0D0F24 -> #0A0F2E` se conserva solo en las cards y como cierre tonal de los nodos.

**Motivo:** Martín pidió que la sección no quedara teñida de forma distinta al resto del recorrido y que el fondo de bloque recuperara continuidad con la home.

**Efecto:** La transición entre secciones vuelve a sentirse más uniforme. El carácter `Navy` sigue presente, pero concentrado en superficies internas donde aporta materialidad sin romper la base común del sitio.

---

## 2026-05-05 — Las cards de `How we work` eliminan el halo inferior derecho

**Decisión:** Las cards de `How we work` mantienen un único acento atmosférico superior y eliminan el segundo gradiente circular de la esquina inferior derecha.

**Motivo:** Martín pidió limpiar la superficie interna de las cards y retirar ese segundo halo, que recargaba la lectura del material dark-tech.

**Efecto:** La card queda más sobria y técnica. El foco vuelve a recaer en título, copy y gradiente base, con un único apoyo lumínico controlado.

---

## 2026-05-05 — `How we work` elimina el glow superior izquierdo del bloque

**Decisión:** La atmósfera del bloque `How we work` deja de usar el radial de la esquina superior izquierda y conserva solo un halo contenido fuera de ese cuadrante.

**Motivo:** Martín pidió limpiar ese glow porque rompía la sobriedad del fondo y añadía un punto de luz innecesario en la entrada de la sección.

**Efecto:** El bloque gana un arranque más limpio y uniforme con el resto de la home, sin perder del todo la atmósfera ambiental secundaria.

---

## 2026-05-05 — El texto de las cards de `How we work` pasa a blanco

**Decisión:** La numeración, el título y la descripción dentro de las cards de `How we work` se resuelven en blanco tanto en desktop como en móvil.

**Motivo:** Martín pidió que el texto interno de cada card fuese blanco para aumentar contraste y coherencia sobre la base `Navy`.

**Efecto:** Las cards ganan una jerarquía más clara y un contraste más directo frente al fondo oscuro, sin depender de matices lilas o plateados para la legibilidad principal.

---

## 2026-05-05 — `How we work` elimina también el glow inferior derecho del bloque

**Decisión:** La sección `How we work` deja de usar cualquier halo ambiental de fondo en el bloque. Se elimina también el glow inferior derecho que seguía vivo en la atmósfera general.

**Motivo:** Martín pidió limpiar ese último hotspot para que la base `Void` del bloque quedara completamente sobria y consistente con el resto de la home.

**Efecto:** La sección queda sin glow ambiental de fondo. La profundidad visual pasa a apoyarse solo en cards, nodos y línea, con un resultado más limpio y técnico.

---

## 2026-05-05 — El nodo desktop de `How we work` colapsa a una sola capa real

**Decisión:** El nodo desktop de `How we work` deja de usar un wrapper exterior más un contenedor visual interior. La pieza visible, medible y animable pasa a ser un único `motion.div`.

**Motivo:** Martín cuestionó con razón la necesidad de dos contenedores anidados. El wrapper exterior ya no aportaba valor funcional suficiente y añadía ruido estructural.

**Efecto:** El nodo desktop queda más limpio de mantener y más coherente con la intención visual de "un único círculo con icono". El debug box sigue existiendo porque Martín pidió conservar los bordes de depuración.

**Archivos / artefactos relevantes:** `components/home/how-we-work.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`.

---

## 2026-05-05 — El runtime público queda preparado para Vercel Speed Insights

**Decisión:** La web pública integra `@vercel/speed-insights` en el root layout mediante la primitive oficial `SpeedInsights` para Next.js.

**Motivo:** Martín pidió seguir la integración oficial de Vercel Speed Insights, pero sin hacer todavía `push` ni `deploy`. El cambio debía dejar listo el runtime para empezar a recopilar métricas reales en cuanto exista un despliegue posterior en Vercel.

**Efecto:** El proyecto añade una capa mínima de observabilidad de rendimiento sin alterar la UX pública ni el routing. La recopilación real de datos queda pendiente del despliegue, pero el código ya está preparado siguiendo la vía recomendada por Vercel.

**Archivos / artefactos relevantes:** `package.json`, `package-lock.json`, `app/layout.tsx`, `doc/reference/technical-reference.md`.

---

## 2026-05-06 — La home pública adopta directorios canónicos por sección dentro de `components/home/`

**Decisión:** Las secciones públicas sustanciales de la home deben vivir en carpetas canónicas propias dentro de `components/home/`, con `index.tsx` como entrypoint público y breakdown colocalizado por responsabilidad (`primitives.tsx`, `constants.ts`, `types.ts`, `content.ts`, `geometry.ts`/`path.ts`, CSS Module cuando aplique).

**Motivo:** Las secciones de la home habían crecido hasta concentrar layout, motion, copy, geometría y variantes responsive en archivos monolíticos o en piezas dispersas. La organización por carpetas reduce acoplamiento, aclara ownership y hace más barato iterar sin abrir wrappers paralelos ni duplicar estructura.

**Efecto:** El estado objetivo del repo deja de ser `components/home/*.tsx` para secciones complejas. Las páginas deben consumir paths de directorio canónicos como `@/components/home/hero`, `@/components/home/value-proposition-section`, `@/components/home/services-carousel` y `@/components/home/how-we-work`. Las fachadas de compatibilidad solo se aceptan como ayuda transitoria durante migraciones explícitas y deben retirarse al cerrar la consolidación.

**Archivos / artefactos relevantes:** `.agents/rules/03-nextjs-web-rules.md`, `.agents/rules/07-code-style-and-implementation-rules.md`, `.agents/workflows/task-start.md`, `AGENTS.md`, `components/home/**`, `doc/reference/technical-reference.md`.

---

## 2026-05-06 — `projects-showcase` se implementa por fases y la fase 2 introduce un primer panel sobre el heading

**Decisión:** La sección pública `projects-showcase` mantiene un rollout incremental. Tras estabilizar el pinning del heading `Proyectos destacados`, el runtime actual añade solo un primer panel de proyecto que asciende desde abajo y lo cubre. El segundo y tercer caso siguen diferidos.

**Motivo:** El stage completo de portfolio era demasiado frágil cuando sticky, timeline y varios paneles entraban a la vez. Separar primero el pinning y después la primera superposición permite validar el patrón real antes de escalarlo.

**Efecto:** El anchor `/#proyectos` ya no aterriza en una simple pantalla tipográfica; ahora abre una transición visible entre título y primer caso. Nebula gana una primitive de portfolio más demostrativa sin reintroducir todavía la complejidad completa de tres proyectos encadenados.

**Archivos / artefactos relevantes:** `components/home/projects-showcase/**`, `app/page.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/reference/domain-reference.md`.

---

## 2026-05-07 — `projects-showcase` completa la coreografía de tres proyectos sobre el mismo stage

**Decisión:** La sección pública `projects-showcase` deja atrás la fase de un solo caso y encadena ya tres proyectos full-screen que ascienden desde abajo y se cubren entre sí sobre el mismo stage sticky del heading.

**Motivo:** El patrón base de pinning y primera superposición ya estaba estable. Martín pidió completar la sección con los dos proyectos restantes para que la narrativa de portfolio no se cortase después del primer caso.

**Efecto:** El runtime actual ya expresa la intención original completa de la primitive: pausa tipográfica, primer proyecto en dos tiempos y relevo progresivo hacia segundo y tercer caso. La coreografía activa queda fijada como `entrada bottom-up compacta deslizándose sobre el heading sticky + expansión a full-screen / right-to-left / right-to-left`, con empuje del panel saliente por el entrante y sin desplazar el título durante el primer takeover. El siguiente ajuste estructural razonable pasa a ser la variante simplificada para móvil/tablet, no la reintroducción de más paneles desktop.

**Archivos / artefactos relevantes:** `components/home/projects-showcase/**`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-07 — `projects-showcase` degrada en móvil a lista vertical con CTA visible

**Decisión:** La sección pública `projects-showcase` deja de compartir el mismo stage full-screen en todos los breakpoints y pasa a renderizar en móvil y tablet una lista vertical de cards simplificadas.

**Motivo:** Martín pidió explícitamente que en la versión móvil cada proyecto mostrase su descripción y el botón `Ver más`. El layout sticky heredado de desktop ocultaba demasiado contenido útil dentro de un viewport demasiado rígido para pantallas pequeñas.

**Efecto:** Desktop conserva la narrativa scroll-driven de takeover full-screen. Móvil y tablet ganan una lectura directa y utilitaria: cada proyecto mantiene su visual superior, pero reduce el bloque editorial a título + descripción + CTA, sin estado, metadatos ni stack.

**Archivos / artefactos relevantes:** `components/home/projects-showcase/**`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-07 — La shell pública adopta una barra superior de progreso de scroll

**Decisión:** El layout global incorpora una barra superior de progreso de scroll fijada al borde superior del viewport, con línea base tenue, fill lilac/silver puro y una inercia ligera propia tipo scrollbar premium, sin glow adicional.

**Motivo:** Martín pidió una señal global de avance del documento que se sintiera sutil, elegante y con suavidad perceptible, y después pidió desplazarla al borde superior para leerla como scrollbar de la página.

**Efecto:** La home gana una referencia continua del progreso total del documento y refuerza el carácter editorial/tecnológico de la shell sin cargar el lateral del viewport. La primitive queda fijada como comportamiento global de layout, no como adorno local de una sola sección, y respeta `prefers-reduced-motion` reduciendo la interpolación ornamental cuando hace falta.

**Archivos / artefactos relevantes:** `app/layout.tsx`, `components/layout/scroll-progress-bar.tsx`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-07 — Remotion se integra como subsistema dev-only aislado del runtime público

**Decisión:** Nebula añade un subsistema `remotion/` para Studio y renders locales de vídeo, separado del runtime público de Next.js y sin reutilización directa de componentes acoplados a `next/image`, `next/font` o lógica scroll-driven.

**Motivo:** Martín quiere empezar a generar vídeos del proyecto desde el mismo repo, pero sin contaminar la web pública con una capa de rendering de vídeo ni comprometer una futura evolución a un sistema más profesional.

**Efecto:** El repo gana scripts locales de vídeo, una composición base `NebulaShowcase`, tokens/fuentes propias de vídeo y una frontera arquitectónica clara entre web pública y sistema de render. El estado objetivo es compartir branding, assets y criterio visual, no runtime-heavy web components.

**Archivos / artefactos relevantes:** `package.json`, `package-lock.json`, `.gitignore`, `remotion/**`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-07 — `testimonials` se coloca después de `projects-showcase` con composición orbital sobria

**Decisión:** La home añade una surface `testimonials` inmediatamente después de `projects-showcase` y antes del cierre comercial futuro. Desktop usa una composición editorial orbital con una cita protagonista centrada y hasta dos apoyos diagonales; móvil y tablet degradan a un stack vertical limpio.

**Motivo:** Después de la capa técnica de proyectos, Nebula necesitaba una prueba social más humana antes del cierre comercial. A la vez, el repo no contiene todavía citas publicables verificadas, así que el diseño debía integrarse sin inventar testimonios ni bloquear la surface.

**Efecto:** La home gana una nueva primitive narrativa de confianza y deja explícito que, mientras no existan testimonios aprobados con nombre, rol y empresa verificables, el catálogo local debe sembrarse con placeholders honestos y sustituibles, nunca con citas fabricadas.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/home/testimonials/**`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/reference/domain-reference.md`, `doc/change-log/**`.

---

## 2026-05-08 — `testimonials` se simplifica a carril horizontal estático de tres cards

**Decisión:** La surface `testimonials` abandona la composición orbital inicial y pasa a un carril horizontal estático de exactamente tres cards, reutilizando la misma primitive en desktop, móvil y tablet para facilitar una migración futura a ticker.

**Motivo:** Martín pidió congelar temporalmente la sección como bloque estático y dejarla en formato de lista horizontal, sin cita protagonista, satélites ni layout separado por breakpoint. El valor ahora está en la simplicidad operativa y en preparar una base fácil de evolucionar más adelante.

**Efecto:** `Testimonials` mantiene su función de prueba social, pero con una estructura mucho más directa: tres cards uniformes, ordenadas en un único track horizontal, con overflow natural en pantallas pequeñas y sin motion estructural añadida. En esta fase, la sección se apoya solo en el heading principal, elimina eyebrow, subtítulo y badges internos, y centra la cita dentro de cada card para dejar el foco visual en el propio testimonio. El heading visible adopta además una formulación más accesible para público general, `Lo que dicen nuestros clientes`, con el acento visual recayendo en `clientes`. A fecha `2026-05-08`, el carril aloja ya tres testimonios públicos confirmados: `Raúl Rodríguez / Canal3Networks`, `Javier Martinez / Golden Grama` y `Eduardo Martinez / Future Nova`. La sección queda preparada para pasar a ticker cambiando la mecánica del track, no el contenido ni la card base.

**Archivos / artefactos relevantes:** `components/home/testimonials/**`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-08 — `testimonials` pasa a stack editorial sticky en desktop

**Decisión:** La surface `testimonials` abandona el carril horizontal estático como solución principal y pasa a un stack editorial sticky de tres cards grandes en desktop, manteniendo una degradación simple a lista vertical en móvil y tablet.

**Motivo:** Tras integrar tres testimonios reales, el carril horizontal seguía comprimiendo demasiado el texto dentro de cards estrechas. Martín eligió priorizar un layout con más aire y mejor lectura antes que reducir agresivamente la tipografía.

**Efecto:** La sección gana más presencia editorial y resuelve mejor reseñas largas: cada card dispone de más ancho y altura útil, la lectura queda menos aglutinada y el scroll revela los testimonios de forma más pausada. La composición desktop toma como referencia estructural la página de servicios de Golden Grama, con paneles centrados, footprint amplio, lectura interior partida en dos zonas y una compresión progresiva de las cards previas a medida que entra la siguiente. Móvil y tablet no heredan esa complejidad y conservan una lista robusta sin sticky.

**Archivos / artefactos relevantes:** `components/home/testimonials/**`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.

---

## 2026-05-08 — `testimonials` se retira temporalmente del runtime y las reseñas pasan a archivo

**Decisión:** La home deja de renderizar cualquier sección pública de `testimonials` hasta reconstruirla desde cero. Las tres reseñas verificadas no se borran: se preservan como archivo repo-safe en `components/home/testimonials/archive.ts`.

**Motivo:** Martín decidió desmontar por completo la surface actual en lugar de seguir iterando sobre una primitive que ya no sirve como base del rediseño.

**Efecto:** La secuencia pública activa de la home vuelve a terminar en `Projects showcase` dentro del runtime actual, sin dejar una sección intermedia de prueba social a medio resolver. El contenido validado de testimonials sigue disponible y tipado para reinsertarlo después sin volver a recopilar ni reescribir las citas.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/home/testimonials/archive.ts`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/reference/domain-reference.md`, `doc/change-log/**`.

---

## 2026-05-08 — `testimonials` se reintroduce con stack sticky inspirado en Golden Grama y styling Nebula

**Decisión:** La nueva surface `testimonials` de Nebula toma de Golden Grama solo el patrón de aparición y apilado sticky de cards, equivalente al usado en `ServicesClient`. La estética, tipografía, color y chrome vuelven al sistema Nebula.

**Motivo:** Martín corrigió la dirección: el valor de Golden Grama estaba en el flujo de cards que se deslizan y se apilan, no en trasladar su paleta oro ni su tratamiento serif al sitio de Nebula.

**Efecto:** La home recupera la capa de prueba social después de `Projects showcase` con una primitive nueva: cards grandes sticky en desktop, compresión progresiva al entrar la siguiente, fondo atmosférico anclado al mismo stage y un pequeño labio superior visible entre cards para reforzar el apilado. El pinning de runtime se resuelve con una fase de scroll controlada y wrapper fijado explícitamente, no con `position: sticky` puro dentro del shell. Móvil y tablet siguen degradando a lista vertical. El bloque vuelve a sentirse parte de Nebula y no una importación estética ajena, mientras sigue consumiendo las tres reseñas verificadas preservadas en `archive.ts`.

**Archivos / artefactos relevantes:** `app/page.tsx`, `components/home/testimonials/**`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/reference/domain-reference.md`, `doc/change-log/**`.

---

## 2026-05-07 — Los `abstract-icons` de benefits no pueden repetir posición entre frases

**Decisión:** La banda de propuesta de valor fija una regla nueva para su capa ornamental: ninguna imagen abstracta puede reaparecer en la misma ancla espacial dentro de otra frase, ni en desktop ni en móvil.

**Motivo:** Martín detectó repetición visual entre statements distintos. En una sección tan corta y editorial, reciclar la misma posición debilita la sensación de progresión y hace que la ornamentación parezca reutilizada en vez de compuesta para cada mensaje.

**Efecto:** Cada frase de benefits gana una huella espacial propia. Además del ajuste manual de posiciones, el catálogo valida ahora en runtime de módulo que no existan duplicados de anclaje entre frases, lo que evita reintroducir este problema por accidente en cambios futuros.

**Archivos / artefactos relevantes:** `components/home/value-proposition-section/content.ts`, `DESIGN.md`, `doc/reference/technical-reference.md`, `doc/change-log/**`.
