import { RatingGameCard } from '@/components/RatingGameCard';
import { RotatingPokeball } from '@/components/wraper/RotatingPokeball';
import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';

const favoriteGames = [
  {
    ranking: 1,
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_legends_arceus/legends-arceus-169.jpg',
    title: 'Pokémon Legends: Arceus',
    description: 'A groundbreaking new entry in the Pokémon series, featuring an open-world adventure in the ancient Hisui region.',
    criticScore: 83,
    userScore: 88,
  },
  {
    ranking: 2,
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_scarlet_violet/scarlet-violet-169.jpg',
    title: 'Pokémon Scarlet & Violet',
    description: 'The first open-world RPG in the main Pokémon series, featuring three grand stories.',
    criticScore: 72,
    userScore: 78,
  }
];

const FavoritesScreen = () => {
  return (
    <RotatingPokeball>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png' }}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>Your Favorite Games</Text>
        </View>

        {favoriteGames.map((game, index) => (
          <RatingGameCard
          key={index}
          {...game}
          />
        ))}

        {favoriteGames.length === 0 && (
          <View style={styles.emptyState}>
            <Image 
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }}
              style={styles.emptyStateIcon}
              />
            <Text style={styles.emptyStateText}>No favorite games yet!</Text>
            <Text style={styles.emptyStateSubtext}>Start adding games to your favorites</Text>
          </View>
        )}
      </ScrollView>
  </RotatingPokeball>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    padding: 16,
    marginBottom: 16,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4b5563',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#6b7280',
  },
});