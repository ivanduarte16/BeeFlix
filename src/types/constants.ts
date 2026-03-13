// Constantes de la aplicación

/**
 * Configuraciones de reintento por tipo de operación
 */
export const RETRY_CONFIGS = {
  authentication: {
    maxAttempts: 3,
    initialDelay: 1000,
    maxDelay: 5000,
    backoffMultiplier: 2,
  },
  contentFetch: {
    maxAttempts: 3,
    initialDelay: 500,
    maxDelay: 3000,
    backoffMultiplier: 1.5,
  },
  streaming: {
    maxAttempts: 5,
    initialDelay: 2000,
    maxDelay: 10000,
    backoffMultiplier: 2,
  },
  thumbnails: {
    maxAttempts: 2,
    initialDelay: 1000,
    maxDelay: 2000,
    backoffMultiplier: 1,
  },
} as const;

/**
 * Configuraciones de calidad de streaming
 */
export const STREAM_QUALITIES = {
  '1080p': { bitrate: 5000, width: 1920, height: 1080 },
  '720p': { bitrate: 2500, width: 1280, height: 720 },
  '480p': { bitrate: 1000, width: 854, height: 480 },
  '360p': { bitrate: 500, width: 640, height: 360 },
} as const;

/**
 * Límites de cache
 */
export const CACHE_LIMITS = {
  thumbnails: 500 * 1024 * 1024, // 500MB
  metadata: 100 * 1024 * 1024, // 100MB
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días en milisegundos
} as const;

/**
 * Timeouts de red
 */
export const NETWORK_TIMEOUTS = {
  auth: 30000, // 30 segundos
  api: 10000, // 10 segundos
  streaming: 60000, // 60 segundos
} as const;
