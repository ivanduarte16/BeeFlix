# Plan de Implementación: BeeFlix

## Descripción General

BeeFlix es una aplicación de streaming multi-plataforma para películas animadas almacenadas en un servidor NAS. La implementación sigue una arquitectura cliente-servidor con React Native para móvil/tablet, React para web, y opcionalmente Electron para desktop. El servidor recomendado es Jellyfin, aunque se puede usar un servidor Node.js personalizado.

Este plan implementa las funcionalidades del MVP (Fase 1) y mejoras de UX (Fase 2), dejando optimizaciones avanzadas para iteraciones futuras.

## Prototipo Visual Implementado

**Estado:** ✅ Completado

Se ha implementado un prototipo web funcional (HTML/CSS/JavaScript) que demuestra la interfaz visual completa de BeeFlix. Este prototipo sirve como referencia de diseño para la implementación en React Native.

**Archivos del Prototipo:**
- `index.html` - Estructura HTML con header, hero banner y cuadrícula de películas
- `styles.css` - Estilos completos con tema oscuro, acentos amarillo/naranja, animaciones, reproductor de video
- `app.js` - Lógica JavaScript con rotación de hero banner, datos mock, interactividad, reproductor funcional
- `Imgenes/Imagenes_Hero/` - Imágenes de alta resolución para el banner hero
- `Imgenes/Imagenes_Peliculas/` - Miniaturas específicas para las tarjetas de películas
- `Peliculas/` - Carpeta con archivos de video para reproducción

**Características Implementadas:**
1. ✅ Header fijo con logo BeeFlix, navegación y búsqueda en esquina superior derecha
2. ✅ Banner hero rotativo (cada 5 segundos) con:
   - Imagen de fondo de película (imágenes hero de alta resolución)
   - Degradado oscuro para legibilidad del texto
   - Título, año, duración, puntuación (estrellas)
   - Descripción de la película
   - Botones "Reproducir" y "Más información"
   - Animación de fundido (fade-in) al cambiar películas
   - Text-shadow fuerte para legibilidad sobre fondos claros
   - Reproducción funcional de películas con videoUrl
3. ✅ Cuadrícula de películas con:
   - Miniaturas horizontales (16:9) - imágenes específicas de películas
   - Información oculta por defecto
   - Hover: escala 1.3, muestra título, año, duración, estrellas, botones
   - Degradado suave (rgba 0.75) al hacer hover
   - Espaciado vertical entre filas (2.5rem)
   - Botón play funcional que reproduce la película
4. ✅ Reproductor de video integrado:
   - Overlay en pantalla completa con fondo oscuro
   - Controles nativos del navegador
   - Botón de cerrar (✕) y cierre con tecla ESC
   - Reproducción automática al abrir
   - Diseño responsivo
5. ✅ Sistema de puntuación de 1-5 estrellas (color naranja)
6. ✅ Márgenes estilo Netflix (4% lateral, 3% en móvil)
7. ✅ Tema oscuro con acentos amarillo/naranja (temática de abeja)
8. ✅ Animaciones suaves (300ms) y transiciones fluidas
9. ✅ Diseño responsivo para diferentes tamaños de pantalla
10. ✅ Estructura de imágenes organizada:
    - `Imgenes/Imagenes_Hero/` - Imágenes de alta resolución para el banner hero
    - `Imgenes/Imagenes_Peliculas/` - Miniaturas para las tarjetas de películas

**Requisitos Validados por el Prototipo:**
- Requisitos 5.1, 5.2 (Diseño visual y tema)
- Requisitos 5.3, 5.4, 5.5, 5.6 (Animaciones)
- Requisito 11 (Sistema de puntuación)
- Requisito 12 (Banner hero rotativo)
- Requisito 13 (Miniaturas horizontales con hover)
- Requisito 14 (Márgenes estilo Netflix)
- Requisito 15 (Búsqueda en header)

## Tareas

- [x] 1. Configurar estructura del proyecto y dependencias
  - Inicializar proyecto React Native con Expo
  - Configurar TypeScript y ESLint
  - Instalar dependencias principales (react-navigation, axios, zustand, expo-av, expo-secure-store)
  - Configurar fast-check para property-based testing
  - Crear estructura de carpetas (src/modules, src/components, src/services, src/types)
  - _Requisitos: Todos los requisitos funcionales_

