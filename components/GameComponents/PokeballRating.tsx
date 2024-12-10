import { View, Image, Text, StyleSheet } from 'react-native';

interface PokeBallRatingProps {
  score: number;
  type: 'critic' | 'user';
  size?: 'normal' | 'large';
}

export const PokeBallRating: React.FC<PokeBallRatingProps> = ({ 
  score, 
  type,
  size = 'normal' 
}) => {
  const getRatingColor = (score: number) => {
    if (score >= 75) return '#22c55e';
    if (score >= 50) return '#eab308';
    return '#ef4444';
  };

  const getStyles = (size: 'normal' | 'large') => ({
    container: {
      ...styles.container,
      padding: size === 'large' ? 8 : 4,
    },
    pokeball: {
      width: size === 'large' ? 24 : 16,
      height: size === 'large' ? 24 : 16,
    },
    score: {
      ...styles.score,
      fontSize: size === 'large' ? 20 : 14,
    },
  });

  const sizeStyles = getStyles(size);

  return (
    <View style={sizeStyles.container}>
      <Image
        source={{ 
          uri: type === 'critic' 
            ? 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'
            : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png'
        }}
        style={sizeStyles.pokeball}
      />
      <Text style={[sizeStyles.score, { color: getRatingColor(score) }]}>
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
    borderRadius: 12,
    gap: 4,
  },
  score: {
    fontWeight: 'bold',
  },
});