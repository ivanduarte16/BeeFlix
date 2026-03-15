/**
 * Tests para ConfigurationModule
 */

import { ConfigurationModule } from '../ConfigurationModule';
import type { ServerConfig } from '../../types';

// Mock de expo-secure-store
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

import * as SecureStore from 'expo-secure-store';

describe('ConfigurationModule', () => {
  let configModule: ConfigurationModule;

  beforeEach(() => {
    configModule = new ConfigurationModule();
    jest.clearAllMocks();
  });

  describe('validateServerConfig', () => {
    it('debe validar URL correcta', async () => {
      const config: ServerConfig = {
        serverUrl: 'http://192.168.1.100',
        port: 8096,
        useHttps: false,
        username: 'testuser',
      };

      const result = await configModule.validateServerConfig(config);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('debe rechazar URL vacía', async () => {
      const config: ServerConfig = {
        serverUrl: '',
        port: 8096,
        useHttps: false,
        username: 'testuser',
      };

      const result = await configModule.validateServerConfig(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('La URL del servidor es requerida');
    });

    it('debe rechazar URL inválida', async () => {
      const config: ServerConfig = {
        serverUrl: 'not-a-valid-url',
        port: 8096,
        useHttps: false,
        username: 'testuser',
      };

      const result = await configModule.validateServerConfig(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('La URL del servidor no es válida');
    });
  });
});


  describe('validación de puerto', () => {
    it('debe rechazar puerto menor a 1', async () => {
      const config: ServerConfig = {
        serverUrl: 'http://192.168.1.100',
        port: 0,
        useHttps: false,
        username: 'testuser',
      };

      const result = await configModule.validateServerConfig(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El puerto debe estar entre 1 y 65535');
    });

    it('debe rechazar puerto mayor a 65535', async () => {
      const config: ServerConfig = {
        serverUrl: 'http://192.168.1.100',
        port: 70000,
        useHttps: false,
        username: 'testuser',
      };

      const result = await configModule.validateServerConfig(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El puerto debe estar entre 1 y 65535');
    });

    it('debe aceptar puerto válido', async () => {
      const config: ServerConfig = {
        serverUrl: 'http://192.168.1.100',
        port: 8096,
        useHttps: false,
        username: 'testuser',
      };

      const result = await configModule.validateServerConfig(config);
      expect(result.isValid).toBe(true);
    });
  });

  describe('validación de nombre de usuario', () => {
    it('debe rechazar nombre de usuario vacío', async () => {
      const config: ServerConfig = {
        serverUrl: 'http://192.168.1.100',
        port: 8096,
        useHttps: false,
        username: '',
      };

      const result = await configModule.validateServerConfig(config);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('El nombre de usuario es requerido');
    });
  });
});
