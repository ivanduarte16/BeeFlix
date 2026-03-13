# Assets de BeeFlix

Esta carpeta contiene los recursos visuales de la aplicación.

## Iconos Requeridos

### icon.png (1024x1024)
- Icono principal de la aplicación
- Usado para iOS y como base para otros iconos
- Debe tener fondo sólido
- **Diseño sugerido:** Abeja estilizada con colores amarillo/naranja sobre fondo negro (#141414)

### adaptive-icon.png (1024x1024)
- Icono adaptativo para Android
- La parte central (66%) debe contener el diseño principal
- El resto puede ser recortado por diferentes launchers
- **Diseño sugerido:** Abeja en el centro con margen de seguridad

### splash.png (1284x2778 o similar)
- Pantalla de carga que se muestra al iniciar la app
- Fondo negro (#141414)
- **Diseño sugerido:** Logo de BeeFlix centrado con la abeja

### favicon.png (48x48)
- Icono para la versión web
- Versión simplificada del icono principal

## Herramientas Recomendadas

- **Figma** - Para diseñar los iconos
- **Canva** - Alternativa más simple
- **Adobe Illustrator** - Para diseño profesional
- **Icon Kitchen** (https://icon.kitchen/) - Generador de iconos para apps

## Colores de BeeFlix

- Fondo: #141414 (negro oscuro)
- Primario: #FFA500 (naranja)
- Secundario: #FFB84D (naranja claro)
- Acento: #FF8C00 (naranja oscuro)

## Generación Automática

Una vez que tengas `icon.png`, puedes usar:
```bash
npx expo-optimize
```

Para generar automáticamente todos los tamaños necesarios.
