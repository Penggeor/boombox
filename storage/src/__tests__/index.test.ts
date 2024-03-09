/**
 * @jest-environment jsdom
 */
import { localStorage, sessionStorage } from '../index';

describe('ExtendedStorage', () => {
  describe('LocalStorage', () => {
    it('should set and get item correctly', () => {
      localStorage.setItem('testKey', 'testValue');
      expect(localStorage.getItem('testKey')).toBe('testValue');
    });

    it('should return null for non-existing keys', () => {
      expect(localStorage.getItem('nonExistingKey')).toBeNull();
    });

    it('should set and get JSON item correctly', () => {
      const testObject = { name: 'John', age: 30 };
      localStorage.setItem('testKey', testObject);
      const retrievedItem = localStorage.getItem('testKey');
      expect(retrievedItem).toEqual(testObject);
    });
  });

  describe('SessionStorage', () => {
    it('should set and get item correctly', () => {
      sessionStorage.setItem('testKey', 'testValue');
      expect(sessionStorage.getItem('testKey')).toBe('testValue');
    });

    it('should return null for non-existing keys', () => {
      expect(sessionStorage.getItem('nonExistingKey')).toBeNull();
    });

    it('should set and get JSON item correctly', () => {
      const testObject = { name: 'John', age: 30 };
      sessionStorage.setItem('testKey', testObject);
      const retrievedItem = sessionStorage.getItem('testKey');
      expect(retrievedItem).toEqual(testObject);
    });
  });
});