import { Tabs } from "expo-router";
import { StyleSheet, View, Image } from "react-native";

export default function Layout() {
  return (
    <View style={styles.tabsContainer}>
      <Tabs
        screenOptions={({ route }) => ({
          sceneStyle: { backgroundColor: "transparent" },
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="MatchScreen"
          options={{
            title: "Match",
          }}
        />
                <Tabs.Screen
          name="ChatScreen"
          options={{
            title: "Chat",
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            title: "Profile",
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabsContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});
