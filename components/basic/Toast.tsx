import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

interface ToastProps {
  message: string;
  visible: boolean;
  duration?: number;
  setToast: (visible: boolean) => void;
  color?: string;
}

const Toast: React.FC<ToastProps> = ({ message, visible, duration = 3000, setToast , color="red"}) => {
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start(() => setToast(false));
        }, duration);
      });
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.toast, { opacity },{backgroundColor: color,}]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  message: {
    color: 'white',
  },
});

export default Toast;
