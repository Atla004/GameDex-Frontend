import { View, Image, Text, StyleSheet, ImageStyle } from "react-native";

interface PokeBallRatingProps {
  score: number;
  type: "critic" | "user";
  size?: "normal" | "large";
}

export const GameCardRating: React.FC<PokeBallRatingProps> = ({
  score,
  type,
  size = "normal",
}) => {
  const getRatingColor = (score: number) => {
    return 'hsl(' + (score) + ', 100%, 50%)';
  };

  const getStyles = (size: "normal" | "large") => ({
    container: {
      ...styles.container,
      padding: size === "large" ? 8 : 4,
    },
    pokeballContainer: {
      position: "relative" as "relative",
      width: size === "large" ? 80 : 40,
      height: size === "large" ? 40 : 20,
      justifyContent: "center" as "center",
      alignItems: "center" as "center",
    },
    pokeball: {
      width: size === "large" ? 75 : 50,
      height: size === "large" ? 75 : 50,
      resizeMode: "contain",
    } as ImageStyle,
    score: {
      ...styles.score,
      fontSize: size === "large" ? 30 : 20,
      position: "absolute" as "absolute",
      textAlign: "center" as "center",
      textShadowColor: "#000",
      textShadowOffset: { width: -2, height: 2 }, 
      textShadowRadius: 2, // Adjusted for thicker outline
    },
  });

  const sizeStyles = getStyles(size);

  return (
    <View style={sizeStyles.container}>
      <View style={sizeStyles.pokeballContainer}>
        <Image
          source={
            type === "critic"
              ? require("@/assets/background/Boulder.png")
              : require("@/assets/background/Sun.png")
          }
          style={sizeStyles.pokeball}
        />
        <Text style={[sizeStyles.score, { color: getRatingColor(score) }]}>
          {score}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 12,
  },
  score: {
    fontWeight: "bold",
    textShadowColor: "#000",
    textShadowOffset: { width: -2, height: 2 }, // Added for thicker outline
    textShadowRadius: 2, // Added for thicker outline
  },
});