- [x] 2. Implementar tipos y modelos de datos
  - [x] 2.1 Crear interfaces TypeScript para modelos de datos
    - Definir ServerConfig, AuthToken, MovieMetadata, MovieDetails, PlaybackState, ConnectionStatus
    - Crear tipos para AudioTrack, SubtitleTrack, ErrorLog
    - _Requisitos: 1.1, 2.1, 3.1, 10.2_
  
  - [ ]* 2.2 Escribir property test para persistencia de configuración
    - **Propiedad 15: Persistencia de configuración round-trip**
    - **Valida: Requisitos 10.2, 10.3, 10.5**

- [x] 3. Implementar módulo de configuración
  - [x] 3.1 Crear ConfigurationModule con almacenamiento seguro
    - Implementar saveServerConfig usando expo-secure-store
    - Implementar loadServerConfig
    - Implementar validateServerConfig con prueba de conexión
    - Implementar clearConfig
    - _Requisitos: 10.1, 10.2, 10.3, 10.4, 10.5_
  
  - [ ]* 3.2 Escribir unit tests para ConfigurationModule
    - Test de validación de formato de URL
    - Test de validación de rango de puerto (1-65535)
    - Test de manejo de configuración inexistente
    - _Requisitos: 10.1, 10.2, 10.4_

- [x] 4. Implementar módulo de red y conectividad
  - [x] 4.1 Crear NetworkModule
    - Implementar checkConnection para verificar estado de red
    - Implementar monitorConnection con listeners
    - Implementar testServerReachability
    - Implementar measureBandwidth (básico)
    - _Requisitos: 1.2, 3.5, 9.5_
  
  - [ ]* 4.2 Escribir unit tests para NetworkModule
    - Test de servidor no alcanzable
    - Test de timeout de conexión
    - Test de cambio de estado de red
    - _Requisitos: 1.2, 8.2_

- [ ] 5. Implementar módulo de autenticación
  - [ ] 5.1 Crear AuthenticationModule
    - Implementar login con llamada POST a /api/auth/login
    - Implementar logout
    - Implementar validateToken
    - Implementar refreshToken
    - Implementar storeCredentials usando expo-secure-store
    - Configurar interceptores de axios para tokens
    - _Requisitos: 1.1, 1.3, 1.4_
  
  - [ ]* 5.2 Escribir property test para autenticación
    - **Propiedad 1: Autenticación con credenciales válidas**
    - **Valida: Requisitos 1.1, 1.3**
  
  - [ ]* 5.3 Escribir unit tests para AuthenticationModule
    - Test de autenticación fallida (credenciales inválidas)
    - Test de token expirado
    - Test de renovación de token
    - Test de almacenamiento seguro de credenciales
    - _Requisitos: 1.4, 8.4_

- [ ] 6. Checkpoint - Verificar autenticación y configuración
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas.

- [ ] 7. Implementar módulo de descubrimiento de contenido
  - [ ] 7.1 Crear ContentDiscoveryModule
    - Implementar fetchLibrary con GET /api/library/movies
    - Implementar fetchMovieDetails con GET /api/library/movies/:id
    - Implementar searchMovies (opcional para MVP)
    - Implementar cacheMetadata usando AsyncStorage
    - Implementar loadCachedMetadata
    - _Requisitos: 2.1, 2.2, 2.5_
  
  - [ ]* 7.2 Escribir property test para recuperación de metadatos
    - **Propiedad 2: Recuperación y renderizado completo de metadatos**
    - **Valida: Requisitos 2.1, 2.2, 7.2, 7.5**
  
  - [ ]* 7.3 Escribir unit tests para ContentDiscoveryModule
    - Test de respuesta JSON malformada
    - Test de cache de metadatos
    - Test de carga desde cache cuando no hay red
    - _Requisitos: 2.1, 8.4_

