
import { View, Text, StyleSheet, ScrollView,Image } from 'react-native';
import { Poster } from '@/components/mainInterfaceComponents/Poster';
import { Game } from '@/types/main';

interface GameSectionProps {
  title: string;
  games: Game[];
}

export const GameSection = ({ title, games }:GameSectionProps) => {

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Image 
          source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png' }}
          style={styles.pokeball}
        />
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.carouselContainer}>

        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={true} 
          contentContainerStyle={styles.gamesContainer}
        >
          {games.length === 0 ? (
            <>
            <Poster 
              imageUrl=""
              title=""
              id={0}
              />
            </>
          ) : (
            games.map((game: Game) => (
              <Poster 
                key={game.id}
                imageUrl={game.imageUrl}
                title={game.title}
                id={game.id}
              />
            ))
          )}


        </ScrollView>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    position: 'relative',
    width: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1d4ed8',
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  pokeball: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  gamesContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 8,
  },
  arrow: {
    width: 40,
    height: 40,
    backgroundColor: '#3b82f6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1d4ed8',
  },
});