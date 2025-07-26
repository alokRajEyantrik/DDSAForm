import { SecureStoragePlugin } from 'capacitor-secure-storage-plugin';

const KEY_NAME = 'encryption_secret_key';

// Generate a secure random key (example with Web Crypto)
export async function generateSecretKey() {
  const array = new Uint8Array(32); // 256-bit key for AES
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

// Get or create secret key
export async function getSecretKey(): Promise<string> {
  try {
    const { value } = await SecureStoragePlugin.get({ key: KEY_NAME });
    if (value) return value;
  } catch (e) {
    // key not found - generate and store
  }
  const key = await generateSecretKey();
  await SecureStoragePlugin.set({ key: KEY_NAME, value: key });
  return key;
}
