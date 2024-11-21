import HolographicScreen from "@/components/Anuevos/HolographicScreen";
import { Slot } from "expo-router";
import { useEffect } from "react";

export const unstable_settings = {

};

export default function Layout() {
  return (

    <HolographicScreen >
    <Slot
      screenOptions={{
        headerShown: false,
      }}
    />
    </HolographicScreen>
  );
}
