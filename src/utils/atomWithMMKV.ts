import { atomWithStorage, createJSONStorage } from 'jotai/utils';
import { MMKV } from 'react-native-mmkv';

const atomStorage = new MMKV({
  id: 'atom-storage',
});

function getItem<T>(key: string): T | null {
  const value = atomStorage.getString(key);
  return value ? JSON.parse(value) : null;
}

function setItem<T>(key: string, value: T): void {
  atomStorage.set(key, JSON.stringify(value));
}

function removeItem(key: string): void {
  atomStorage.delete(key);
}

function clearAll(): void {
  atomStorage.clearAll();
}

export const atomWithMMKV = <T>(key: string, initialValue: T) =>
  atomWithStorage<T>(
    key,
    initialValue,
    createJSONStorage<T>(() => ({
      getItem,
      setItem,
      removeItem,
      clearAll,
    }))
  );
