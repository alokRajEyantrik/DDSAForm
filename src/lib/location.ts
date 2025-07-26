import { Geolocation } from '@capacitor/geolocation';

export async function getCurrentPosition() {
  try {
    const coordinates = await Geolocation.getCurrentPosition();
    return coordinates.coords; // { latitude, longitude, accuracy, ... }
  } catch (error) {
    console.error('Error getting location', error);
    return null;
  }
}
