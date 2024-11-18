import { Stack } from "expo-router";

export const unstable_settings = {
  games: {
    initialRouteName: "GameScreen",
  },
  authScreen: {
    initialRouteName: "LoginScreen",
  },
  mainInterface: {
    initialRouteName: "HomeScreen",
  },
};

export default function Layout() {
  console.log("layout");
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="(mainInterface)"
    >
      <Stack.Screen name="(mainInterface)" />
      <Stack.Screen name="(authScreen)" />
      <Stack.Screen name="(games)" />
      <Stack.Screen name="index" />
    </Stack>
  );
}
