import { useLoadingScreen } from "@/app/_layout";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { GameCardRating } from "../GameComponents/GameCardRating";

interface GameCardProps {
  imageUrl: string;
  title: string;
  description: string;
  id: number;
  criticScore: number;
  userScore: number;
}

export const GameCard: React.FC<GameCardProps> = ({
  imageUrl,
  title,
  description,
  criticScore,
  userScore,
  id,
}) => {
  const { setLoading } = useLoadingScreen();
  const [isLoading, setIsLoading] = useState(true);
  console.log("GameCard", imageUrl, title,criticScore,userScore);

  useEffect(() => {
    if (title) {
      setIsLoading(false);
    }
  }, [imageUrl, title, description]);

  const handlePress = () => {
    console.log("GameCard going", id);
    if (isLoading) return;
    setLoading(true);
    setTimeout(() => {
      router.push({
        pathname: `/GameScreen`,
        params: { id },
      });
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
          <ActivityIndicator
            size="large"
            color="#2563eb"
            style={styles.loader}
          />
        ) : (
          <>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.content}>
              <View style={styles.titleContainer}>
                <Image
                  source={{
                    uri: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png",
                  }}
                  style={styles.pokeball}
                />
                <Text style={styles.title} numberOfLines={2}>{title}</Text>
              </View>
              <View style={styles.RatingContainer}>  

                <GameCardRating score={criticScore} type="critic" size="large"/>
                <GameCardRating score={userScore} type="user" size="large" />
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    position: "relative",
    height: 160,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 160,
  },
  image: {
    width: "30%",
    height: 160,
    backgroundColor: "#f3f4f6",
  },
  content: {
    flex: 1,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#3b82f6",
    padding: 8,
    borderRadius: 10,
    marginBottom: 8,
    margin: 8,
  },
  pokeball: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  title: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#4b5563",
    fontSize: 14,
    lineHeight: 20,
  },
  RatingContainer: {
    top: 8,
    
    flexDirection: "row",
    height: 90,
    justifyContent: "space-around",
  },
});
