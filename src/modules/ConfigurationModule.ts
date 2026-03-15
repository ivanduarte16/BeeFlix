/**
 * ConfigurationModule
 * 
 * Módulo para gestionar la configuración del servidor NAS.
 * Utiliza expo-secure-store para almacenar credenciales de forma segura.
 */

import * as SecureStore from 'expo-secure-store';
import type { ServerConfig, ValidationResult } from '../types';

// Claves para el almacenamiento seguro
const STORAGE_KEYS = {
  SERVER_URL: 'beeflix_server_url',
  SERVER_PORT: 'beeflix_server_port',
  USE_HTTPS: 'beeflix_use_https',
  USERNAME: 'beeflix_username',
  PASSWORD: 'beeflix_password',
} as const;

export class ConfigurationModule {
  /**
   * Guarda la configuración del servidor
   * @param config Configuración del servidor
   * @param password Contraseña del usuario (se almacena de forma segura)
   */
  async saveServerConfig(
    config: ServerConfig,
    password: string
  ): Promise<void> {
    try {
      // Guardar configuración básica
      await SecureStore.setItemAsync(STORAGE_KEYS.SERVER_URL, config.serverUrl);
      await SecureStore.setItemAsync(STORAGE_KEYS.SERVER_PORT, config.port.toString());
      await SecureStore.setItemAsync(STORAGE_KEYS.USE_HTTPS, config.useHttps.toString());
      await SecureStore.setItemAsync(STORAGE_KEYS.USERNAME, config.username);
      
      // Guardar contraseña de forma segura
      await SecureStore.setItemAsync(STORAGE_KEYS.PASSWORD, password);
    } catch (error) {
      throw new Error(`Error al guardar configuración: ${error}`);
    }
  }

  /**
   * Carga la configuración del servidor
   * @returns Configuración del servidor (sin contraseña)
   */
  async loadServerConfig(): Promise<ServerConfig | null> {
    try {
      const serverUrl = await SecureStore.getItemAsync(STORAGE_KEYS.SERVER_URL);
      const serverPort = await SecureStore.getItemAsync(STORAGE_KEYS.SERVER_PORT);
      const useHttps = await SecureStore.getItemAsync(STORAGE_KEYS.USE_HTTPS);
      const username = await SecureStore.getItemAsync(STORAGE_KEYS.USERNAME);

      // Si no hay configuración guardada, retornar null
      if (!serverUrl || !serverPort || !username) {
        return null;
      }

      return {
        serverUrl,
        port: parseInt(serverPort, 10),
        useHttps: useHttps === 'true',
        username,
      };
    } catch (error) {
      throw new Error(`Error al cargar configuración: ${error}`);
    }
  }


  /**
   * Obtiene la contraseña almacenada de forma segura
   * @returns Contraseña del usuario o null si no existe
   */
  async getPassword(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.PASSWORD);
    } catch (error) {
      throw new Error(`Error al obtener contraseña: ${error}`);
    }
  }

  /**
   * Valida la configuración del servidor
   * @param config Configuración a validar
   * @returns Resultado de la validación
   */
  async validateServerConfig(config: ServerConfig): Promise<ValidationResult> {
    const errors: string[] = [];

    // Validar URL del servidor
    if (!config.serverUrl || config.serverUrl.trim() === '') {
      errors.push('La URL del servidor es requerida');
    } else {
      try {
        new URL(config.serverUrl);
      } catch {
        errors.push('La URL del servidor no es válida');
      }
    }

    // Validar puerto
    if (!config.port || config.port < 1 || config.port > 65535) {
      errors.push('El puerto debe estar entre 1 y 65535');
    }

    // Validar nombre de usuario
    if (!config.username || config.username.trim() === '') {
      errors.push('El nombre de usuario es requerido');
    } else if (config.username.length < 1 || config.username.length > 50) {
      errors.push('El nombre de usuario debe tener entre 1 y 50 caracteres');
    }

    // TODO: Cuando tengamos servidor, probar conexión real
    // Por ahora solo validamos formato
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }


  /**
   * Limpia toda la configuración almacenada
   */
  async clearConfig(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.SERVER_URL);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.SERVER_PORT);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USE_HTTPS);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.USERNAME);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.PASSWORD);
    } catch (error) {
      throw new Error(`Error al limpiar configuración: ${error}`);
    }
  }

  /**
   * Verifica si existe configuración guardada
   * @returns true si existe configuración, false en caso contrario
   */
  async hasConfig(): Promise<boolean> {
    try {
      const serverUrl = await SecureStore.getItemAsync(STORAGE_KEYS.SERVER_URL);
      return serverUrl !== null;
    } catch (error) {
      return false;
    }
  }
}

// Exportar instancia singleton
export const configurationModule = new ConfigurationModule();
