import { useFonts } from "expo-font";

export function fontsload(): boolean {

  const [fontsLoaded] = useFonts({
    "PressStart2P": require("@/assets/fonts/PressStart2P-Regular.ttf"),
    "PokemonSolid": require("@/assets/fonts/pokemonsolid.ttf"),
  });

  return  fontsLoaded;
}
