import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import ProgressCircle from "@/components/basic/ProgressCircle";

interface PosterProps {
  imageUrl: string;
  title: string;
  rating1: number;
  rating2: number;
}

const Poster: React.FC<PosterProps> = ({
  imageUrl,
  title,
  rating1,
  rating2,
}) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title}>{title}</Text>
      {/*       <View style={styles.ratingsContainer}>
        <ProgressCircle style={styles.progressCircle} progress={rating1 / 100} />
        <ProgressCircle style={styles.progressCircle} progress={rating2 / 100} />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  ratingsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  progressCircle: {
    height: 50,
    width: 50,
  },
});

export default Poster;
