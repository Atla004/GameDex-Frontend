import { useEffect, useState } from "react";
import { Text, StyleSheet, ScrollView, View, Image } from "react-native";
import { GameSection } from "@/components/mainInterfaceComponents/GameSection";
import { GameCard } from "@/components/mainInterfaceComponents/GameCard";
import { RatingGameCard } from "@/components/mainInterfaceComponents/RatingGameCard";
import SearchBar from "@/components/basic/SearchBar";
import { Game } from "@/types/main";
import { useLoadingScreen, useToast, useUserData } from "../_layout";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

const HomeScreen = () => {
  const { token } = useUserData();
  const { setToast } = useToast();
  const { setLoading, isLoading } = useLoadingScreen();
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);
  const [cardGames, setCardGames] = useState<Game>({
    id: 12,
    imageUrl: "",
    title: "",
    description: "",
    ranking: 1,
    criticScore: 1,
    userScore: 1,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("fetching data");
        await Promise.all([
          //fetchFeaturedGames(),
          //fetchTopRatedGames(),
          fetchCardGames(),
        ]);
        console.log("Data fetched");
        if (isLoading) {
          setLoading(false);
          return;
        }
      } catch (error) {
        setToast("Error fetching data", true, 3000);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
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
                id={1}
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
    </View>
  );

  async function fetchFeaturedGames() {
    try {
      const response = await fetch(`${backendUrl}/featuredGames.json`);
      const data = await response.json();
      setFeaturedGames(data.slice(0, 5));
    } catch (error) {
      throw new Error("Error fetching featured games");
    }
  }

  async function fetchTopRatedGames() {
    try {
      const response = await fetch(`${backendUrl}/topRatedGames.json`);
      const data = await response.json();
      setTopRatedGames(data.slice(0, 2));
    } catch (error) {
      throw new Error("Error fetching top rated games");
    }
  }

  async function fetchCardGames() {
    try {
      const response = await fetch(`${backendUrl}/api/game/home`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const data = await response.json();

      console.log(data.data.cardGames[0]);

      setCardGames(data.data.cardGames[0]);
      setFeaturedGames(data.data.featured);
      setTopRatedGames(data.data.topRated);
    } catch (error) {
      throw new Error("Error fetching card games ");
    }
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