- [ ] 8. Implementar lógica de organización de contenido
  - [ ] 8.1 Crear utilidades de ordenamiento y paginación
    - Implementar sortMoviesAlphabetically con normalización de títulos
    - Implementar función de paginación/scroll infinito
    - _Requisitos: 7.1, 7.3, 7.4_
  
  - [ ]* 8.2 Escribir property test para ordenamiento alfabético
    - **Propiedad 11: Ordenamiento alfabético de biblioteca**
    - **Valida: Requisitos 7.4**
  
  - [ ]* 8.3 Escribir unit tests para organización
    - Test de paginación con más de 20 películas
    - Test de normalización de títulos (ignorar artículos)
    - _Requisitos: 7.3, 7.4_

- [ ] 9. Implementar módulo de reproducción de video
  - [ ] 9.1 Crear VideoPlayerModule usando expo-av
    - Implementar loadVideo con URL de streaming
    - Implementar controles básicos: play, pause, seek
    - Implementar setVolume
    - Implementar enterFullscreen y exitFullscreen
    - Implementar getPlaybackState
    - Implementar addEventListener para eventos del reproductor
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.6, 6.1, 6.4_
  
  - [ ]* 9.2 Escribir property tests para reproductor
    - **Propiedad 4: Inicio de streaming al seleccionar película**
    - **Valida: Requisitos 3.1**
    - **Propiedad 5: Pausa y reanudación preserva estado**
    - **Valida: Requisitos 3.3**
    - **Propiedad 6: Seek a cualquier posición válida**
    - **Valida: Requisitos 3.4, 6.5**
    - **Propiedad 7: Modo pantalla completa**
    - **Valida: Requisitos 3.6**
  
  - [ ]* 9.3 Escribir unit tests para VideoPlayerModule
    - Test de inicio de reproducción dentro de 5 segundos
    - Test de pérdida de conexión durante reproducción
    - Test de archivo de video corrupto/no soportado
    - Test de buffering y reconexión
    - _Requisitos: 3.2, 3.5, 8.1, 8.2, 8.3_

- [ ] 10. Implementar servicio de streaming
  - [ ] 10.1 Crear StreamService para gestión de HLS
    - Implementar getStreamUrl para obtener master.m3u8
    - Implementar lógica de selección de calidad adaptativa
    - Implementar monitoreo de buffer
    - Implementar ajuste de calidad según ancho de banda
    - _Requisitos: 3.1, 9.4, 9.5_
  
  - [ ]* 10.2 Escribir property tests para streaming adaptativo
    - **Propiedad 13: Buffer mínimo adelantado**
    - **Valida: Requisitos 9.4**
    - **Propiedad 14: Ajuste adaptativo de calidad**
    - **Valida: Requisitos 9.5**

- [ ] 11. Checkpoint - Verificar reproducción de video
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas.

- [ ] 12. Implementar sistema de manejo de errores
  - [ ] 12.1 Crear ErrorHandler y sistema de logging
    - Implementar ErrorHandler con categorización de errores
    - Implementar logger con estructura ErrorLog
    - Implementar estrategia de reintentos con backoff exponencial
    - Crear mensajes de error amigables para cada tipo
    - _Requisitos: 1.2, 1.4, 8.1, 8.2, 8.3, 8.4, 8.5_
  
  - [ ]* 12.2 Escribir property test para logging de errores
    - **Propiedad 12: Registro de errores**
    - **Valida: Requisitos 8.5**
  
  - [ ]* 12.3 Escribir unit tests para ErrorHandler
    - Test de reintentos con backoff exponencial
    - Test de mensajes de error específicos
    - Test de logging con estructura correcta
    - _Requisitos: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ] 13. Implementar gestión de estado global
  - [ ] 13.1 Crear stores de Zustand
    - Crear authStore para estado de autenticación
    - Crear contentStore para biblioteca de películas
    - Crear playerStore para estado del reproductor
    - Crear configStore para configuración de la app
    - Integrar stores con módulos correspondientes
    - _Requisitos: 1.5, 2.1, 3.1, 10.5_

