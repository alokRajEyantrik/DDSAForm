import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.ddsaform',
  appName: 'ddsaform',
  webDir: 'build',
  server: {
    url: 'http://192.168.1.5:8000',
    cleartext: true
  }
};

export default config;
