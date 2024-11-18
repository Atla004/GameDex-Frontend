import { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, Image } from "react-native";
import { GameSection } from "@/components/mainInterfaceComponents/GameSection";
import { GameCard } from "@/components/mainInterfaceComponents/GameCard";
import { RatingGameCard } from "@/components/mainInterfaceComponents/RatingGameCard";
import SearchBar from "@/components/basic/SearchBar";
import { Game } from "@/types/main";
import BackgroundMainInterface from "@/components/wraper/BackgroundMainInterface";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

const HomeScreen = () => {
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [cardGames, setCardGames] = useState<Game>({
    id: "12",
    imageUrl: "",
    title: "",
    description: "",
    ranking: 1,
    criticScore: 1,
    userScore: 1,
  });

  useEffect(() => {
    console.log("fetching data");
    fetchFeaturedGames();
    fetchTopRatedGames();
    fetchCardGames();
  }, []);

  return (
    <BackgroundMainInterface>
      <ScrollView style={styles.container}>
        <SearchBar />
        <GameCard
          imageUrl={cardGames.imageUrl}
          title={cardGames.title}
          description={cardGames.description}
        />

        <GameSection title="Featured Games" games={featuredGames} />

        <View style={styles.topRatedSection}>
          <View style={styles.topRatedHeader}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
              }}
              style={styles.headerPokeball}
            />
            <Text style={styles.topRatedTitle}>Top Rated Games</Text>
          </View>
        


          {topRatedGames.length === 0 ? (
            <>
            <RatingGameCard 
              id=""
              imageUrl=""
              title=""
              description=""
              ranking={1}
              criticScore={1}
              userScore={1}
              />
            </>
          ) : (
            topRatedGames.map((game) => (
              <RatingGameCard key={game.ranking} {...game} />
            ))
          )}

        </View>
      </ScrollView>
    </BackgroundMainInterface>
  );

  function fetchFeaturedGames() {
    fetch(`${backendUrl}/featuredGames.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFeaturedGames(data.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching featured games:", error));
  }

  function fetchTopRatedGames() {
    fetch(`${backendUrl}/topRatedGames.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setTopRatedGames(data.slice(0, 2));
      })
      .catch((error) =>
        console.error("Error fetching top rated games:", error)
      );
  }

  function fetchCardGames() {
    fetch(`${backendUrl}/cardGames.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardGames(data);
      })
      .catch((error) => console.error("Error fetching card games:", error));
  }
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
  topRatedSection: {
    marginTop: 16,
    paddingBottom: 16,
  },
  topRatedHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  headerPokeball: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  topRatedTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
