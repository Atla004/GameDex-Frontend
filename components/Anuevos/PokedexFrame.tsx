import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

interface PokedexFrameProps {
  children: React.ReactNode;
  isTransitioning?: boolean;
}

const PokedexFrame: React.FC<PokedexFrameProps> = ({ children, isTransitioning }) => {
  const topHeight = useRef(new Animated.Value(80)).current;
  const bottomHeight = useRef(new Animated.Value(80)).current;

  useEffect(() => {
    if (isTransitioning) {
      Animated.parallel([
        Animated.timing(topHeight, {
          toValue: Dimensions.get('window').height / 2 + 15,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(bottomHeight, {
          toValue: Dimensions.get('window').height / 2 + 15,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setTimeout(() => {
          Animated.parallel([
            Animated.timing(topHeight, {
              toValue: 80,
              duration: 300,
              useNativeDriver: false,
            }),
            Animated.timing(bottomHeight, {
              toValue: 80,
              duration: 300,
              useNativeDriver: false,
            }),
          ]).start();
        }, 400);
      });
    }
  }, [isTransitioning]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.border, styles.topBorder, { height: topHeight }]}>
        <View style={styles.topContent}>
          <View style={styles.mainLight}>
            <View style={styles.mainLightOuter}>
              <View style={styles.mainLightInner} />
              <View style={styles.mainLightReflection} />
            </View>
          </View>
          <View style={styles.indicatorLights}>
            <View style={[styles.smallLight, styles.redLight]} />
            <View style={[styles.smallLight, styles.yellowLight]} />
            <View style={[styles.smallLight, styles.greenLight]} />
          </View>
        </View>
        <View style={styles.topLines}>
          {[...Array(3)].map((_, i) => (
            <View key={i} style={styles.line} />
          ))}
        </View>
      </Animated.View>

      <View style={styles.content}>{children}</View>

      <Animated.View style={[styles.border, styles.bottomBorder, { height: bottomHeight }]}>
        <View style={styles.bottomContent}>
          <View style={styles.dPad}>
            <View style={styles.dPadVertical} />
            <View style={styles.dPadHorizontal} />
            <View style={styles.dPadCenter} />
          </View>
          <View style={styles.actionButtons}>
            <View style={[styles.actionButton, styles.actionButtonRed]} />
            <View style={[styles.actionButton, styles.actionButtonBlue]} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ef4444',
  },
  border: {
    backgroundColor: '#dc2626',
    width: '100%',
    padding: 20,
    borderWidth: 2,
    borderColor: '#991b1b',
  },
  topBorder: {
    borderBottomWidth: 4,
  },
  bottomBorder: {
    borderTopWidth: 4,
  },
  content: {
    flex: 1,
    backgroundColor: '#ef4444',
  },
  topContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainLight: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#1d4ed8',
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainLightOuter: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  mainLightInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#60a5fa',
  },
  mainLightReflection: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  indicatorLights: {
    flexDirection: 'row',
    gap: 12,
  },
  smallLight: {
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderWidth: 1,
    borderColor: '#000',
  },
  redLight: {
    backgroundColor: '#ef4444',
  },
  yellowLight: {
    backgroundColor: '#fbbf24',
  },
  greenLight: {
    backgroundColor: '#22c55e',
  },
  topLines: {
    marginTop: 15,
    gap: 8,
  },
  line: {
    height: 3,
    backgroundColor: '#991b1b',
    borderRadius: 1.5,
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dPad: {
    width: 80,
    height: 80,
    position: 'relative',
  },
  dPadVertical: {
    position: 'absolute',
    top: 20,
    left: 35,
    width: 10,
    height: 40,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  dPadHorizontal: {
    position: 'absolute',
    top: 35,
    left: 20,
    width: 40,
    height: 10,
    backgroundColor: '#374151',
    borderRadius: 2,
  },
  dPadCenter: {
    position: 'absolute',
    top: 32,
    left: 32,
    width: 16,
    height: 16,
    backgroundColor: '#4b5563',
    borderRadius: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 15,
  },
  actionButton: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
    borderWidth: 2,
  },
  actionButtonRed: {
    backgroundColor: '#ef4444',
    borderColor: '#991b1b',
  },
  actionButtonBlue: {
    backgroundColor: '#3b82f6',
    borderColor: '#1d4ed8',
  },
});

export default PokedexFrame;