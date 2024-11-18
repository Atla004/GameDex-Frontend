import { Stack } from "expo-router";
import PokedexFrame from "@/components/wraper/PokedexFrame";
import { useState } from "react";

export default function Layout() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlerChangeRoute = {
    transitionStart: () => {
      setIsTransitioning(true);
    },
    transitionEnd: () => {
      setIsTransitioning(false);
    },
  }

  console.log("Layout -> isTransitioning", isTransitioning)
  return (
    <PokedexFrame isTransitioning={isTransitioning}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="LoginScreen"
          listeners={handlerChangeRoute}
        />
        <Stack.Screen
          name="RegisterScreen"
          listeners={handlerChangeRoute}
        />
      </Stack>
    </PokedexFrame>
  );
}
