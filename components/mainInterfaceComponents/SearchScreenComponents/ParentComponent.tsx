
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dropdown from './Dropdown';

const ParentComponent: React.FC = () => {
  const [selected, setSelected] = useState('Option 1');
  const options = ['Option 1', 'Option 2', 'Option 3'];

  return (
    <View style={styles.container}>
      <Dropdown options={options} selected={selected} setSelected={setSelected} />
      <View style={styles.textContainer}>
        <Animated.Text style={[styles.text, { opacity }]}>Tap to Login</Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    color: '#000',
  },
});

export default ParentComponent;