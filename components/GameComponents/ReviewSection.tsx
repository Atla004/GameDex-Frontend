import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PokeBallRating } from "./PokeballRating";

interface Review {
  id: string;
  publication?: string;
  username?: string;
  score: number;
  content: string;
  date: string;
  isOwnReview?: boolean;
}

interface ReviewSectionProps {
  reviews: Review[];
  type: "critic" | "user";
  onDeleteReview?: (reviewId: string) => void;
  maxNumberOfReviews?: number;
}

export const ReviewSection = ({
  reviews,
  type,
  onDeleteReview,
  maxNumberOfReviews = 3,
}: ReviewSectionProps) => {
  const handleDelete = (reviewId: string) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => onDeleteReview?.(reviewId),
          style: "destructive",
        },
      ]
    );
  };

  const reviewsToRender = reviews.slice(0, maxNumberOfReviews);





  return (
    <View style={styles.container}>
      {reviewsToRender.length === 0 ? 
      (
          <Text style={styles.content}>No reviews yet</Text>
        ) : (

      
      reviewsToRender.map((review) => (
        <View key={review.id} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewerInfo}>
              <View style={styles.nameContainer}>
                <Image
                  source={{
                    uri:
                      type === "critic"
                        ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png"
                        : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
                  }}
                  style={styles.reviewerIcon}
                />
                <Text style={styles.publication}>{review.publication}</Text>
              </View>
              {review.publication && (
                <Text style={styles.reviewerName}>{review.username}</Text>
              )}
            </View>
            <View style={styles.rightHeader}>
              <PokeBallRating score={review.score} type={type} />
              {review.isOwnReview && onDeleteReview && (
                <TouchableOpacity
                  onPress={() => handleDelete(review.id)}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={20} color="#ef4444" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          <Text style={styles.content}>{review.content}</Text>

          <Text style={styles.date}>{review.date}</Text>
        </View>
      ))
    )

    }


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  reviewCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: "#991b1b",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: "#fecaca",
  },
  reviewerInfo: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  reviewerIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  publication: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#991b1b",
  },
  reviewerName: {
    fontSize: 14,
    color: "#6b7280",
    marginLeft: 28,
  },
  rightHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  deleteButton: {
    padding: 4,
  },
  content: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  date: {
    fontSize: 12,
    color: "#9ca3af",
    textAlign: "right",
    fontStyle: "italic",
  },
});
