
import { createContext, useContext, useState } from "react";

const LoadingScreenContext = createContext({
  isLoading: false,
  setLoading: (isLoading: boolean) => {},
});

export const LoadingScreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [LoadingScreenBool, setLoadingScreen] = useState(false);

  const setLoading = (isLoading: boolean) => {
    setLoadingScreen(isLoading);
  };

  return (
    <LoadingScreenContext.Provider value={{ isLoading: LoadingScreenBool, setLoading }}>
      {children}
    </LoadingScreenContext.Provider>
  );
};

export function useLoadingScreen() {
  const context = useContext(LoadingScreenContext);
  if (context === undefined) {
    throw new Error('useLoadingScreen must be used within a LoadingScreenProvider');
  }
  return context;
}