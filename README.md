# BeeFlix - Streaming App

Aplicación de streaming personalizada para películas animadas con tema oscuro y acentos amarillo/naranja (temática de abeja).

## Estructura del Proyecto

```
beeflix-app/
├── src/
│   ├── modules/       # Módulos de lógica de negocio
│   ├── components/    # Componentes reutilizables de UI
│   ├── screens/       # Pantallas de la aplicación
│   ├── services/      # Servicios (API, storage, etc.)
│   ├── stores/        # Gestión de estado (Zustand)
│   └── types/         # Definiciones de tipos TypeScript
├── assets/            # Imágenes, fuentes, etc.
├── App.tsx            # Punto de entrada de la aplicación
└── package.json       # Dependencias y scripts
```

## Instalación

```bash
cd beeflix-app
npm install
```

## Ejecutar la Aplicación

```bash
# Iniciar el servidor de desarrollo
npm start

# Ejecutar en Android
npm run android

# Ejecutar en iOS
npm run ios

# Ejecutar en Web
npm run web
```

## Testing

```bash
# Ejecutar tests
npm test
```

## Tecnologías

- React Native + Expo
- TypeScript
- React Navigation
- Zustand (gestión de estado)
- Expo AV (reproductor de video)
- Axios (cliente HTTP)
- Fast-check (property-based testing)
