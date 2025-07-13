import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useContext,
} from 'react';
import { appointmentReducer } from './appointmentReducer';
import { Action, Appointment, initialAppointment } from '../types/appointment';
import { AuthContext } from './AuthContext';
import { useAppointmentStorage } from '../hooks/useAppointmentStorage';

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

  const { load } = useAppointmentStorage(username);
  useEffect(() => {
    load().then(appointment => {
      if (appointment)
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: appointment });
    });
  }, [username, load]);

  return (
    <AppointmentContext.Provider value={{ state, dispatch }}>
      {children}
    </AppointmentContext.Provider>
  );
}
