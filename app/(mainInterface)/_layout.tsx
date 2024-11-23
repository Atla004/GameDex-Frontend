
import { Tabs } from "expo-router";
import { StyleSheet, Text, View, Image } from "react-native";

export default function Layout() {


  return (
    <View
      style={styles.tabsContainer}
    >
      <Tabs
        screenOptions={({ route }) => ({
          sceneStyle: { backgroundColor: "transparent" },
          headerShown: false,
        })}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('@/assets/tabsIcon/home.png')}
                style={{ width: 24, height: 24}}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="SearchScreen"
          options={{
            title: "Search",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('@/assets/tabsIcon/search.png')}
                style={{ width: 24, height: 24}}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('@/assets/tabsIcon/profile.png')}
                style={{ width: 24, height: 24}}
              />
            ),
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
