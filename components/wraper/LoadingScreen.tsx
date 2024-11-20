import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import Reanimated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withRepeat,
  withSequence,
  Easing as ReanimatedEasing,
} from 'react-native-reanimated';

interface LoadingScreenProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading, children }) => {
  console.log('LoadingScreen render', isLoading);

  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);
  const textOpacity = useSharedValue(1);

  useEffect(() => {
    if (isLoading) {
      opacity.value = withTiming(1, { duration: 100 });
      rotation.value = withRepeat(
        withTiming(360, {
          duration: 2000,
          easing: ReanimatedEasing.linear,
        }),
        -1
      );
      textOpacity.value = withRepeat(
        withSequence(
          withTiming(0.5, { duration: 750 }),
          withTiming(1, { duration: 750 })
        ),
        -1
      );
    } else {
      opacity.value = withTiming(0, { duration: 500 });
    }
  }, [isLoading]);

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    zIndex: opacity.value === 0 ? -1 : 1000,
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: 1 - opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Reanimated.View style={[styles.overlay, overlayStyle]}>
        <View style={styles.content}>
          <Reanimated.View style={[styles.pokeballContainer, rotationStyle]}>
            <View style={styles.pokeball}>
              <View style={styles.pokeballTop} />
              <View style={styles.pokeballMiddle}>
                <View style={styles.pokeballDot} />
              </View>
              <View style={styles.pokeballBottom} />
            </View>
          </Reanimated.View>
          <Reanimated.Text style={[styles.loadingText, textStyle]}>
            Loading...
          </Reanimated.Text>
        </View>
      </Reanimated.View>
      <Reanimated.View style={[styles.childrenContainer, contentStyle]}>
        {children}
      </Reanimated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    alignItems: 'center',
  },
  pokeballContainer: {
    width: 100,
    height: 100,
  },
  pokeball: {
    width: '100%',
    height: '100%',
  },
  pokeballTop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    backgroundColor: '#ff1f1f',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  pokeballMiddle: {
    position: 'absolute',
    top: '45%',
    width: '100%',
    height: 10,
    backgroundColor: '#000',
    zIndex: 2,
  },
  pokeballDot: {
    position: 'absolute',
    top: -5,
    left: '40%',
    width: 20,
    height: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#000',
    zIndex: 3,
  },
  pokeballBottom: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  loadingText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  childrenContainer: {
    flex: 1,
  },
});