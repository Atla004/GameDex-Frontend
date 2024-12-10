import React, { createContext, useState, useContext } from 'react';
import { Slot } from 'expo-router';
import PokedexFrame from '../../components/wrapper/PokedexFrame';

const PokedexContext = createContext({
  isTransitioning: true,
  openPokedex: () => {},
  closePokedex: () => {}
});

export const usePokedex = () => useContext(PokedexContext);

const Layout = () => {
  const [isTransitioning, setIsTransitioning] = useState(true);

  const openPokedex = () =>{
    console.log("openPokedex");
    console.log("isTransitioningggg", isTransitioning);
    setIsTransitioning(false);

  } 
  const closePokedex = () => 
    {
      console.log("closePokedex");
      setIsTransitioning(true);
    }
    

  return (
    <PokedexContext.Provider value={{ isTransitioning, openPokedex, closePokedex }}>
      <PokedexFrame isTransitioning={isTransitioning}>
        <Slot />
      </PokedexFrame>
    </PokedexContext.Provider>
  );
};

export default Layout;
