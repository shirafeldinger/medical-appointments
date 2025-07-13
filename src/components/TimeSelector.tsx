import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  date: string;
  times: string[];
  selected: { date: string; time: string } | null;
  onSelect: (val: { date: string; time: string }) => void;
};

export function TimeSelector({ date, times, selected, onSelect }: Props) {
  return (
    <View style={styles.timesRow}>
      {times.map(time => {
        const isSelected = selected?.date === date && selected?.time === time;

        return (
          <TouchableOpacity
            key={time}
            style={[styles.timeButton, isSelected && styles.selectedButton]}
            onPress={() => onSelect({ date, time })}
          >
            <Text style={isSelected ? styles.selectedText : undefined}>
              {time}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  timesRow: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 4,
  },
  selectedButton: {
    backgroundColor: '#cceeff',
    borderColor: '#007aff',
  },
  selectedText: {
    fontWeight: 'bold',
    color: '#007aff',
  },
});
