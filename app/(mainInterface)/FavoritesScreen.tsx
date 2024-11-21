import { RatingGameCard } from "@/components/mainInterfaceComponents/RatingGameCard";
 
import { Game } from "@/types/main";
import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, View, Text, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

const FavoritesScreen = () => {
  const [favoriteGames, setFavoriteGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchFavoriteGames = async () => {
        try {
          const response = await fetch(`${backendUrl}/Favorites.json`);
          const data = await response.json();
          setFavoriteGames(data);
        } catch (error) {
          console.error("Error fetching favorite games:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchFavoriteGames();
    }, [])
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
            }}
            style={styles.headerIcon}
          />
          <Text style={styles.headerTitle}>Your Favorite Games</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        ) : (
          <>
            {favoriteGames.map((game, index) => (
              <RatingGameCard key={index} {...game} />
            ))}

            {favoriteGames.length === 0 && (
              <View style={styles.emptyState}>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
                  }}
                  style={styles.emptyStateIcon}
                />
                <Text style={styles.emptyStateText}>No favorite games yet!</Text>
                <Text style={styles.emptyStateSubtext}>
                  Start adding games to your favorites
                </Text>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1d4ed8",
    padding: 16,
    marginBottom: 16,
  },
  headerIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "bold",
    color: "#4b5563",
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#6b7280",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4b5563",
  },
});
