import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions, Image } from 'react-native';

interface RotatingPokeballProps {
  children: React.ReactNode;
}

export const RotatingPokeball = ({ children }: RotatingPokeballProps) => {
  const animation = new Animated.Value(0);
  const { width, height } = Dimensions.get('window');
  const POKEMON_SIZE = 50;
  const DIAGONAL = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  const PATTERN_SIZE = POKEMON_SIZE * 2; // Space between pokemon in the pattern

  // Calculate how many pokemon we need to fill the screen
  const ROWS = Math.ceil(height / PATTERN_SIZE) + 2;
  const COLS = Math.ceil(width / PATTERN_SIZE) + 2;

  useEffect(() => {
    const startAnimation = () => {
      animation.setValue(0);
      Animated.timing(animation, {
        toValue: 1,
        duration: 10000, // 10 seconds for one complete cycle
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => startAnimation()); // Restart animation when complete
    };

    startAnimation();
  }, []);

  // Create pattern matrix
  const pattern = [];
  for (let row = -1; row < ROWS; row++) {
    for (let col = -1; col < COLS; col++) {
      pattern.push({ row, col });
    }
  }

  const translateX = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -PATTERN_SIZE],
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -PATTERN_SIZE],
  });

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {pattern.map((pos, index) => (
          <Animated.View
            key={index}
            style={[
              styles.imageContainer,
              {
                left: pos.col * PATTERN_SIZE,
                top: pos.row * PATTERN_SIZE,
                transform: [
                  { translateX },
                  { translateY },
                ],
              },
            ]}
          >
            <Image
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/22.png' }}
              style={styles.pokemonImage}
            />
          </Animated.View>
        ))}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    backgroundColor: '#f3f4f6',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.1,
  },
  content: {
    zIndex: 1,
  },
  imageContainer: {
    position: 'absolute',
    width: 50,
    height: 50,
  },
  pokemonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default RotatingPokeball;