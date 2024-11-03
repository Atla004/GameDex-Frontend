import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

interface RotatingPokeballProps {
  children: React.ReactNode;
}

export const RotatingPokeball = ({ children }: RotatingPokeballProps) => {
  const rotateAnim = new Animated.Value(0);

  
  const size = 400;
  const radius = (size - 20) / 2;
  const strokeWidth = 2;
  const transform = `translate(${strokeWidth }, ${strokeWidth })`;
  
  useEffect(() => {
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.background}>

        <Animated.View
          style={[
            styles.pokeball,
            {
              transform: [{ rotate }],
            },
          ]}
        >
          <View style={[styles.container, { width: size, height: size }]}>
            <Svg
              height={size}
              width={size}
              viewBox={`0 0 ${size + strokeWidth+2} ${size + strokeWidth+2}`}
            >
              <Path
                transform={transform}
                d={`M 0 ${size / 2} A ${size / 2} ${size / 2} 0 1 0 ${size} ${
                  size / 2
                } L ${size} ${size / 2 + 1} L 0 ${size / 2 + 1} Z`}
                fill="white"
                stroke="black"
                strokeWidth={strokeWidth}
                />
              <Path
                transform={transform}
                d={`M 0 ${size / 2} A ${size / 2} ${size / 2} 0 1 1 ${size} ${
                  size / 2
                } L ${size} ${size / 2 - 1} L 0 ${size / 2 - 1} Z`}
                fill="red"
                stroke="black"
                strokeWidth={strokeWidth}
                />

              <Circle
                cx={size / 2}
                cy={size / 2}
                r={size / 7}
                fill="white"
                stroke="black"
                strokeWidth={strokeWidth * 2}
                />
            </Svg>
          </View>
        </Animated.View>
      </View>
      <View style={styles.content}>
      {children}
      </View>

    </View>
  );
};

const { width } = Dimensions.get('window');
const POKEBALL_SIZE = width * 1.2;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: 'relative',
  },
  background: {
    zIndex: -1, 
    position: 'absolute',
  },
  content: {
    zIndex: 1,
  },
  pokeball: {
    width: POKEBALL_SIZE,
    height: POKEBALL_SIZE,
    opacity: 1,
  },
  pokeballTop: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    backgroundColor: '#ef4444',
    borderTopLeftRadius: POKEBALL_SIZE / 2,
    borderTopRightRadius: POKEBALL_SIZE / 2,
  },
  pokeballBottom: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: '50%',
    backgroundColor: '#000',
    borderBottomLeftRadius: POKEBALL_SIZE / 2,
    borderBottomRightRadius: POKEBALL_SIZE / 2,
  },
  pokeballLine: {
    position: 'absolute',
    top: '50%',
    marginTop: -POKEBALL_SIZE * 0.025,
    width: '100%',
    height: POKEBALL_SIZE * 0.05,
    backgroundColor: '#000',
  },
  pokeballCenter: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: POKEBALL_SIZE * 0.2,
    height: POKEBALL_SIZE * 0.2,
    marginLeft: -POKEBALL_SIZE * 0.1,
    marginTop: -POKEBALL_SIZE * 0.1,
    backgroundColor: '#000',
    borderRadius: POKEBALL_SIZE * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pokeballInnerCenter: {
    width: POKEBALL_SIZE * 0.12,
    height: POKEBALL_SIZE * 0.12,
    backgroundColor: '#fff',
    borderRadius: POKEBALL_SIZE * 0.06,
  },
});