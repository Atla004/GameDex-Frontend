import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "GameScreen",

  authScreen: { 
    initialRouteName: "LoginScreen", 
  },
  mainInterface: { 
    initialRouteName: "HomeScreen", 
  },

};

export default function Layout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="GameScreen"/>
        <Stack.Screen name="(authScreen)" /> 
        <Stack.Screen name="(mainInterface)"/>
      </Stack>
  );
}
