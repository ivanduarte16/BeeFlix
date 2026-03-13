/**
 * NetworkModule
 * 
 * Módulo para gestionar la conectividad de red y verificar
 * el estado de la conexión al servidor NAS.
 */

import NetInfo, { NetInfoState } from '@react-native-community/netinfo';
import type { ConnectionStatus } from '../types';

export class NetworkModule {
  private listeners: Set<(status: ConnectionStatus) => void> = new Set();

  /**
   * Verifica el estado actual de la conexión
   * @returns Estado de la conexión
   */
  async checkConnection(): Promise<ConnectionStatus> {
    try {
      const state = await NetInfo.fetch();
      return this.mapNetInfoToConnectionStatus(state);
    } catch (error) {
      console.error('Error al verificar conexión:', error);
      return {
        isConnected: false,
        connectionType: 'none',
        bandwidth: 0,
      };
    }
  }

  /**
   * Monitorea cambios en el estado de la conexión
   * @param callback Función a llamar cuando cambie el estado
   * @returns Función para cancelar el monitoreo
   */
  monitorConnection(callback: (status: ConnectionStatus) => void): () => void {
    this.listeners.add(callback);

    // Suscribirse a cambios de NetInfo
    const unsubscribe = NetInfo.addEventListener((state) => {
      const status = this.mapNetInfoToConnectionStatus(state);
      this.listeners.forEach((listener) => listener(status));
    });

    // Retornar función para cancelar
    return () => {
      this.listeners.delete(callback);
      unsubscribe();
    };
  }

  /**
   * Prueba si el servidor es alcanzable
   * @param serverUrl URL del servidor a probar
   * @param timeout Timeout en milisegundos (default: 10000)
   * @returns true si el servidor es alcanzable, false en caso contrario
   */
  async testServerReachability(
    serverUrl: string,
    timeout: number = 10000
  ): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(serverUrl, {
        method: 'HEAD',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return response.ok || response.status < 500;
    } catch (error) {
      console.error('Error al probar alcance del servidor:', error);
      return false;
    }
  }


  /**
   * Mide el ancho de banda aproximado (básico)
   * @returns Ancho de banda estimado en Mbps
   */
  async measureBandwidth(): Promise<number> {
    try {
      const state = await NetInfo.fetch();
      
      // Estimación básica basada en el tipo de conexión
      // En una implementación real, se haría una prueba de descarga
      if (!state.isConnected) {
        return 0;
      }

      switch (state.type) {
        case 'wifi':
          return state.details?.linkSpeed || 50; // Mbps estimado para WiFi
        case 'cellular':
          // Estimación basada en el tipo de celular
          const cellularGeneration = (state.details as any)?.cellularGeneration;
          switch (cellularGeneration) {
            case '5g':
              return 100;
            case '4g':
              return 20;
            case '3g':
              return 2;
            default:
              return 1;
          }
        case 'ethernet':
          return 100; // Mbps estimado para Ethernet
        default:
          return 10; // Valor por defecto
      }
    } catch (error) {
      console.error('Error al medir ancho de banda:', error);
      return 0;
    }
  }

  /**
   * Mapea el estado de NetInfo a nuestro tipo ConnectionStatus
   * @param state Estado de NetInfo
   * @returns Estado de conexión
   */
  private mapNetInfoToConnectionStatus(state: NetInfoState): ConnectionStatus {
    const connectionType = this.mapConnectionType(state.type);
    
    return {
      isConnected: state.isConnected ?? false,
      connectionType,
      bandwidth: 0, // Se calculará con measureBandwidth si es necesario
    };
  }

  /**
   * Mapea el tipo de conexión de NetInfo a nuestro tipo
   * @param type Tipo de conexión de NetInfo
   * @returns Tipo de conexión
   */
  private mapConnectionType(
    type: string
  ): 'wifi' | 'cellular' | 'ethernet' | 'none' {
    switch (type) {
      case 'wifi':
        return 'wifi';
      case 'cellular':
        return 'cellular';
      case 'ethernet':
        return 'ethernet';
      default:
        return 'none';
    }
  }
}

// Exportar instancia singleton
export const networkModule = new NetworkModule();
