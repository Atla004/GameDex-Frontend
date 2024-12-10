import React, { useCallback, useEffect, useMemo, useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Easing } from "react-native-reanimated";

interface HolographicScreenProps {
  children: React.ReactNode;
}

const HolographicScreen: React.FC<HolographicScreenProps> = ({ children }) => {
  const scanLinePosition = new Animated.Value(0);

  const animation = useRef(new Animated.Value(0)).current;
  const { width, height } = Dimensions.get("window");
  const POKEMON_SIZE = 60;
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

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLinePosition, {
          toValue: 1,
          duration: 7000,
          useNativeDriver: true,
        }),
        Animated.timing(scanLinePosition, {
          toValue: 0,
          duration: 7000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[
          "rgba(0, 191, 255, 0.8)",
          "rgba(0, 122, 204, 0.8)",
          "rgba(0, 51, 153, 0.8)",
        ]}
        style={styles.gradient}
      >
        {/* Holographic scan line */}
        <Animated.View
          style={[
            styles.scanLine,
            {
              transform: [
                {
                  translateY: scanLinePosition.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 750],
                  }),
                },
              ],
            },
          ]}
        />

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
            <ImageBackground
              source={require("@/assets/background/pokeballBackground.png")}
              style={styles.pokemonImage}
            />
          </Animated.View>
        ))}

        {/* Content */}
        <View style={styles.content}>{children}</View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    padding: 16,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },

  container: {
    ...StyleSheet.absoluteFillObject, // Ensures the container covers the entire screen without affecting other components
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Ensures the background covers the entire screen without affecting other components
    zIndex: 1,
    opacity: 0.8,
  },
  content: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  imageContainer: {
    position: "absolute",
    width: 50,
    height: 50,
    zIndex: 0,
  },
  pokemonImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default HolographicScreen;
