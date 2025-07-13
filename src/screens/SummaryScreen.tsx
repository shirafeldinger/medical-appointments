import React, { useContext } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { AppointmentContext } from '../context/AppointmentContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/AppStackParamList';

type SummaryScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Summary'
>;

export default function SummaryScreen({
  navigation,
}: {
  navigation: SummaryScreenNavigationProp;
}) {
  const { state } = useContext(AppointmentContext);

  const { specialty, date, time, username } = state;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎉 התור נקבע בהצלחה!</Text>
      <View style={styles.box}>
        <Text style={styles.label}>תחום רפואי:</Text>
        <Text style={styles.value}>{specialty}</Text>

        <Text style={styles.label}>תאריך:</Text>
        <Text style={styles.value}>{date}</Text>

        <Text style={styles.label}>שעה:</Text>
        <Text style={styles.value}>{time}</Text>

        <Text style={styles.label}>שם המטופל:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>

      <Button title="סיום" onPress={() => navigation.replace('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  box: {
    backgroundColor: '#f2f2f2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    alignItems: 'flex-end',
    width: '100%',
  },
  label: {
    fontWeight: '600',
    marginTop: 12,
    textAlign: 'right',
  },
  value: { textAlign: 'right', alignSelf: 'flex-end' },
});
