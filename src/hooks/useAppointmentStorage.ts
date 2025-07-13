import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../types/appointment';

export function useAppointmentStorage(username: string | null) {
  const save = async (appointment: Appointment) => {
    if (username)
      await AsyncStorage.setItem(
        `appointment_${username}`,
        JSON.stringify(appointment),
      );
  };

  const load = async (): Promise<Appointment | null> => {
    if (!username) return null;
    const saved = await AsyncStorage.getItem(`appointment_${username}`);
    return saved ? JSON.parse(saved) : null;
  };

  const clear = async () => {
    if (username) await AsyncStorage.removeItem(`appointment_${username}`);
  };

  return { save, load, clear };
}
