import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface PokeBallRatingProps {
  score: number;
  type: 'critic' | 'user';
}

export const PokeBallRating: React.FC<PokeBallRatingProps> = ({ score, type }) => {
  const getRatingColor = (score: number) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#eab308';
    return '#ef4444';
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ 
          uri: type === 'critic' 
            ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'
            : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png'
        }}
        style={styles.pokeball}
      />
      <Text style={[styles.score, { color: getRatingColor(score) }]}>
        {score}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    padding: 4,
    borderRadius: 12,
    gap: 4,
  },
  pokeball: {
    width: 16,
    height: 16,
  },
  score: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});