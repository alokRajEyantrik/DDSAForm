import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

export const setSecureItem = async (key: string, value: string) => {
  await SecureStoragePlugin.set({ key, value });
};

export const getSecureItem = async (key: string) => {
  const { value } = await SecureStoragePlugin.get({ key });
  return value;
};
