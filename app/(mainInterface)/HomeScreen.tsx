import React, { useEffect, useLayoutEffect, useState } from 'react';
import { fontsload } from '@/utils/fontsload';
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native';
import { GameSection } from '@/components/GameSection';
import { GameCard } from '@/components/GameCard';
import {RatingGameCard} from '@/components/RatingGameCard';
import { RotatingPokeball } from '@/components/wraper/RotatingPokeball';
import SearchBar from '@/components/basic/SearchBar';
import { Game } from '@/types/main';



const HomeScreen = () => {
  const fontsLoaded =  fontsload();



  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [topRatedGames, setTopRatedGames] = useState<Game[]>([]);



  useLayoutEffect(() => {
    console.log("fetching data");
    fetchFeaturedGames();
    fetchTopRatedGames();
  }, []);


  if(fontsLoaded){

    return (
      <View style={{ flex: 1 }}>
      <View style={styles.background}>
      <RotatingPokeball />
      </View>
      <ScrollView style={styles.container}>
        <SearchBar />
        <GameCard
          imageUrl="https://imgs.search.brave.com/QJtBG5Bm18bBt3Wn9ozEaCHy4ORDbka_Ua0PiPwlem8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXM3Lm1lbWVkcm9p/ZC5jb20vaW1hZ2Vz/L1VQTE9BREVENDkw/LzY1MTI5MDRjMGJj/Y2MuanBlZw"
          title="Pokémon Scarlet & Violet"
          description="Albion Online es un MMORPG no lineal en el que escribes tu propia historia sin limitarte a seguir un camino prefijado, explora un amplio mundo abierto con cinco biomas únicos, todo cuanto hagas tendrá su repercusión en el mundo, con su economía orientada al jugador de Albion los jugadores crean prácticamente todo el equipo a partir de los recursos que consiguen, el equipo que llevas define quien eres, cambia de arma y armadura para pasar de caballero a mago o juego como una mezcla de ambas clases, aventúrate en el mundo abierto y haz frente a los habitantes y las criaturas de Albion, inicia expediciones o adéntrate en mazmorras en las que encontraras enemigos aun mas difíciles, enfréntate a otros jugadores en encuentros en el mundo abierto, lucha por los territorios o por ciudades enteras en batallas tácticas, relájate en tu isla privada donde podrás construir un hogar, cultivar cosechas, criar animales, únete a un gremio, todo es mejor cuando se trabaja en grupo. Adéntrate ya en el mundo de Albion y escribe tu propia historia."
        />

        <GameSection
          title="Featured Games"
          games={featuredGames}
        />


        <View style={styles.topRatedSection}>
          <View style={styles.topRatedHeader}>
            <Image
              source={{ uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png' }}
              style={styles.headerPokeball}
              />
            <Text style={styles.topRatedTitle}>Top Rated Games</Text>
          </View>
          {topRatedGames.map((game) => (
            <RatingGameCard
            key={game.ranking}
            {...game}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  )}else{
    return <Text>cargando...</Text>;
  }
  
  
  function fetchFeaturedGames() {
    fetch("http://10.195.134.120:8000/featuredGames.json") 
    .then((response) => {
      return response.json()
      }
      )
      .then((data) => {
        setFeaturedGames(data.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching featured games:", error));
  }

  function fetchTopRatedGames() {
    fetch("http://10.195.134.120:8000/topRatedGames.json") 
      .then((response) =>{
        console.log(response)
        return response.json()
      })
      .then((data) => {
        setTopRatedGames(data.slice(0, 5));
      })
      .catch((error) => console.error("Error fetching top rated games:", error));
  }
};
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRatedSection: {
    marginTop: 16,
    paddingBottom: 16,
  },
  topRatedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 25,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  headerPokeball: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  topRatedTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});


