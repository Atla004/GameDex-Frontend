import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import { router } from 'expo-router';
import PokedexFrame from '@/components/wrapper/PokedexFrame';

export default function Index() {
  const [isOpen, setIsOpen] = useState(true);
  const opacity = useState(new Animated.Value(0))[0];

  useEffect(() => {
    const animate = () => {
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => animate());
    };
    animate(
          );
  }, [opacity]);

  const handlePress = () => {
    setIsOpen(false);
    setTimeout(() => {
      router.push('/HomeScreen');
    }, 600);
  };

  return (

      <PokedexFrame isTransitioning={isOpen}>
        {isOpen && (
          <TouchableOpacity style={styles.container} onPress={handlePress}>
          <View style={styles.textContainer}>
            <Animated.Text style={[styles.text, { opacity }]}>Tap to Login</Animated.Text>
          </View>
          </TouchableOpacity>

        )}
      </PokedexFrame>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    zIndex: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    zIndex: 5,
  },
  blink: {
    opacity: 0.5,
  },
  pokedex: {
    alignItems: 'center',
  },
  pokedexImage: {
    width: 200,
    height: 200,
  },
  content: {
    flex: 1,
  },
});