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

### Probar desde otro dispositivo que no está en tu misma red

Si quien va a probar la app (en iPad, iPhone o Android con Expo Go) no está en la misma wifi que quien arranca el servidor, usa modo túnel en vez del paso 3 de arriba:

```bash
npx expo start --tunnel
```

Comparte el enlace/QR que aparece en la terminal — funciona a través de internet, sin necesidad de estar en la misma red. Hay que dejar el proceso corriendo mientras dure la sesión de pruebas; no es un enlace permanente.

## Estructura del proyecto

- `src/app/` — rutas de la app (Expo Router, file-based routing). Cada archivo es una pantalla.
  - `(tabs)/` — las 7 pestañas principales: los 6 módulos núcleo + "Más".
  - `more/` — pantallas de los 6 módulos adicionales, accesibles desde la pestaña "Más" (navegación en pila, con botón atrás).
- `src/components/` — componentes reutilizables: los base de HAS-6 (`Card`, `Button`, `Avatar`, `Badge`, `EmptyState`, `LoadingSpinner`, `ScreenHeader`, `ListItem`, `MapBackground`) más `ThemedText`, `ThemedView`, `PlaceholderScreen`.
- `src/constants/theme.ts` — colores (incluye variantes semánticas `primary`/`success`/`warning`/`danger`), tipografías, espaciados y radios de borde compartidos.
- `src/types/` y `src/mocks/` — modelos de datos y datos de ejemplo compartidos entre módulos, uno por entidad (`Business`, `Event`, `Incident`, etc.) — ver HAS-6.
- `src/utils/` — utilidades compartidas (formateo de fechas/horas, iniciales de un `Avatar`).
- `src/hooks/use-simulated-loading.ts` — estado de carga simulado para pantallas sin backend real.

Cada módulo del listado de "Más" y cada pestaña núcleo se implementa en su propia issue de Linear, consumiendo el tema/componentes/mocks de HAS-6 en vez de reinventarlos. El que todavía no tiene PR mergeado sigue siendo una pantalla placeholder ("Módulo en construcción").

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

Ya existe un Access Token de la cuenta de equipo (`htbcadmin` en expo.dev, ver HAS-19), pero **EAS Update no sirve para probar en Expo Go** — solo funciona sobre una build de desarrollo/producción instalada en el dispositivo (compilada con EAS Build), y una build instalable en iPhone/iPad exige cuenta de Apple Developer Program (99 $/año; Android no necesita cuenta de pago). Mientras no se decida pagarla, la forma de probar en Expo Go sin estar en la misma red es el modo túnel de arriba (`npx expo start --tunnel`).
