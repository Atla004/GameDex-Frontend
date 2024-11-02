import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";

interface PosterProps {
  imageUrl: string;
  title: string;
}

export const Poster: React.FC<PosterProps> = ({ imageUrl, title }) => {
  return (
    <View style={styles.container}>
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
    </View>
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
});
