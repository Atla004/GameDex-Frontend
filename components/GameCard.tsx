import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface GameCardProps {
  imageUrl: string;
  title: string;
  description: string;
}

export const GameCard: React.FC<GameCardProps> = ({ imageUrl, title, description }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Image 
            source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png' }}
            style={styles.pokeball}
          />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#2563eb',
    overflow: 'hidden',
    margin: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: 'relative',
  },
  image: {
    width: '30%',
    height: 160,
    backgroundColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    padding: 12,
    width: '70%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
  },
  pokeball: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    color: '#4b5563',
    fontSize: 14,
    lineHeight: 20,
  },
});