import React, { useState } from 'react';
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RotatingPokeball } from '@/components/wraper/RotatingPokeball';
import { GameCard } from '@/components/GameCard';


const searchResults = [
  {
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_scarlet_violet/scarlet-violet-169.jpg',
    title: 'Pokémon Scarlet & Violet',
    description: 'Embark on an open-world adventure in the Paldea region. Discover new Pokémon, explore vast landscapes, and uncover the mysteries of Terastallization.',
  },
  {
    imageUrl: 'https://assets.pokemon.com/assets/cms2/img/video-games/video-games/pokemon_legends_arceus/legends-arceus-169.jpg',
    title: 'Pokémon Legends: Arceus',
    description: 'Travel to the ancient Hisui region and discover the origins of the Pokémon world in this groundbreaking adventure.',
  },
];

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Implement search logic here
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Pokémon games..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6b7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {isSearching && searchResults.length > 0 && (
          <View>
            <View style={styles.resultsHeader}>
              <Image 
                source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png' }}
                style={styles.headerIcon}
              />
              <Text style={styles.resultsTitle}>Search Results</Text>
            </View>

            {searchResults.map((game, index) => (
              <GameCard
                key={index}
                {...game}
              />
            ))}
          </View>
        )}

        {isSearching && searchResults.length === 0 && (
          <View style={styles.emptyState}>
            <Image 
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png' }}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateText}>No games found</Text>
            <Text style={styles.emptyStateSubtext}>Try different keywords</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#1d4ed8',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1f2937',
  },
  resultsHeader: {
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
  resultsTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  emptyState: {
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