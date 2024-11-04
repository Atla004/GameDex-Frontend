import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions, Image } from 'react-native';

// Import local images
import Pikachu from '@/assets/pokemon/1.png';
import Bulbasaur from '@/assets/pokemon/4.png';
import Charmander from '@/assets/pokemon/7.png';
import Squirtle from '@/assets/pokemon/25.png';

interface RotatingPokeballProps {
  children: React.ReactNode;
}

const POKEMON_IMAGES = [
  Pikachu,  // Pikachu
  Bulbasaur,  // Bulbasaur
  Charmander,  // Charmander
  Squirtle,  // Squirtle
];

export const RotatingPokeball = ({ children }: RotatingPokeballProps) => {
  const animations = POKEMON_IMAGES.map(() => new Animated.ValueXY({ x: 0, y: 0 }));
  const { width, height } = Dimensions.get('window');
  const DIAGONAL_LENGTH = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));

  useEffect(() => {
    const createAnimation = (index: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.timing(animations[index], {
            toValue: { 
              x: -DIAGONAL_LENGTH,
              y: DIAGONAL_LENGTH
            },
            duration: 14000, // Slower animation
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(animations[index], {
            toValue: { x: 0, y: 0 },
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      );
    };

    const animationGroup = POKEMON_IMAGES.map((_, index) => createAnimation(index));
    Animated.parallel(animationGroup).start();

    return () => {
      animationGroup.forEach(anim => anim.stop());
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {POKEMON_IMAGES.map((image, index) => {
          const positionStyles = [
            { transform: [{ translateX: animations[index].x }, { translateY: animations[index].y }] }, // Top-left
            { transform: [{ translateX: Animated.add(animations[index].x, width - 50) }, { translateY: animations[index].y }] }, // Top-right
            { transform: [{ translateX: animations[index].x }, { translateY: Animated.add(animations[index].y, height - 50) }] }, // Bottom-left
            { transform: [{ translateX: Animated.add(animations[index].x, width - 50) }, { translateY: Animated.add(animations[index].y, height - 50) }] }, // Bottom-right
          ];

          return (
            <Animated.View
              key={index}
              style={[styles.imageContainer, positionStyles[index]]}
            >
              <Image
                source={image}
                style={styles.pokemonImage}
              />
            </Animated.View>
          );
        })}
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
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
    opacity: 1,
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