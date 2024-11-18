import React, { useState, useEffect, useRef, useCallback } from "react";
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
import { Review } from "@/types/main";
import { router } from "expo-router";
import Pagination from "@/components/mainInterfaceComponents/SearchScreenComponents/Pagination";

const backendUrl = process.env.EXPO_PUBLIC_API_URL as string;

const ITEMS_PER_PAGE = 10;

const CommentsScreen = () => {
  const [comments, setComments] = useState<Review[]>([]);
  const [activeTab, setActiveTab] = useState<"critic" | "user">("critic");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const isSearchingRef = useRef(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [resultCount, setResultCount] = useState(0);

  const onClose = () => {
    console.log("onClose");
    router.back();
  };

  const getReviews = useCallback(async () => {
    if (!isSearchingRef.current) {
      console.log("not searching isSearching:", isSearchingRef.current);
      return;
    }
    console.log("fetching data");
    setLoading(true);
    try {
      const url = `${backendUrl}/commentspages/${activeTab}/pag_${currentPage}.json`;
      const response = await fetch(url);
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      setReviews(data.comments);
      setTotalPages(data.total_pages);
      setResultCount(data.result_count);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab, currentPage]);

  useEffect(() => {
    console.log("useEffect currentPage", currentPage);
    getReviews();
  }, [currentPage, activeTab]);

  useEffect(() => {
    isSearchingRef.current = true;
    getReviews();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
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
        {loading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}

        {!loading && isSearchingRef.current && reviews.length > 0 && (
          <ReviewSection reviews={reviews} type={activeTab}  maxNumberOfReviews={10}/>
        )}

        {!loading && isSearchingRef.current && reviews.length === 0 && (
          <View style={styles.emptyState}>
            <Image
              source={{
                uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png",
              }}
              style={styles.emptyStateIcon}
            />
            <Text style={styles.emptyStateText}>No reviews found</Text>
            <Text style={styles.emptyStateSubtext}>Try different keywords</Text>
          </View>
        )}
      </ScrollView>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        startIndex={0}
        ITEMS_PER_PAGE={ITEMS_PER_PAGE}
        result_count={resultCount}
      />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: "#6b7280",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyStateIcon: {
    width: 40,
    height: 40,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
});