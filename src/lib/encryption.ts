import CryptoJS from 'crypto-js';
import { getSecretKey } from './secret-key';

export async function encrypt(text: string): Promise<string> {
  const SECRET_KEY = await getSecretKey();
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export async function decrypt(cipher: string): Promise<string> {
  const SECRET_KEY = await getSecretKey();
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}