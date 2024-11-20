import React, { useEffect, useMemo, useRef, useCallback } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
  Image,
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

interface BackgroundMainInterfaceProps {
  children: React.ReactNode;
}

export const BackgroundMainInterface = ({
  children,
}: BackgroundMainInterfaceProps) => {
  const animation = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get("window");
  const POKEMON_SIZE = 40;
  const PATTERN_SIZE = POKEMON_SIZE * 2; 

  const ROWS = Math.ceil(height / PATTERN_SIZE) + 2;
  const COLS = Math.ceil(width / PATTERN_SIZE) + 2;

  const startAnimation = useCallback(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => startAnimation());
  }, [animation]);

  useEffect(() => {
    console.log("Starting animation");
    startAnimation();
  }, [startAnimation]);

  const pattern = useMemo(() => {
    const tempPattern = [];
    for (let row = -1; row < ROWS; row++) {
      for (let col = -1; col < COLS; col++) {
        tempPattern.push({ row, col });
      }
    }
    return tempPattern;
  }, [ROWS, COLS]);

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
      <LinearGradient
        colors={['#4c669f', '#3b5998', '#192f6a']}
        style={styles.background}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {pattern.map((pos, index) => (
          <Animated.View
            key={index}
            style={[
              styles.imageContainer,
              {
                left: pos.col * PATTERN_SIZE,
                top: pos.row * PATTERN_SIZE,
                transform: [{ translateX }, { translateY }],
              },
            ]}
          >
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/17.png",
              }}
            style={styles.pokemonImage}
            />
          </Animated.View>
        ))}
      </LinearGradient>
      
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Ensures the container covers the entire screen without affecting other components
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Ensures the background covers the entire screen without affecting other components
    zIndex: -1,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
  imageContainer: {
    position: "absolute",
    width: 50,
    height: 50,
  },
  pokemonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default BackgroundMainInterface;
