# Documentación del Proyecto

## Introducción
*   **Descripción general del proyecto:** Este proyecto es una aplicación web construida con Next.js, TypeScript, y Tailwind CSS. Proporciona una interfaz de usuario moderna y responsiva.
*   **Tecnologías utilizadas:**
    *   Next.js: Framework de React para construir aplicaciones web.
    *   TypeScript: Lenguaje de programación que añade tipado estático a JavaScript (65%).
    *   Tailwind CSS: Framework de CSS para diseñar interfaces de usuario rápidamente.
    *   Radix UI: Librería de componentes de interfaz de usuario sin estilo.
*   **Estructura del proyecto:** El proyecto está organizado en las siguientes carpetas principales: `app/`, `components/`, `hooks/`, `lib/`, `public/`, y `styles/`.

## Estructura de la Aplicación (`app/`)
*   `layout.tsx`: Diseño general de la aplicación
    *   Este archivo define el diseño general de la aplicación.  Contiene la estructura HTML básica, incluyendo el `<html>` y `<body>` tags.  También define la fuente utilizada en la aplicación y envuelve la aplicación con el `ThemeProvider` para habilitar la funcionalidad de temas.
*   `page.tsx`: Página principal
    *   Este archivo define la página principal de la aplicación.  Importa los componentes `LazyProjectGallery` y `LazySkillsConstellation` usando carga lazy para mejorar el rendimiento.  También contiene la lógica para mostrar los certificados y la información del portafolio.
*   `manifest.ts`: Archivo de manifiesto
    *   Este archivo define el manifiesto de la aplicación, que proporciona metadatos sobre la aplicación, como su nombre, descripción, e iconos.  Esto es utilizado por los navegadores para instalar la aplicación como una aplicación web progresiva (PWA).

## Componentes (`components/`)
*   `animated-section.tsx`: Componente de sección animada
*   `performance-monitor.tsx`: Componente de monitor de rendimiento
*   `project-gallery.tsx`: Componente de galería de proyectos
*   `skills-constellation.tsx`: Componente de constelación de habilidades
*   `theme-provider.tsx`: Componente proveedor de tema
*   `animated-section.tsx`: Componente de sección animada
    *   Este componente crea una sección animada que se revela al hacer scroll. Utiliza la librería `framer-motion` para las animaciones.
*   `performance-monitor.tsx`: Componente de monitor de rendimiento
    *   Este componente muestra información sobre el rendimiento de la aplicación, como el tiempo de carga y el uso de memoria.
*   `project-gallery.tsx`: Componente de galería de proyectos
    *   Este componente muestra una galería de proyectos.
*   `skills-constellation.tsx`: Componente de constelación de habilidades
    *   Este componente muestra una visualización de las habilidades del usuario.
*   `theme-provider.tsx`: Componente proveedor de tema
    *   Este componente proporciona el tema de la aplicación a todos los componentes hijos. Utiliza la librería `next-themes` para gestionar los temas.
*   `ui/`: Componentes de interfaz de usuario (Radix UI)
    *   Esta carpeta contiene componentes de interfaz de usuario reutilizables construidos con Radix UI.

## Hooks (`hooks/`)
*   `use-analytics.ts`: Hook de analíticas
*   `use-intersection-observer.ts`: Hook de observador de intersección
*   `use-mobile.tsx`: Hook de detección de móvil
*   `use-analytics.ts`: Hook de analíticas
    *   Este hook proporciona la funcionalidad de analíticas para la aplicación.
*   `use-intersection-observer.ts`: Hook de observador de intersección
    *   Este hook utiliza el Intersection Observer API para detectar cuando un elemento es visible en la pantalla.
*   `use-mobile.tsx`: Hook de detección de móvil
    *   Este hook detecta si el usuario está utilizando un dispositivo móvil.
*   `use-toast.ts`: Hook de notificaciones toast
    *   Este hook proporciona la funcionalidad de notificaciones toast para la aplicación.

## Librerías (`lib/`)
*   `utils.ts`: Funciones de utilidad
    *   Este archivo contiene funciones de utilidad reutilizables en toda la aplicación.

## Configuración
*   `next.config.mjs`: Configuración de Next.js
*   `next.config.mjs`: Configuración de Next.js
    *   Este archivo contiene la configuración de Next.js, como las variables de entorno y las opciones de compilación.
*   `tailwind.config.ts`: Configuración de Tailwind CSS
    *   Este archivo contiene la configuración de Tailwind CSS, como los colores, las fuentes y los breakpoints.