import React, { useEffect, useState } from "react";
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
import { CommentInputFooter } from "@/components/GameComponents/CommentsInputFooter";
import { Review } from "@/types/main";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

interface GameScreenData {
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
  criticReviews: Review[];
  userReviews: Review[];
}

const GameScreen = () => {
  const [gameData, setGameData] = useState<GameScreenData>({
    id: "",
    title: "",
    description: "",
    imageUrl: "",
    criticScore: 0,
    userScore: 0,
    genres: [],
    platforms: [],
    developer: "",
    publisher: "",
    releaseDate: "",
    ageRating: "",
    criticReviews: [],
    userReviews: [],
  });

  function fetchGame(gameId: string) {
    fetch(`${backendUrl}/getGame/${gameId}.json`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data.criticReviews);
        setGameData(data);
      })
      .catch((error) => console.error("Error fetching featured games"));
  }

  useEffect(() => {
    fetchGame("1");
  }, []);

  const onClose = () => {
    router.push("/(mainInterface)/HomeScreen");
  };

  const onViewAllComments = () => {
    router.push("/(games)/CommentScreen");
  };

  const handleAddComment = (content: string) => {
    const newReview = {
      id: Date.now().toString(),
      username: "You",
      score: 85, // You might want to add a score input in the real app
      content,
      date: new Date().toLocaleDateString(),
      isOwnReview: true,
    };

    if (!gameData.userReviews) {
      setGameData({
        ...gameData,
        userReviews: [newReview],
      });
      return;
    }


    setGameData({
      ...gameData,
      userReviews: [...gameData.userReviews,newReview],
    });

  
  };

  const handleDeleteReview = (reviewId: string) => {
    
    if(!gameData.userReviews){
      return;
    }


    setGameData({
      ...gameData,
      userReviews: [...gameData.userReviews.filter((review) => review.id !== reviewId)],
    });
    
  };

  const [renderViewAllButtonBoolean, setRenderViewAllButtonBoolean] = useState(false);

  useEffect(() => {
    console.log("gameData", gameData);
    if (gameData.userReviews.length > 3 || gameData.criticReviews.length > 3
    ) {
      console.log("review true");
      setRenderViewAllButtonBoolean(true);
      
    }else{
      console.log("review false");
      setRenderViewAllButtonBoolean(false);
    }
  }, [gameData]);

  if (!gameData) {
    return <Text>Loading...</Text>;
  }else
  console.log("gameData", gameData);
  
  return (
    <>
      <ScrollView style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onClose} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Title Section */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>{gameData.title}</Text>
          <View style={styles.genreContainer}>
            {gameData.genres.map((genre, index) => (
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
          { gameData.imageUrl?(

            
            <Image
            source={{ uri: gameData.imageUrl }}
            style={styles.coverImage}
            resizeMode="cover"
            />
          ):(
            null
          )
          }
        </View>

        {/* Description and Ratings */}
        <View style={styles.contentSection}>
          <Text style={styles.description}>{gameData.description}</Text>

          <View style={styles.ratingsContainer}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingLabel}>Critic Score</Text>
              <PokeBallRating
                score={gameData.criticScore}
                type="critic"
                size="large"
              />
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingLabel}>User Score</Text>
              <PokeBallRating
                score={gameData.userScore}
                type="user"
                size="large"
              />
            </View>
          </View>

          {/* Game Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Game Details</Text>
            <GameDetail
              label="Platforms"
              value={gameData.platforms.join(", ")}
            />
            <GameDetail label="Developer" value={gameData.developer} />
            <GameDetail label="Publisher" value={gameData.publisher} />
            <GameDetail label="Release Date" value={gameData.releaseDate} />
            <GameDetail label="Age Rating" value={gameData.ageRating} />
          </View>

          {/* Reviews */}
          <View style={styles.reviewsContainer}>
            <Text style={styles.sectionTitle}>Critic Reviews</Text>
            <ReviewSection
              reviews={gameData.criticReviews.slice(0, 3)}
              type="critic"
            />
            {gameData.criticReviews.length > 1 && (
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={onViewAllComments}
              >
                <Text style={styles.viewAllText}>View All Reviews</Text>
                <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
              </TouchableOpacity>
            )}

            <Text style={[styles.sectionTitle, styles.userReviewsTitle]}>
              User Reviews
            </Text>
            <ReviewSection
              reviews={gameData.userReviews}
              type="user"
              onDeleteReview={handleDeleteReview}
            />
            { renderViewAllButtonBoolean && (
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={onViewAllComments}
              >
                <Text style={styles.viewAllText}>View All Reviews</Text>
                <Ionicons name="chevron-forward" size={20} color="#3b82f6" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
      <CommentInputFooter onSubmit={handleAddComment} />
    </>
  );
};

export default GameScreen;

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
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#3b82f6",
    marginTop: 12,
  },
  viewAllText: {
    color: "#3b82f6",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
  },
});