import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.ddsaform',
  appName: 'ddsaform',
  webDir: 'build',
  server: {
    url: 'http://192.168.1.5:8000',
    cleartext: true,
    allowNavigation: ['ddsa-api-1.onrender.com']
  }
};

export default config;
