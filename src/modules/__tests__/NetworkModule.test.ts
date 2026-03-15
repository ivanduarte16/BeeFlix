/**
 * Tests para NetworkModule
 */

import { NetworkModule } from '../NetworkModule';

// Mock de @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
  addEventListener: jest.fn(),
}));

import NetInfo from '@react-native-community/netinfo';

describe('NetworkModule', () => {
  let networkModule: NetworkModule;

  beforeEach(() => {
    networkModule = new NetworkModule();
    jest.clearAllMocks();
  });

  describe('checkConnection', () => {
    it('debe retornar estado conectado para WiFi', async () => {
      (NetInfo.fetch as jest.Mock).mockResolvedValue({
        isConnected: true,
        type: 'wifi',
        details: { linkSpeed: 100 },
      });

      const status = await networkModule.checkConnection();
      
      expect(status.isConnected).toBe(true);
      expect(status.connectionType).toBe('wifi');
    });

    it('debe retornar estado desconectado cuando no hay red', async () => {
      (NetInfo.fetch as jest.Mock).mockResolvedValue({
        isConnected: false,
        type: 'none',
      });

      const status = await networkModule.checkConnection();
      
      expect(status.isConnected).toBe(false);
      expect(status.connectionType).toBe('none');
    });

    it('debe manejar errores y retornar estado desconectado', async () => {
      (NetInfo.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const status = await networkModule.checkConnection();
      
      expect(status.isConnected).toBe(false);
      expect(status.connectionType).toBe('none');
      expect(status.bandwidth).toBe(0);
    });
  });


  describe('testServerReachability', () => {
    beforeEach(() => {
      global.fetch = jest.fn();
    });

    it('debe retornar true cuando el servidor es alcanzable', async () => {
      (global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        status: 200,
      });

      const isReachable = await networkModule.testServerReachability(
        'http://192.168.1.100:8096'
      );
      
      expect(isReachable).toBe(true);
    });

    it('debe retornar false cuando el servidor no es alcanzable', async () => {
      (global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'));

      const isReachable = await networkModule.testServerReachability(
        'http://192.168.1.100:8096'
      );
      
      expect(isReachable).toBe(false);
    });

    it('debe retornar false cuando hay timeout', async () => {
      (global.fetch as jest.Mock).mockImplementation(
        () => new Promise((resolve) => setTimeout(resolve, 15000))
      );

      const isReachable = await networkModule.testServerReachability(
        'http://192.168.1.100:8096',
        100 // timeout corto para el test
      );
      
      expect(isReachable).toBe(false);
    });
  });

  describe('monitorConnection', () => {
    it('debe llamar al callback cuando cambia el estado de red', () => {
      const callback = jest.fn();
      let netInfoListener: any;

      (NetInfo.addEventListener as jest.Mock).mockImplementation((listener) => {
        netInfoListener = listener;
        return jest.fn(); // unsubscribe function
      });

      networkModule.monitorConnection(callback);

      // Simular cambio de estado
      netInfoListener({
        isConnected: true,
        type: 'wifi',
      });

      expect(callback).toHaveBeenCalled();
      expect(callback.mock.calls[0][0].isConnected).toBe(true);
      expect(callback.mock.calls[0][0].connectionType).toBe('wifi');
    });
  });
});
