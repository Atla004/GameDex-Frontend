import React from 'react';
import { Text, StyleSheet, ScrollView, View, Image } from 'react-native';
import { useFonts } from "expo-font";
import { GameSection } from '@/components/GameSection';
import { GameCard } from '@/components/GameCard';
import {RatingGameCard} from '@/components/RatingGameCard';
import { RotatingPokeball } from '@/components/wraper/RotatingPokeball';
import SearchBar from '@/components/basic/SearchBar';


const featuredGames = [
  {
    id: '1',
    imageUrl: 'https://imgs.search.brave.com/86gfMNpIn-oiySbWU0ZUjX0arY9QpIdDa_OMVol2pc8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5tb2RkYi5jb20v/Y2FjaGUvaW1hZ2Vz/L2Rvd25sb2Fkcy8x/LzI2My8yNjIwOTkv/dGh1bWJfNjIweDIw/MDAvdXR5dGh1bWIz/LnBuZw',
    title: 'Undertale Yellow',
  },
  {
    id: '2',
    imageUrl: 'https://imgs.search.brave.com/yF92W4PR1s0razYnAYG3Um1wtRQtCGM6A43OzG1-44o/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS52YW5kYWwubmV0/L3QyMDAvMjU2NjQv/Y2hlc3MtMi10aGUt/c2VxdWVsLTIwMTQ4/MjAxMDExMzZfMS5q/cGc',
    title: 'Pokémon Legends',
  },
  {
    id: '3',
    imageUrl: 'https://imgs.search.brave.com/RvEVXG65MNylHz7vUw7dyQkYMKPBFI3MGngdWve_tAU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLmRhaWx5ZG90/LmNvbS8yMDI0LzEw/L3YwUHhBQ2tBLWpv/bmtsZXItbWVtZS5w/bmc_cT02NSZhdXRv/PWZvcm1hdCZ3PTE2/MDAmYXI9MjoxJmZp/dD1jcm9w',
    title: 'Pokémon Sword & Shield',
  },
  {
    id: '4',
    imageUrl: 'https://imgs.search.brave.com/RvEVXG65MNylHz7vUw7dyQkYMKPBFI3MGngdWve_tAU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLmRhaWx5ZG90/LmNvbS8yMDI0LzEw/L3YwUHhBQ2tBLWpv/bmtsZXItbWVtZS5w/bmc_cT02NSZhdXRv/PWZvcm1hdCZ3PTE2/MDAmYXI9MjoxJmZp/dD1jcm9w',
    title: 'the jonkler',
  }
];

const upcomingGames = [
  {
    id: '6',
    imageUrl: 'https://imgs.search.brave.com/GLSGvHBmPihmvZYkjykPcheADDJQhqZw8ICqn6stT7k/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMwLmdhbWVyYW50/aW1hZ2VzLmNvbS93/b3JkcHJlc3Mvd3At/Y29udGVudC91cGxv/YWRzLzIwMjIvMDkv/SE9MTE9XLUtOSUdI/VC1TSUxLU09ORy5q/cGc',
    title: 'sILKSONG',
  },
];
const topRatedGames = [
  {
    ranking: 1,
    imageUrl: 'https://imgs.search.brave.com/-MLjhmNTK1jD7bULGNvSQcGDB1bqIbHdu2Ywp8s76YE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMubmludGVuZG8u/Y29tL2ltYWdlL3Vw/bG9hZC9mX2F1dG8v/cV9hdXRvL2Rwcl8x/LjUvbmNvbS9lbl9V/Uy9nYW1lcy9zd2l0/Y2gvby9vcmktYW5k/LXRoZS1ibGluZC1m/b3Jlc3QtZGVmaW5p/dGl2ZS1lZGl0aW9u/LXN3aXRjaC9kZXNj/cmlwdGlvbi1pbWFn/ZQ.jpeg',
    title: 'Ori and the Blind Forest: Definitive Edition (Best Game)',
    description: 'The forest of Nibel is dying. After a powerful storm sets a series of devastating events in motion, an unlikely hero must journey to find his courage and confront a dark nemesis to save his home. Ori and the Blind Forest tells the tale of a young orphan destined for heroics',
    criticScore: 100,
    userScore: 99,
  },
  {
    ranking: 2,
    imageUrl: 'https://imgs.search.brave.com/k_ndNQZ_mN2TmIMSH11JPWHd1t0ZYt6DRyWtXyB1fy0/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpXWmtaVEZo/WW1JdE16QXhaQzAw/TlRZeUxUazNNVGt0/TkdReE1Ua3dPVFpr/WmpkalhrRXlYa0Zx/Y0djQC5qcGc',
    title: 'Ori and the Will of the Wisps (I need to complete this game)',
    description: 'The little spirit Ori is no stranger to peril, but when a fateful flight puts the owlet Ku in harm’s way, it will take more than bravery to bring a family back together, heal a broken land, and discover Ori’s true destiny.',
    criticScore: 99,
    userScore: 100,
  },
  {
    ranking: 3,
    imageUrl: 'https://imgs.search.brave.com/RvEVXG65MNylHz7vUw7dyQkYMKPBFI3MGngdWve_tAU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWRzLmRhaWx5ZG90/LmNvbS8yMDI0LzEw/L3YwUHhBQ2tBLWpv/bmtsZXItbWVtZS5w/bmc_cT02NSZhdXRv/PWZvcm1hdCZ3PTE2/MDAmYXI9MjoxJmZp/dD1jcm9w',
    title: 'Querida trixie',
    description: 'En vez de ir al gran baile escolar con alguien guapo y popular porque no vas conmigo, timmy turner , el menos guapo y popular que conoces, comparame y veras la buena pareja que haremos tu y yo. Querida Trixie tenemos a tus padres, si quieres volver a verlos pues...y tu cabello que es mucho mas reluciente que el de mi mama y tus ojos resplandecientes e inteligentes estanques vivos de luz y amor meloso meloso romanticon amoroso. Di que si y devolveré ilesos a tus padres. Mi amor por ti quema como mil soles.Con amor, timmy turner "',
    criticScore: 50,
    userScore: 30,
  },
];

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    "PressStart2P": require("@/assets/fonts/PressStart2P-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;
  }

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

        <GameSection
          title="Upcoming Releases"
          games={upcomingGames}
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
  );
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