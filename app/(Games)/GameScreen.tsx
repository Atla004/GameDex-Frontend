import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GameDetail } from "@/components/GameComponents/GameDetail";
import { ReviewSection } from "@/components/GameComponents/ReviewSection";
import { PokeBallRating } from "@/components/GameComponents/PokeballRating";
import { router, useLocalSearchParams } from "expo-router";
import { CommentInputFooter } from "@/components/GameComponents/CommentsInputFooter";
import { Review } from "@/types/main";
import { useLoadingScreen, useToast, useUserData } from "../_layout";
import { LocalRouteParamsContext } from "expo-router/build/Route";
import { GameCard } from "@/components/mainInterfaceComponents/GameCard";
import { GameCardRating } from "@/components/GameComponents/GameCardRating";
const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

interface GameScreenData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  criticScore: number;
  userScore: number;
  genres: string[];
  platform: string[];
  developers: string[];
  publishers: string[];
  releaseDate: string;
  ageRating: string;
  favorite: boolean;
}

interface newComment {
  content: string;
  publication: string;
  score: number;
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
    platform: [],
    developers: [],
    publishers: [],
    releaseDate: "",
    ageRating: "",
    favorite: false,
  });

  const { _id, token, username } = useUserData();

  const { setLoading } = useLoadingScreen();
  const { id } = useLocalSearchParams();

  const [reviewUserData, setReviewUserData] = useState<Review[]>([]);
  const [reviewCriticData, setReviewCriticData] = useState<Review[]>([]);

  const { setToast } = useToast();

  const [isFavorite, setIsFavorite] = useState(false);

  async function fetchGame(gameId: string) {
    try {
      const response = await fetch(`${backendUrl}/api/game/details/${gameId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) {
        console.log("not ok");
        throw new Error("Game not found");
      }
      console.log("data lllegassssss", data.data.description);
      console.log(JSON.stringify(data.data, null, 2));
      const gameData = data.data;
      if (gameData.releaseDate) {
        gameData.releaseDate = gameData.releaseDate.split("T")[0];
      }
      setGameData(gameData);
    } catch (error) {
      console.log('dafadsfadsdfsfdsfds',error);
      throw new Error("Error fetching game data");
    }
  }

  async function fetchUserComments(gameId: string) {
    try {
      const response = await fetch(
        `${backendUrl}/api/review/${_id}/${gameId}/player/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (Array.isArray(data.data.comments)) {
        setReviewUserData(data.data.comments);
      } else {
        setReviewUserData([]);
      }
    } catch (error) {
      throw new Error("Error fetching comments");
    }
  }

  async function fetchCriticComments(gameId: string) {
    try {
      const response = await fetch(
        `${backendUrl}/api/review/${_id}/${gameId}/critic/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (Array.isArray(data.data.comments)) {
        setReviewCriticData(data.data.comments);
      } else {
        setReviewCriticData([]);
      }
    } catch (error) {
      throw new Error("Error fetching comments");
    }
  }

  async function fetchSendComment(
    publication: string,
    content: string,
    score: number
  ) {
    try {
      const response = await fetch(
        `${backendUrl}/api/review/${_id}/${id}
`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            publication: publication,
            content: content,
            score: score,
          }),
        }
      );
      const data = await response.json();
    } catch (error) {
      throw new Error("Error fetching comments");
    }
  }

  async function fetchDeleteComment() {
    try {
      const response = await fetch(
        `${backendUrl}/api/review/${_id}/${id}
`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      fetchAllGames();

      if (Array.isArray(data)) {
        setReviewCriticData(data);
      } else {
        setReviewCriticData([]);
      }
      
    } catch (error) {
      throw new Error("Error fetching comments");
    }
  }

  async function fetchAllGames() {
    try {
      await Promise.all([
        fetchGame(id as string),
        fetchUserComments(id as string),
        fetchCriticComments(id as string),
      ]);
    } catch (error) {
      setToast("Error fetching game data", true, 3000);
      router.replace("/HomeScreen");
    }
  }

  useEffect(() => {


    fetchAllGames();
  }, []);

  useEffect(() => {
    console.log("gameData11", !(gameData.description === ""));
    console.log("gameData22", gameData.description);
    if (!(gameData.description === ""  || gameData.description === undefined) ) {
      setTimeout(() => {
        
        setLoading(false);
      }, 100);
      return;
    }


  }, [gameData]);

  const onClose = () => {
    setLoading(true);
    setTimeout(() => {
      router.replace("/HomeScreen");
    }, 600);
  };

  const onViewAllComments = () => {
    router.push({
      pathname: `/CommentScreen`,
      params: { id },
    });
  };

  const handleFavoritePress = () => {
    setIsFavorite((prev) => !prev);
    if (isFavorite) {
      fetchDeleteFavorite();
      return;
    }
    fetchAddFavorite();
    setToast("Game added to favorites", true, 3000, "rgb(59, 130, 246)");
  };

  async function fetchAddFavorite() {
    try {

      const body = JSON.stringify({ game_api_id: Number(id) });
      const header = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const response = await fetch(
        `${backendUrl}/api/user/${_id}/add-favorite`,
        {
          method: "POST",
          headers: header,
          body: body,
        }
      );


      const data = await response.json();
    } catch (error) {
      throw new Error("Error fetching comments");
    }
  }
  async function fetchDeleteFavorite() {
    try {
      const response = await fetch(
        `${backendUrl}/api/user/${_id}/remove-favorite`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ game_api_id: Number(id) }),
        }
      );
      const data = await response.json();
    } catch (error) {
      throw new Error("Error fetching comments");
    }
  }

  const handleAddComment = ({ content, publication, score }: newComment) => {
    const newReview: Review = {
      publication,
      id: Date.now().toString(),
      username: username as string,
      score, // You might want to add a score input in the real app
      content,
      date: new Date().toLocaleDateString(),
      isOwnReview: true,
    };

    if (!reviewUserData) {
      setReviewUserData([newReview]);
      return;
    }

    setReviewUserData([...reviewUserData, newReview]);
    fetchSendComment(publication, content, score);
    fetchAllGames();

  };

  const handleDeleteReview = (reviewId: string) => {
    if (reviewUserData.length === 0) {
      return;
    }

    setReviewUserData([
      ...reviewUserData.filter((review) => review.id !== reviewId),
    ]);
    fetchDeleteComment();

  };

  const [renderViewAllButtonBoolean, setRenderViewAllButtonBoolean] =
    useState(false);

  useEffect(() => {
    if (reviewUserData.length > 0 || reviewCriticData.length > 3) {
      console.log("review true");
      setRenderViewAllButtonBoolean(true);
    } else {
      console.log("review false");
      setRenderViewAllButtonBoolean(false);
    }
  }, [reviewUserData, reviewCriticData]);

  const stripHtmlTags = (html: string) => {
    if (!html) {
      return "";
    }
    try {
      
      return html.replace(/<\/?[^>]+(>|$)/g, "");
    } catch (e) {
      console.log('este sera el type error dasdf',e)
      console.log(html);
      return html;
    }
  };

  const hasOwnReview = reviewUserData.some((review) => review.isOwnReview);

  return (
    <>
      {/* Your app content */}

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
            {gameData.genres &&
              gameData.genres.length > 0 &&
              gameData.genres.map((genre, index) => (
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
          {gameData.imageUrl ? (
            <Image
              source={{ uri: gameData.imageUrl }}
              style={styles.coverImage}
              resizeMode="cover"
            />
          ) : null}
        </View>

        {/* Description and Ratings */}
        <View style={styles.contentSection}>
          <Text style={styles.description}>
            {stripHtmlTags(gameData.description)}
          </Text>

          <View style={styles.ratingsContainer}>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingLabel}>Critic Score</Text>
              <GameCardRating
                score={gameData.criticScore}
                type="critic"
              />
            </View>
            <View style={styles.ratingBox}>
              <Text style={styles.ratingLabel}>User Score</Text>
              <GameCardRating
                score={gameData.userScore}
                type="user"
              />
            </View>
          </View>

          {/* Game Details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.sectionTitle}>Game Details</Text>

            <GameDetail
              label="Developer"
              value={gameData.developers ? gameData.developers.join(", ") : ""}
            />
            <GameDetail
              label="Publisher"
              value={gameData.publishers ? gameData.publishers.join(", ") : ""}
            />
            <GameDetail label="Release Date" value={gameData.releaseDate} />

          </View>

          {/* Reviews */}
          <View style={styles.reviewsContainer}>
            <Text style={styles.sectionTitle}>Critic Reviews</Text>
            <ReviewSection reviews={reviewCriticData} type="critic" />

            <Text style={[styles.sectionTitle, styles.userReviewsTitle]}>
              User Reviews
            </Text>
            <ReviewSection
              reviews={reviewUserData}
              type="user"
              onDeleteReview={handleDeleteReview}
            />
            {renderViewAllButtonBoolean && (
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
      {!hasOwnReview && <CommentInputFooter onSubmit={handleAddComment} />}
    </>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 60,
    backgroundColor: "#ef4444",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    paddingLeft: 16,
  },
  favoriteButton: {
    paddingRight: 16,
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
