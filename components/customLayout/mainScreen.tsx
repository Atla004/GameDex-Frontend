import React from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';

const MainScreen = () => {
  return (
    <RotatingPokeball style={styles.pokeballContainer}>
      <Tabs
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tabs.Screen 
          name="HomeScreen" 
          options={{ title: "Home" }}
        />
        <Tabs.Screen 
          name="SearchScreen" 
          options={{ title: "Search" }}
        />
        <Tabs.Screen 
          name="FavoritesScreen" 
          options={{ title: "Favorites" }}
        />
      </Tabs>
    </RotatingPokeball>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  pokeballContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
