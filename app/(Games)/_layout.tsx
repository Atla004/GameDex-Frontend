import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

import { View } from "react-native";

export default function Layout() {

  return (
    <View style={{ flex: 1}}>
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
