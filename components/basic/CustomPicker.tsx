import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface CustomPickerProps {
  selectedValue: string;
  onValueChange: (value: string) => void;
  style?: object;
}

const CustomPicker: React.FC<CustomPickerProps> = ({ selectedValue, onValueChange, style }) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { label: 'All', value: 'all' },
    { label: 'Name', value: 'name' },
    { label: 'Type', value: 'type' },
    { label: 'Generation', value: 'generation' },
  ];

  return (
    <View style={[styles.picker, style]}>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.dropdownHeader}>
        <Text>{selectedValue.charAt(0).toUpperCase() + selectedValue.slice(1)}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View>
          {options.map(option => (
            <TouchableOpacity key={option.value} onPress={() => { onValueChange(option.value); setIsOpen(false); }}>
              <Text style={selectedValue === option.value && styles.selected}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {

  },
  dropdownHeader: {
    padding: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fffacd',
  },
  selected: {
    fontWeight: 'bold',
  },
});

export default CustomPicker;
