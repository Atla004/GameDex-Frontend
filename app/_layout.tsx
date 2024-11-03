import { Stack } from "expo-router";

export const unstable_settings = {
  // Ensure any route can link back to `/`

  auth: { 
    initialRouteName: "Login", 
  },

};

export default function Layout() {
  return (
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(authScreen)" /> 
        <Stack.Screen name="(mainInterface)"/>
      </Stack>
  );
}
