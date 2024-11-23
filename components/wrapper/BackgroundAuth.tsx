import React from "react";
import { View, StyleSheet } from "react-native";

interface BackgroundAuthProps {
  children: React.ReactNode;
}

const BackgroundAuth = ({ children }: BackgroundAuthProps) => {
  return <View style={styles.content}>{children}</View>;
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#ef4444",
    justifyContent: 'center', // Center children vertically
  },
});

export default BackgroundAuth;
