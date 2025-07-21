import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.ddsaform',
  appName: 'ddsaform',
  webDir: 'build',
  server: {
    url: 'http://localhost:8000',
    cleartext: true,
    allowNavigation: ['ddsa-api-1.onrender.com']
  }
};

export default config;
