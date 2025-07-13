import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { AppointmentProvider } from './src/context/AppointmentContext';

export default function App() {
  return (
    <AuthProvider>
      <AppointmentProvider>
        <AppNavigator />
      </AppointmentProvider>
    </AuthProvider>
  );
}
