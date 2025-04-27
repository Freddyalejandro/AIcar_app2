
import fetchMock from 'jest-fetch-mock';
import '@react-native-async-storage/async-storage/jest/async-storage-mock';
fetchMock.enableMocks();
import { AsyncStorage } from '@react-native-async-storage/async-storage';

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));