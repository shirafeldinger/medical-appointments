import { useContext, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import { AppointmentContext } from '../context/AppointmentContext';
import { AuthContext } from '../context/AuthContext';
import { SCHEDULES } from '../constants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/AppStackParamList';
import { TimeSelector } from '../components/TimeSelector';
import { useAppointmentStorage } from '../hooks/useAppointmentStorage';

type CalendarScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Calendar'
>;

export default function CalendarScreen({
  navigation,
}: {
  navigation: CalendarScreenNavigationProp;
}) {
  const { state, dispatch } = useContext(AppointmentContext);
  const { username } = useContext(AuthContext);
  const [selected, setSelected] = useState<{
    date: string;
    time: string;
  } | null>(null);
  const { save } = useAppointmentStorage(username);
  const schedule = SCHEDULES[state.specialty as keyof typeof SCHEDULES] || {};

  const handleConfirm = async () => {
    if (!selected || !username) return;

    const appointment = {
      specialty: state.specialty,
      date: selected.date,
      time: selected.time,
      username,
    };

    await save(appointment);
    dispatch({ type: 'CONFIRM_APPOINTMENT', payload: appointment });
    navigation.navigate('Summary');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{`בחירת תור ל${state.specialty}`}</Text>

      {Object.entries(schedule).map(([date, times]) => (
        <View key={date} style={styles.dateBlock}>
          <Text style={styles.dateText}>{date}</Text>
          <TimeSelector
            date={date}
            times={times}
            selected={selected}
            onSelect={setSelected}
          />
        </View>
      ))}

      <Button title="זמן תור" onPress={handleConfirm} disabled={!selected} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'right',
  },
  dateBlock: {
    marginBottom: 24,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
  },
});
