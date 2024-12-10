import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
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

  const opacity = useSharedValue(0);
  const rotation = useSharedValue(0);
  const textOpacity = useSharedValue(1);

  useEffect(() => {
    if (isLoading) {
      opacity.value = withTiming(1, { duration: 300 });
      rotation.value = withRepeat(
        withTiming(100, {
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
          <Reanimated.View style={[styles.imageContainer, rotationStyle]}>

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
  imageContainer: {
    width: 100,
    height: 100,
  },
  loadingImage: {
    width: '100%',
    height: '100%',
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