import { Stack } from "expo-router";
import { StatusBar } from "react-native";

import { View } from "react-native";

export default function Layout() {
  console.log("layoutsss");
  return (
    <View style={{ flex: 1, paddingTop: StatusBar.currentHeight }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="GameScreen"
      >
        <Stack.Screen name="GameScreen"/>
        <Stack.Screen name="CommentScreen"/>
      </Stack>
    </View>
  );
}
