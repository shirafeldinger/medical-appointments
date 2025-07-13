import React, { useContext } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext } from '../context/AuthContext';
import { AppointmentContext } from '../context/AppointmentContext';
import { RootStackParamList } from '../types/AppStackParamList';
import { useAppointmentStorage } from '../hooks/useAppointmentStorage';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export default function HomeScreen({
  navigation,
}: {
  navigation: HomeScreenNavigationProp;
}) {
  const { username, logout } = useContext(AuthContext);
  const { state, dispatch } = useContext(AppointmentContext);
  const { specialty, date, time } = state;
  const { clear } = useAppointmentStorage(username);
  const hasAppointment = specialty && date && time;

  const handleCancel = async () => {
    await clear();
    dispatch({ type: 'LOAD_FROM_STORAGE', payload: null });
    Alert.alert('התור בוטל בהצלחה');
  };

  const handleUpdate = () => {
    navigation.navigate('Calendar');
  };

  const handleLogout = async () => {
    dispatch({ type: 'CLEAR_APPOINTMENT' });
    logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>שלום {username}!</Text>

      {hasAppointment && (
        <View style={styles.box}>
          <Text style={styles.appointmentText}>תחום: {specialty}</Text>
          <Text style={styles.appointmentText}>תאריך: {date}</Text>
          <Text style={styles.appointmentText}>שעה: {time}</Text>

          <View style={styles.actions}>
            <Button title="עדכן תור" onPress={handleUpdate} />
            <View style={styles.spacer} />
            <Button title="בטל תור" color="red" onPress={handleCancel} />
          </View>
        </View>
      )}

      <Button
        title="התחל זימון תור"
        onPress={() => navigation.navigate('AppointmentBooking')}
      />

      <View style={styles.logoutContainer}>
        <Button title="התנתק" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  box: {
    width: '100%',
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  appointmentText: {
    textAlign: 'right',
    writingDirection: 'rtl',
    fontSize: 16,
    marginBottom: 6,
  },
  actions: {
    marginTop: 16,
  },
  spacer: {
    height: 10,
  },
  logoutContainer: {
    marginTop: 24,
  },
});
