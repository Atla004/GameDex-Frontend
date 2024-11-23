import HolographicScreen from "@/components/Anuevos/HolographicScreen";
import Toast from "@/components/basic/Toast";
import { Slot } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useFontsLoad } from "@/utils/fontsload";
import { StyleSheet, View } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";
import { LoadingScreen } from "@/components/wrapper/LoadingScreen";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const ToastContext = createContext({
  message: "",
  visible: false,
  duration: 3000,
  color: "red",
  setToast: (
    message: string,
    visible: boolean,
    duration?: number,
    color?: string
  ) => {},
});

const LoadingScreenContext = createContext({
  isLoading: true,
  setLoading: (isLoading: boolean) => {},
});

const userDataContext = createContext<{ 
  user: string | null,
  setUser: (user: string) => void,
}>({
  user: null,
  setUser: () => {},
});

export const useLoadingScreen = () => useContext(LoadingScreenContext);
export const useUserData = () => useContext(userDataContext);
export const useToast = () => useContext(ToastContext);


export default function Layout() {
  const [toast, setToastState] = useState({
    message: "",
    visible: false,
    duration: 3000,
    color: "red",
  });

  const [LoadingScreenBool, setLoadingScreen] = useState(false);

  const [userData, setUserData] = useState<string |null>(null);

  const setUser = (user: string) => {
    setUserData(user);
  }


  
  
  const setToast = (
    message: string,
    visible: boolean,
    duration: number = 3000,
    color: string = "red"
  ) => {
    setToastState({ message, visible, duration, color });
  };

  const setLoading= (isLoading: boolean) => {
    setLoadingScreen(isLoading);
  }


  const loading = useFontsLoad();
  if (!loading) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    <HolographicScreen>
      <ToastContext.Provider value={{ ...toast, setToast }}>
      <LoadingScreenContext.Provider value={{ isLoading: LoadingScreenBool, setLoading }}>
      <userDataContext.Provider value={{ user: userData, setUser }}>  


        <LoadingScreen isLoading={LoadingScreenBool}>
        <Slot
          screenOptions={{
            headerShown: false,
          }}
        />
        <Toast
          message={toast.message}
          visible={toast.visible}
          duration={toast.duration}
          color={toast.color}
          setToast={() => setToast("", false)}
        />
        
        </LoadingScreen>
      </userDataContext.Provider>
        </LoadingScreenContext.Provider>
      </ToastContext.Provider>
    </HolographicScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  tabsContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
});
