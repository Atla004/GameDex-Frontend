import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { PokeBallRating } from "@/components/GameComponents/PokeballRating";
import { router } from "expo-router";
import { Game } from "@/types/main";
import { useLoadingScreen } from "@/app/_layout";
import { set } from "zod";

export const RatingGameCard = ({
  imageUrl,
  title,
  description,
  criticScore,
  userScore,
  ranking,
}: Game) => {
  const [isLoading, setIsLoading] = useState(true);
  const {setLoading} = useLoadingScreen();

  useEffect(() => {
    if (imageUrl && title) {
      setIsLoading(false);
    }
  }, [imageUrl, title]);

  const handlePress = () => {
    if (isLoading) return;
    setLoading(true);
    setTimeout(() => {
    router.push("/GameScreen");
    }, 600);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
          transform: [{ scale: pressed ? 0.95 : 1.0 }],
        },
      ]}
    >
      <View style={styles.container}>
        {isLoading ? (
          <>
            <View style={styles.rankingContainer}>
              <Text style={styles.rankingNumber}></Text>
            </View>
            <View style={styles.titleContainer}>
              <ActivityIndicator
                size="large"
                color="#2563eb"
                style={styles.loader}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.rankingContainer}>
              <Text style={styles.rankingNumber}>#{ranking}</Text>
            </View>

            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <Image
                  source={{ uri: imageUrl }}
                  style={styles.image}
                  resizeMode="cover"
                />
                <View style={styles.titleContainer}>
                  <Text style={styles.title} numberOfLines={2}>
                    {title}
                  </Text>
                  <Text style={styles.description} numberOfLines={2}>
                    {description}
                  </Text>
                </View>
              </View>

              <View style={styles.ratingsContainer}>
                <PokeBallRating score={criticScore} type="critic" />
                <PokeBallRating score={userScore} type="user" />
              </View>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#2563eb",
    overflow: "hidden",
    margin: 16,
    elevation: 5,
  },
  rankingContainer: {
    width: 40,
    backgroundColor: "#1d4ed8",
    justifyContent: "center",
    alignItems: "center",
  },
  rankingNumber: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 8,
    backgroundColor: "#f3f4f6",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: 16,
  },
  ratingsContainer: {
    flexDirection: "row",
    gap: 12,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});
