import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Pressable, ScrollView } from 'react-native';

interface OrderingDropdownProps {
  options: string[];
  selected: string;
  setSelected: (value: string) => void;
}

export const OrderingDropdown: React.FC<OrderingDropdownProps> = ({ options, selected, setSelected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const dropdownRef = useRef<View>(null);

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
  };

  const handleOutsidePress = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <View style={{}}>
      <Pressable onPress={handleOutsidePress} style={{ flex: 1, position: 'absolute', width: '100%', height: '100%' }} />
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
          <Text style={styles.dropdownButtonText}>Ordering by: {selected}</Text>
        </TouchableOpacity>
        <Animated.View 
          ref={dropdownRef}
          style={[
            styles.dropdownList,
            {
              maxHeight: animatedHeight.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 150],
              }),
              opacity: animatedHeight,
            },
          ]}
        >
          <ScrollView>
            {options.map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.option, item === selected && styles.selectedOption]}
                onPress={() => handleOptionSelect(item)}
              >
                <Text style={[styles.optionText, item === selected && styles.selectedOptionText]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-end',
    marginRight: 16,
    marginTop: 8,
    zIndex: 1,
  },
  dropdownButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#9ca3af',
    paddingVertical: 4,
  },
  dropdownButtonText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'black',
  },
  dropdownList: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
    width: 150,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: '#e5e7eb',
  },
  optionText: {
    fontSize: 14,
    color: '#374151',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
});
