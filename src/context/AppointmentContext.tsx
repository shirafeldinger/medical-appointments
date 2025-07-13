import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { appointmentReducer } from './appointmentReducer';
import { Action, Appointment, initialAppointment } from '../types/appointment';
import { AuthContext } from './AuthContext';

export const AppointmentContext = createContext<{
  state: Appointment;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialAppointment,
  dispatch: () => null,
});

export function AppointmentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appointmentReducer, initialAppointment);
  const { username } = useContext(AuthContext);

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem(`appointment_${username}`);

        if (saved) {
          const parsed: Appointment = JSON.parse(saved);
          dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
        }
      } catch (e) {
        console.error('שגיאה בטעינת התור מ־AsyncStorage:', e);
      }
    };

    load();
  }, [username]);

  return (
    <AppointmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  );
}