- [ ] 14. Implementar navegación de la aplicación
  - [ ] 14.1 Configurar React Navigation
    - Crear stack navigator principal
    - Definir rutas: Login, Config, Library, MovieDetails, Player
    - Implementar navegación condicional (autenticado vs no autenticado)
    - Configurar animaciones de transición
    - _Requisitos: 2.5, 5.3, 9.2_
  
  - [ ]* 14.2 Escribir property test para navegación a detalles
    - **Propiedad 3: Navegación a detalles de película**
    - **Valida: Requisitos 2.5**

- [ ] 15. Implementar pantalla de configuración
  - [ ] 15.1 Crear ConfigScreen
    - Crear formulario para dirección de servidor, puerto, credenciales
    - Implementar validación de campos
    - Implementar botón de guardar con validación de conexión
    - Mostrar mensajes de error/éxito
    - _Requisitos: 10.1, 10.2, 10.3, 10.4_
  
  - [ ]* 15.2 Escribir property test para validación de configuración
    - **Propiedad 16: Validación al guardar configuración**
    - **Valida: Requisitos 10.4**

- [ ] 16. Implementar pantalla de autenticación
  - [ ] 16.1 Crear LoginScreen
    - Crear formulario de login con campos de usuario y contraseña
    - Implementar lógica de autenticación
    - Mostrar mensajes de error de autenticación
    - Navegar a biblioteca tras login exitoso
    - Incluir botón para ir a configuración
    - _Requisitos: 1.1, 1.3, 1.4_

- [ ] 17. Implementar pantalla de biblioteca de contenido
  - [ ] 17.1 Crear LibraryScreen con cuadrícula de películas
    - Implementar FlatList virtualizada para rendimiento
    - Crear componente MovieCard con miniatura y título
    - Implementar lazy loading de miniaturas
    - Implementar ordenamiento alfabético por defecto
    - Mostrar duración en cada tarjeta
    - Implementar navegación a detalles al seleccionar película
    - _Requisitos: 2.1, 2.2, 2.3, 2.4, 2.5, 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [ ]* 17.2 Escribir unit tests para LibraryScreen
    - Test de carga de miniaturas dentro de 2 segundos
    - Test de virtualización con biblioteca grande
    - Test de navegación al seleccionar película
    - _Requisitos: 2.3, 2.4, 2.5, 7.3_

- [ ] 18. Implementar pantalla de detalles de película
  - [ ] 18.1 Crear MovieDetailsScreen
    - Mostrar información completa de la película
    - Mostrar miniatura grande, título, descripción, duración
    - Implementar botón de reproducción
    - Navegar a reproductor al presionar play
    - _Requisitos: 2.5_

- [ ] 19. Implementar pantalla de reproducción
  - [ ] 19.1 Crear PlayerScreen con controles
    - Integrar VideoPlayerModule
    - Crear controles de reproducción: play/pause, seek, volumen
    - Implementar barra de progreso interactiva
    - Mostrar tiempo transcurrido y duración total
    - Implementar auto-ocultamiento de controles tras 3 segundos
    - Implementar mostrar controles al tocar pantalla
    - Implementar botón de pantalla completa
    - _Requisitos: 3.1, 3.2, 3.3, 3.4, 3.6, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_
  
  - [ ]* 19.2 Escribir property tests para controles del reproductor
    - **Propiedad 9: Información de reproducción completa**
    - **Valida: Requisitos 6.2, 6.3**
    - **Propiedad 10: Mostrar controles en interacción**
    - **Valida: Requisitos 6.7**
  
  - [ ]* 19.3 Escribir unit tests para PlayerScreen
    - Test de ocultamiento de controles tras 3 segundos
    - Test de sincronización entre barra de progreso y tiempo
    - Test de controles de volumen
    - _Requisitos: 6.1, 6.2, 6.3, 6.4, 6.6, 6.7_

- [ ] 20. Checkpoint - Verificar flujo completo de la aplicación
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas.

- [ ] 21. Implementar sistema de temas y estilos
  - [ ] 21.1 Crear theme system con tema oscuro y acentos morados
    - Definir paleta de colores (oscuros + morados)
    - Crear constantes de estilos reutilizables
    - Implementar ThemeProvider si es necesario
    - Aplicar tema a todos los componentes
    - _Requisitos: 5.1, 5.2_

