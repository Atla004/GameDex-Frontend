import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PokeBallRating } from "@/components/GameComponents/PokeballRating";

interface Review {
  author?: string;
  publication?: string;
  username?: string;
  score: number;
  content: string;
  date: string;
}

interface ReviewSectionProps {
  reviews: Review[];
  type: "critic" | "user";
}

export const ReviewSection: React.FC<ReviewSectionProps> = ({
  reviews,
  type,
}) => {
  return (
    <View style={styles.container}>
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewCard}>
          <View style={styles.reviewHeader}>
            <View style={styles.reviewerInfo}>
              <Text style={styles.reviewerName}>
                {type === "critic" ? review.author : review.username}
              </Text>
              {type === "critic" && review.publication && (
                <Text style={styles.publication}>{review.publication}</Text>
              )}
            </View>
            <PokeBallRating score={review.score} type={type} />
          </View>

          <Text style={styles.content}>{review.content}</Text>

          <Text style={styles.date}>{review.date}</Text>
        </View>
      ))}
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
    borderWidth: 2,
    borderColor: "#e5e7eb",
  },
  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  reviewerInfo: {
    flex: 1,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 2,
  },
  publication: {
    fontSize: 14,
    color: "#6b7280",
  },
  content: {
    fontSize: 14,
    color: "#4b5563",
    lineHeight: 20,
    marginBottom: 12,
  },
  date: {
    fontSize: 12,
    color: "#9ca3af",
  },
});
