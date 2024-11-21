import { useFontsLoad } from "@/utils/fontsload";
import { Tabs } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import HolographicScreen from "@/components/Anuevos/HolographicScreen";

export default function Layout() {
  const loading = useFontsLoad();
  if (!loading) {
    return (
      <View style={styles.loadingContainer}>
      </View>
    );
  }

  return (
    <View style={[styles.tabsContainer,{paddingTop: StatusBar.currentHeight }]}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';
            if (route.name === 'HomeScreen') {
              iconName = 'home';
            } else if (route.name === 'SearchScreen') {
              iconName = 'search';
            } else if (route.name === 'FavoritesScreen') {
              iconName = 'heart';
            } else if (route.name === 'ProfileScreen') {
              iconName = 'person';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            title: "Home",
          }}
        />
        <Tabs.Screen
          name="SearchScreen"
          options={{
            title: "Search",
          }}
        />
        <Tabs.Screen
          name="FavoritesScreen"
          options={{
            title: "Favorites",
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
  loadingContainer: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    color: 'white',
  },
});