- [ ] 22. Implementar animaciones y transiciones
  - [ ] 22.1 Agregar animaciones con react-native-reanimated
    - Implementar animaciones de transición entre pantallas (≤300ms)
    - Implementar animaciones de hover/selección en tarjetas de películas
    - Implementar animaciones de fade-in para miniaturas
    - Optimizar para mantener 60fps
    - _Requisitos: 5.3, 5.4, 5.5, 5.6_
  
  - [ ]* 22.2 Escribir unit tests para animaciones
    - Test de duración de animaciones (≤300ms)
    - Test de animaciones en tarjetas de películas
    - _Requisitos: 5.4, 5.5_

- [ ] 23. Implementar diseño responsivo multi-dispositivo
  - [ ] 23.1 Crear layouts adaptativos
    - Implementar detección de tamaño de pantalla
    - Crear layouts responsivos para móvil, tablet, y web
    - Ajustar número de columnas en cuadrícula según tamaño
    - Implementar manejo de orientación (portrait/landscape)
    - _Requisitos: 4.1, 4.2, 4.3, 4.5_
  
  - [ ]* 23.2 Escribir property test para adaptación responsiva
    - **Propiedad 8: Adaptación responsiva a tamaños de pantalla**
    - **Valida: Requisitos 4.5**

- [ ] 24. Implementar optimizaciones de rendimiento
  - [ ] 24.1 Optimizar carga y caching
    - Implementar cache de miniaturas con política LRU
    - Implementar lazy loading de imágenes
    - Implementar precarga de primeros segundos de video
    - Optimizar tamaño de cache (500MB miniaturas, 100MB metadatos)
    - _Requisitos: 2.4, 9.1, 9.2, 9.3_
  
  - [ ]* 24.2 Escribir unit tests para optimizaciones
    - Test de tiempo de lanzamiento de app (≤3 segundos)
    - Test de respuesta a interacciones (≤200ms)
    - Test de política LRU de cache
    - _Requisitos: 9.1, 9.2, 9.3_

- [ ] 25. Integración final y pruebas end-to-end
  - [ ] 25.1 Conectar todos los componentes
    - Verificar flujo completo: Config → Login → Library → Details → Player
    - Verificar manejo de errores en cada pantalla
    - Verificar persistencia de configuración y tokens
    - Verificar funcionamiento offline con cache
    - _Requisitos: Todos_
  
  - [ ]* 25.2 Escribir tests de integración
    - Test de flujo completo de autenticación a reproducción
    - Test de manejo de token expirado durante navegación
    - Test de reconexión tras pérdida de red
    - _Requisitos: 1.5, 3.5, 8.2_

- [ ] 26. Checkpoint final - Verificar aplicación completa
  - Asegurar que todos los tests pasen, preguntar al usuario si surgen dudas.

## Notas

- Las tareas marcadas con `*` son opcionales y pueden omitirse para un MVP más rápido
- Cada tarea referencia requisitos específicos para trazabilidad
- Los checkpoints aseguran validación incremental
- Los property tests validan propiedades universales de corrección
- Los unit tests validan ejemplos específicos y casos edge
- La implementación usa TypeScript para type safety
- Se recomienda usar Jellyfin como servidor NAS para reducir desarrollo backend
- Para desarrollo inicial, se puede usar un servidor mock o Jellyfin de prueba

## Configuración del Servidor (Referencia)

Si se usa Jellyfin:
1. Instalar Jellyfin en el servidor NAS
2. Configurar biblioteca de películas animadas
3. Habilitar API y generar API key
4. Configurar transcoding si es necesario

Si se usa servidor personalizado:
1. Implementar endpoints de API según diseño
2. Configurar FFmpeg para transcoding HLS
3. Implementar autenticación JWT
4. Configurar base de datos SQLite para metadatos

## Próximos Pasos Tras Completar Tareas

Una vez completadas estas tareas, la aplicación BeeFlix estará lista para:
- Pruebas de usuario en dispositivos reales
- Despliegue en tiendas de aplicaciones (App Store, Google Play)
- Iteraciones de mejora basadas en feedback
- Implementación de características avanzadas (Fase 3 y 4 del diseño)
