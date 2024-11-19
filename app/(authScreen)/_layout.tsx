import { Stack } from "expo-router";
import { useEffect } from "react";

export default function Layout() {

  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(accountScreen)"
        />
        <Stack.Screen
          name="(recoverScreen)"
        />
      </Stack>
  );
}
