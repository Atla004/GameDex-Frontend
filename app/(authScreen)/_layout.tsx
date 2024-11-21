import React, { createContext, useState, useContext } from 'react';
import { Slot } from 'expo-router';
import PokedexFrame from '../../components/wraper/PokedexFrame';

const PokedexContext = createContext({
  isTransitioning: false,
  openPokedex: () => {},
  closePokedex: () => {}
});

export const usePokedex = () => useContext(PokedexContext);

const Layout = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);

  const openPokedex = () => setIsTransitioning(true);
  const closePokedex = () => setIsTransitioning(false);

  return (
    <PokedexContext.Provider value={{ isTransitioning, openPokedex, closePokedex }}>
      <PokedexFrame isTransitioning={isTransitioning}>
        <Slot />
      </PokedexFrame>
    </PokedexContext.Provider>
  );
};

export default Layout;
