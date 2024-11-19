import { Stack } from "expo-router";
import PokedexFrame from "@/components/wraper/PokedexFrame";
import { useEffect, useState } from "react";

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
