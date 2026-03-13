// Jest setup file
import '@testing-library/jest-native/extend-expect';

// Mock de expo-secure-store global
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

// Mock de expo-av
jest.mock('expo-av', () => ({
  Video: 'Video',
  Audio: {
    setAudioModeAsync: jest.fn(),
  },
}));

// Mock de @react-native-community/netinfo
jest.mock('@react-native-community/netinfo', () => ({
  fetch: jest.fn(),
  addEventListener: jest.fn(),
}));
