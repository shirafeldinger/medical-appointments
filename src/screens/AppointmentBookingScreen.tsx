import { useContext, useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppointmentContext } from '../context/AppointmentContext';
import { SPECIALTIES } from '../constants';
import { RootStackParamList } from '../types/AppStackParamList';

type AppointmentBookingScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppointmentBooking'
>;

export default function AppointmentBookingScreen({
  navigation,
}: {
  navigation: AppointmentBookingScreenNavigationProp;
}) {
  const [selected, setSelected] = useState('');
  const { dispatch } = useContext(AppointmentContext);

  const handleNext = () => {
    dispatch({ type: 'SET_SPECIALTY', payload: selected });
    navigation.navigate('Calendar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>בחר תחום רפואי:</Text>
      {SPECIALTIES.map(spec => {
        const isSelected = selected === spec;
        return (
          <TouchableOpacity
            key={spec}
            onPress={() => setSelected(spec)}
            style={[
              styles.specialtyButton,
              isSelected && styles.selectedButton,
            ]}
          >
            <Text style={styles.text}>{spec}</Text>
          </TouchableOpacity>
        );
      })}
      <Button title="המשך" onPress={handleNext} disabled={!selected} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'center',
    flex: 1,
  },
  specialtyButton: {
    padding: 10,
    borderWidth: 1,
    marginVertical: 5,
  },
  title: { textAlign: 'right', fontSize: 18, marginBottom: 6 },
  text: { textAlign: 'center', writingDirection: 'rtl', fontSize: 16 },
  selectedButton: {
    borderColor: '#007aff',
  },
});
