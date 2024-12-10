import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface PersonCardProps {
  name: string;
  imageUrl: string;
}

export function PersonCard({
  name = "loading",
  imageUrl = "https://example.com/placeholder.jpg",
}: PersonCardProps) {
  return (
    <View style={[styles.container]}>
      <Image
        source={{ uri: imageUrl }}
        style={{ flex: 1 }}
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={{ fontSize: 24, color: "white" }}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 400,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "white",
  },
  info: {
    padding: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
