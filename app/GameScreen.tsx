import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GameDetail } from "@/components/GameComponents/GameDetail";
import { ReviewSection } from "@/components/GameComponents/ReviewSection";
import { PokeBallRating } from "@/components/GameComponents/PokeballRating";
import { StatusBar } from "react-native";
import { router } from "expo-router";

interface GameScreenProps {
  game: {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    criticScore: number;
    userScore: number;
    genres: string[];
    platforms: string[];
    developer: string;
    publisher: string;
    releaseDate: string;
    ageRating: string;
    criticReviews: Array<{
      author: string;
      publication: string;
      score: number;
      content: string;
      date: string;
    }>;
    userReviews: Array<{
      username: string;
      score: number;
      content: string;
      date: string;
    }>;
  };
}

const GameScreen: React.FC<GameScreenProps> = ({ game }) => {
  const onClose = () => {
    router.push("/(mainInterface)/HomeScreen");
  };
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <ScrollView style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{game.title}</Text>
          <View style={styles.genreContainer}>
            {game.genres.map((genre, index) => (
              <View key={index} style={styles.genreChip}>
                <Text style={styles.genreText}>{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Cover Image with Pokeball Background */}
        <View style={styles.imageContainer}>
          <View style={styles.pokeballBackground}>
            <View style={styles.pokeballTop} />
            <View style={styles.pokeballCenter}>
              <View style={styles.pokeballButton} />
            </View>
            <View style={styles.pokeballBottom} />
          </View>
          <Image
            source={{ uri: game.imageUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        </View>

        {/* Description and Ratings */}
        <View style={styles.contentSection}>
          <Text style={styles.description}>{game.description}</Text>

          <View style={styles.ratingsContainer}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingLabel}>Critic Score</Text>
              <PokeBallRating
                score={game.criticScore}
                type="critic"
                size="large"
              />
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingLabel}>User Score</Text>
              <PokeBallRating score={game.userScore} type="user" size="large" />
            </View>
          </View>

          {/* Game Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Game Details</Text>
            <GameDetail label="Platforms" value={game.platforms.join(", ")} />
            <GameDetail label="Developer" value={game.developer} />
            <GameDetail label="Publisher" value={game.publisher} />
            <GameDetail label="Release Date" value={game.releaseDate} />
            <GameDetail label="Age Rating" value={game.ageRating} />
          </View>

          {/* Reviews */}
          <View style={styles.reviewsContainer}>
            <Text style={styles.sectionTitle}>Critic Reviews</Text>
            <ReviewSection reviews={game.criticReviews} type="critic" />

            <Text style={[styles.sectionTitle, styles.userReviewsTitle]}>
              User Reviews
            </Text>
            <ReviewSection reviews={game.userReviews} type="user" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mockGame = {
  id: "1",
  title: "Pokémon Red",
  description:
    "Pokémon Red is a 1996 role-playing video game developed by Game Freak and published by Nintendo for the Game Boy.",
  imageUrl:
    "https://cdn.discordapp.com/attachments/750486359386357863/1219035852714545152/photo_2024-03-17_17-32-52.jpg?ex=67293d9b&is=6727ec1b&hm=3eeeceb76a7e05732fb917f1c2af01984c03f12ce891c7bf730304d409948301&",
  criticScore: 85,
  userScore: 90,
  genres: ["RPG", "Adventure"],
  platforms: ["Game Boy"],
  developer: "Game Freak",
  publisher: "Nintendo",
  releaseDate: "1996-02-27",
  ageRating: "E",
  criticReviews: [
    {
      author: "CHAN...",
      publication: "La uña negra",
      score: 13,
      content:
        "Con el corazon roto... pero con la esperanza de que el proximo sea mejor",
      date: "2005-03-01",
    },
    // ...more reviews
  ],
  userReviews: [
    {
      username: "TheBlackInTheBear",
      score: 95,
      content:
        "Soy un tanke soy un tanke soy un tanke soy un tanke soy un tanke",
      date: "11-09-2024",
    },
    {
      username: "ElGochoComePiedras",
      score: 69,
      content: "para que ir por una torre si puedes ir por dos",
      date: "11-09-2001",
    },
  ],
};

const App = () => {
  return <GameScreen game={mockGame} />;
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    height: 60,
    backgroundColor: "#ef4444",
    justifyContent: "center",
  },
  backButton: {
    paddingLeft: 16,
  },
  titleSection: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 12,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreChip: {
    backgroundColor: "#ef4444",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  genreText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  imageContainer: {
    height: 300,
    position: "relative",
  },
  pokeballBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#e5e7eb",
  },
  pokeballTop: {
    height: "45%",
    backgroundColor: "#4b5563",
  },
  pokeballCenter: {
    height: "10%",
    backgroundColor: "#1f2937",
    justifyContent: "center",
    alignItems: "center",
  },
  pokeballButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#9ca3af",
    borderWidth: 4,
    borderColor: "#1f2937",
  },
  pokeballBottom: {
    height: "45%",
    backgroundColor: "#d1d5db",
  },
  coverImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.9,
  },
  contentSection: {
    padding: 16,
  },
  description: {
    fontSize: 16,
    color: "#4b5563",
    lineHeight: 24,
    marginBottom: 24,
  },
  ratingsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  ratingBox: {
    alignItems: "center",
  },
  ratingLabel: {
    fontSize: 16,
    color: "#4b5563",
    marginBottom: 8,
    fontWeight: "500",
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 16,
  },
  reviewsContainer: {
    gap: 16,
  },
  userReviewsTitle: {
    marginTop: 24,
  },
});
