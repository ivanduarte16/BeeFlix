// Tipos específicos del reproductor de video

/**
 * Eventos del reproductor
 */
export type PlayerEvent =
  | 'play'
  | 'pause'
  | 'ended'
  | 'error'
  | 'timeupdate'
  | 'loadstart'
  | 'loadeddata'
  | 'canplay'
  | 'seeking'
  | 'seeked'
  | 'volumechange'
  | 'fullscreenchange';

/**
 * Callback de eventos del reproductor
 */
export type PlayerEventCallback = (event: PlayerEventData) => void;

/**
 * Datos del evento del reproductor
 */
export interface PlayerEventData {
  type: PlayerEvent;
  currentTime?: number;
  duration?: number;
  error?: Error;
  volume?: number;
  isFullscreen?: boolean;
}

/**
 * Opciones de configuración del reproductor
 */
export interface PlayerOptions {
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: 'none' | 'metadata' | 'auto';
  poster?: string; // URL de la imagen de poster
}

/**
 * Calidades de streaming disponibles
 */
export type StreamQuality = '360p' | '480p' | '720p' | '1080p' | '4K';

/**
 * Configuración de calidad de streaming
 */
export interface QualityConfig {
  quality: StreamQuality;
  bitrate: number; // en Kbps
  resolution: {
    width: number;
    height: number;
  };
}
