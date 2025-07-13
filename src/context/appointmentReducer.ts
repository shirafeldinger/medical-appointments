import { Appointment, Action, initialAppointment } from '../types/appointment';

export function appointmentReducer(
  state: Appointment,
  action: Action,
): Appointment {
  switch (action.type) {
    case 'SET_SPECIALTY':
      return { ...state, specialty: action.payload };
    case 'CONFIRM_APPOINTMENT':
      return { ...action.payload };
    case 'LOAD_FROM_STORAGE':
      return action.payload ? { ...action.payload } : initialAppointment;
    case 'CLEAR_APPOINTMENT':
      return initialAppointment;
    default:
      return state;
  }
}
