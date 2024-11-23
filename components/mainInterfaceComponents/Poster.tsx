import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { useLoadingScreen } from "@/app/_layout";


interface PosterProps {
  imageUrl: string;
  title: string;
  id: number;
}

export const Poster: React.FC<PosterProps> = ({ imageUrl, title,id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setLoading } = useLoadingScreen();

  useEffect(() => {
    if (imageUrl && title) {
      setIsLoading(false);
    }
  }, [imageUrl, title]);

  const handlePress = () => {
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
          <>
            <ActivityIndicator
              size="large"
              color="#2563eb"
              style={styles.loader}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={2}>
                Loading...
              </Text>
            </View>
          </>
        ) : (
          <>
            <Image
              source={{ uri: imageUrl }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {title}
              </Text>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 160,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#2563eb",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: "100%",
    height: 200,
    backgroundColor: "#f3f4f6",
  },
  titleContainer: {
    padding: 8,
    backgroundColor: "#3b82f6",
  },
  title: {
    color: "#fff",
    fontSize: 10,
    fontFamily: "PressStart2P",
    textAlign: "center",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
});
