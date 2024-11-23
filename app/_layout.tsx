import HolographicScreen from "@/components/Anuevos/HolographicScreen";
import Toast from "@/components/basic/Toast";
import { Slot } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";
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

interface User {
  username: string | null;
  _id: string | null;
  email: string | null;
  token: string | null;
}

const userDataContext = createContext<{
  username: string | null;
  _id: string | null;
  email: string | null;
  token: string | null;
  setUser: (user: User) => void;
}>({
  username: null,
  _id: null,
  email: null,
  token: null,
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

  const [userData, setUserData] = useState<User>({
    username: null,
    _id: null,
    email: null,
    token: null,
  });

  const setUser = ({ username, _id, email, token }: User) => {
    setUserData({ username, _id, email, token });
  };

  const setToast = (
    message: string,
    visible: boolean,
    duration: number = 3000,
    color: string = "red"
  ) => {
    setToastState({ message, visible, duration, color });
  };

  const setLoading = (isLoading: boolean) => {
    setLoadingScreen(isLoading);
  };

  useEffect(() => {
    console.log("userData se cambio", userData);
  }, [userData]);


  const loading = useFontsLoad();
  if (!loading) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    <HolographicScreen>
      <ToastContext.Provider value={{ ...toast, setToast }}>
        <LoadingScreenContext.Provider
          value={{ isLoading: LoadingScreenBool, setLoading }}
        >
          <userDataContext.Provider value={{ ...userData, setUser }}>
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
