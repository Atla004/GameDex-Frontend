import { Stack } from "expo-router";

export default function Layout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(authScreen)"
        />
        <Stack.Screen
          name="(accountScreen)"
        />
      </Stack>
  );
}
