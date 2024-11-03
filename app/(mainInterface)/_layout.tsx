import {  useFontsLoad } from '@/utils/fontsload';
import { RotatingPokeball } from '@/components/wraper/RotatingPokeball';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export default function Layout() {
  const loading = useFontsLoad(); 
  if(!loading){
    return <Text > Loading... </Text>;
  }

  return (
    

      <Tabs
        screenOptions={{
          headerShown: false,
        }}
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
      </Tabs>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },

});


