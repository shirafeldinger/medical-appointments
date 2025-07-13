export type Appointment = {
  specialty: string;
  date: string;
  time: string;
  username: string;
};

export type Action =
  | { type: 'SET_SPECIALTY'; payload: string }
  | { type: 'CONFIRM_APPOINTMENT'; payload: Appointment }
  | { type: 'LOAD_FROM_STORAGE'; payload: Appointment | null }
  | { type: 'CLEAR_APPOINTMENT' };

export const initialAppointment: Appointment = {
  specialty: '',
  date: '',
  time: '',
  username: '',
};
