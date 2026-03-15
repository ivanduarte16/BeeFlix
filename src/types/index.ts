// BeeFlix - Definiciones de tipos TypeScript

/**
 * Configuración del servidor NAS
 */
export interface ServerConfig {
  serverUrl: string;
  port: number;
  useHttps: boolean;
  username: string;
  // password se almacena en keychain/keystore seguro, no aquí
}

/**
 * Token de autenticación JWT
 */
export interface AuthToken {
  token: string;
  expiresAt: number; // timestamp en milisegundos
  userId: string;
}

/**
 * Metadatos básicos de una película
 */
export interface MovieMetadata {
  id: string;
  title: string;
  thumbnailUrl: string;
  heroImageUrl?: string; // Imagen de alta resolución para hero banner
  duration: number; // en segundos
  year?: number;
  rating?: number; // 1-5 estrellas
  genres?: string[];
}

/**
 * Detalles completos de una película
 */
export interface MovieDetails extends MovieMetadata {
  description: string;
  director?: string;
  cast?: string[];
  releaseDate?: string;
  fileSize: number; // en bytes
  resolution: string; // ej: "1080p", "720p"
  codec: string; // ej: "H.264", "H.265"
  audioTracks: AudioTrack[];
  subtitleTracks: SubtitleTrack[];
  videoUrl?: string; // URL local o de streaming
}

/**
 * Pista de audio de una película
 */
export interface AudioTrack {
  id: string;
  language: string; // ej: "es", "en", "ja"
  codec: string; // ej: "AAC", "AC3"
  channels: number; // ej: 2 (stereo), 6 (5.1)
}

/**
 * Pista de subtítulos de una película
 */
export interface SubtitleTrack {
  id: string;
  language: string; // ej: "es", "en"
  format: string; // ej: "SRT", "VTT"
}

/**
 * Estado de reproducción del video
 */
export interface PlaybackState {
  isPlaying: boolean;
  currentTime: number; // en segundos
  duration: number; // en segundos
  buffered: TimeRange[]; // rangos de tiempo buffereados
  volume: number; // 0.0 - 1.0
  isFullscreen: boolean;
  currentQuality: string; // ej: "1080p", "720p"
  availableQualities: string[];
}

/**
 * Rango de tiempo (para buffering)
 */
export interface TimeRange {
  start: number; // en segundos
  end: number; // en segundos
}

/**
 * Estado de conexión de red
 */
export interface ConnectionStatus {
  isConnected: boolean;
  connectionType: 'wifi' | 'cellular' | 'ethernet' | 'none';
  bandwidth: number; // en Mbps
}

/**
 * Log de error
 */
export interface ErrorLog {
  timestamp: string; // ISO 8601
  level: 'error' | 'warning' | 'info';
  category: 'network' | 'auth' | 'playback' | 'data' | 'ui';
  message: string;
  details?: any;
  stackTrace?: string;
  userId?: string;
  deviceInfo: DeviceInfo;
}

/**
 * Información del dispositivo
 */
export interface DeviceInfo {
  platform: string; // 'ios', 'android', 'web'
  osVersion: string;
  appVersion: string;
}

/**
 * Credenciales de usuario
 */
export interface Credentials {
  username: string;
  password: string;
}

/**
 * Resultado de validación
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

/**
 * Respuesta de la API de biblioteca de películas
 */
export interface LibraryResponse {
  movies: MovieMetadata[];
  total: number;
  page: number;
  totalPages: number;
}

/**
 * Parámetros de paginación
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: 'title' | 'year' | 'rating' | 'duration';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Configuración de reintentos
 */
export interface RetryConfig {
  maxAttempts: number;
  initialDelay: number; // en milisegundos
  maxDelay: number; // en milisegundos
  backoffMultiplier: number;
}
