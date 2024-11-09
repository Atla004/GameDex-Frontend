import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ReviewSection } from "@/components/GameComponents/ReviewSection";

interface CommentsScreenProps {
  game: {
    title: string;
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
  onClose: () => void;
}

const ITEMS_PER_PAGE = 5;

const mockGame = {
  title: "Mock Game Title",
  criticReviews: [
    {
      author: "Critic Author 1",
      publication: "Publication 1",
      score: 85,
      content: "This is a great game!",
      date: "2023-01-01",
    },
    {
      author: "Critic Author 2",
      publication: "Publication 2",
      score: 90,
      content: "Amazing gameplay and story.",
      date: "2023-02-01",
    },
    // ...more mock critic reviews...
  ],
  userReviews: [
    {
      username: "User1",
      score: 80,
      content: "Really enjoyed this game.",
      date: "2023-03-01",
    },
    {
      username: "User2",
      score: 75,
      content: "Good game but has some bugs.",
      date: "2023-04-01",
    },
    // ...more mock user reviews...
  ],
};

const CommentsScreen = ({ game = mockGame, onClose }: CommentsScreenProps) => {
  const [activeTab, setActiveTab] = useState<"critic" | "user">("critic");
  const [currentPage, setCurrentPage] = useState(1);

  const reviews =
    activeTab === "critic" ? game.criticReviews : game.userReviews;
  const totalPages = Math.ceil(reviews.length / ITEMS_PER_PAGE);
  const currentReviews = reviews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{game.title}</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "critic" && styles.activeTab]}
          onPress={() => {
            setActiveTab("critic");
            setCurrentPage(1);
          }}
        >
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
            }}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "critic" && styles.activeTabText,
            ]}
          >
            Critic Reviews
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "user" && styles.activeTab]}
          onPress={() => {
            setActiveTab("user");
            setCurrentPage(1);
          }}
        >
          <Image
            source={{
              uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
            }}
            style={styles.tabIcon}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === "user" && styles.activeTabText,
            ]}
          >
            User Reviews
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <ReviewSection reviews={currentReviews} type={activeTab} />
      </ScrollView>

      <View style={styles.pagination}>
        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === 1 && styles.pageButtonDisabled,
          ]}
          onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
        >
          <Ionicons
            name="chevron-back"
            size={24}
            color={currentPage === 1 ? "#9ca3af" : "#3b82f6"}
          />
        </TouchableOpacity>

        <View style={styles.pageInfo}>
          <Text style={styles.pageText}>
            Page {currentPage} of {totalPages}
          </Text>
          <Text style={styles.pageSubtext}>
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, reviews.length)} of{" "}
            {reviews.length}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.pageButton,
            currentPage === totalPages && styles.pageButtonDisabled,
          ]}
          onPress={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
        >
          <Ionicons
            name="chevron-forward"
            size={24}
            color={currentPage === totalPages ? "#9ca3af" : "#3b82f6"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  header: {
    height: 60,
    backgroundColor: "#ef4444",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 16,
  },
  backButton: {
    padding: 16,
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 8,
    gap: 8,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  activeTab: {
    backgroundColor: "#3b82f6",
  },
  tabIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4b5563",
  },
  activeTabText: {
    color: "#fff",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  pagination: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
  },
  pageButtonDisabled: {
    opacity: 0.5,
  },
  pageInfo: {
    alignItems: "center",
  },
  pageText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
  },
  pageSubtext: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
});
