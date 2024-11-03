import { useFonts } from "expo-font";
import { useState, useEffect } from "react";

export function useFontsLoad(): boolean { // Renombrado a useFontsLoad
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const [loaded] = useFonts({
    "PressStart2P": require("@/assets/fonts/PressStart2P-Regular.ttf"),
    "PokemonSolid": require("@/assets/fonts/pokemonsolid.ttf"),
  });

  useEffect(() => {
    console.log(loaded);
    if (loaded) {
      setFontsLoaded(true);
    }
  }, [loaded]);

  return fontsLoaded;
}
