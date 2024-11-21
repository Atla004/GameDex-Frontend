import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions,Text } from 'react-native';
import { router } from 'expo-router';
import HolographicScreen from '@/components/Anuevos/HolographicScreen';


export default function Index() {


  const handlePress = () => {

    setTimeout(() => {
      console.log('handlePress');
      router.push('/LoginScreen');
    }, 600);
  };

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={handlePress}
    >
        <Text>Press mffffffffffffffffffffffdasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasasfffffffffffffffffffffffffe</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
  },
  content: {
    flex: 1,
  },
});