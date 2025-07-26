import { Camera } from '@capacitor/camera';
import type { PermissionStatus } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

export async function requestCameraPermission(): Promise<boolean> {
  try {
    const permission: PermissionStatus = await Camera.checkPermissions();
    if (permission.camera === 'granted') {
      return true;
    }
    const result = await Camera.requestPermissions();
    return result.camera === 'granted';
  } catch (error) {
    console.error('Error requesting camera permission:', error);
    return false;
  }
}

export async function requestLocationPermission(): Promise<boolean> {
  try {
    const result = await Geolocation.requestPermissions();
    return result.location === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
}
