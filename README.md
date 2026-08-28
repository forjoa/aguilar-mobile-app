# Aguilar de la Frontera — App Pueblo Digital (maqueta)

Maqueta/prototipo de la app de digitalización del pueblo. Fase actual: sin backend, todo con datos mock, para la presentación/exposición inicial. Ver `PROPUESTA_SERVICIOS_APP.md` (carpeta padre) y el proyecto `aguilar-mobile-app` en Linear para el alcance y el reparto de trabajo completos.

Construida con [Expo](https://expo.dev) (SDK 57) + [Expo Router](https://docs.expo.dev/router/introduction) + TypeScript, usando **Expo Go** para poder probar en iPhone/Android sin necesidad de un Mac.

## Arrancar el proyecto

1. Instala [Expo Go](https://expo.dev/go) en tu móvil (App Store / Play Store).
2. Instala dependencias:

   ```bash
   npm install
   ```

3. Arranca el servidor de desarrollo:

   ```bash
   npx expo start
   ```

4. Escanea el código QR que aparece en la terminal con la app **Expo Go** (Android: escáner integrado en la propia app; iOS: cámara del sistema). La app se abre en tu móvil.

   También puedes pulsar `w` en la terminal para abrir la versión web (útil para revisar pantallas rápido sin un dispositivo a mano).

## Estructura del proyecto

- `src/app/` — rutas de la app (Expo Router, file-based routing). Cada archivo es una pantalla.
  - `(tabs)/` — las 7 pestañas principales: los 6 módulos núcleo + "Más".
  - `mas/` — pantallas de los 6 módulos adicionales, accesibles desde la pestaña "Más" (navegación en pila, con botón atrás).
- `src/components/` — componentes reutilizables: los base de HAS-6 (`Card`, `Button`, `Avatar`, `Badge`, `EmptyState`, `LoadingSpinner`, `ScreenHeader`, `ListItem`, `MapBackground`) más `ThemedText`, `ThemedView`, `PlaceholderScreen`.
- `src/constants/theme.ts` — colores (incluye variantes semánticas `primary`/`success`/`warning`/`danger`), tipografías, espaciados y radios de borde compartidos.
- `src/types/` y `src/mocks/` — modelos de datos y datos de ejemplo compartidos entre módulos, uno por entidad (`Comercio`, `Evento`, `Incidencia`, etc.) — ver HAS-6.
- `src/utils/` — utilidades compartidas (formateo de fechas/horas, iniciales de un `Avatar`).
- `src/hooks/use-simulated-loading.ts` — estado de carga simulado para pantallas sin backend real.

Cada módulo del listado de "Más" y cada pestaña núcleo son ahora mismo una pantalla placeholder ("Módulo en construcción"): el desarrollo de cada uno vive en su propia issue de Linear y consume el tema/componentes/mocks de HAS-6 en vez de reinventarlos.

## Sistema de diseño

`npx expo start --web` y navega a `/design-system` para ver un catálogo visual de los tokens del tema y todos los componentes base — no está enlazado desde ninguna tab (no es una pantalla de producto), es documentación viva para el equipo.

## Calidad de código

```bash
npm run lint      # ESLint
npm run format    # Prettier (aplica formato)
npx tsc --noEmit  # TypeScript
npm run test      # Jest + React Native Testing Library
```

## Publicar en Expo (pendiente)

Para publicar el proyecto en una cuenta de equipo de Expo y compartir un enlace/QR fijo (en vez de depender de tener `npx expo start` corriendo), hace falta iniciar sesión con `npx expo login` — no incluido en este setup porque requiere autenticación interactiva de una persona del equipo.
