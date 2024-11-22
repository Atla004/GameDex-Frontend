import HolographicScreen from "@/components/Anuevos/HolographicScreen";
import Toast from "@/components/basic/Toast";
import { Slot } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useFontsLoad } from "@/utils/fontsload";
import { StyleSheet, View } from "react-native";
import { red } from "react-native-reanimated/lib/typescript/Colors";


const ToastContext = createContext({
  message: '',
  visible: false,
  duration: 3000,
  color: 'red',
  setToast: (message: string, visible: boolean, duration?: number) => {}
});

export const useToast = () => useContext(ToastContext);


export default function Layout() {
  const [toast, setToastState] = useState({ message: '', visible: false, duration: 3000, color: 'red' });




  const setToast = (message: string, visible: boolean, duration: number = 3000,color: string= "red") => {
    setToastState({ message, visible, duration,color });
  };


  const loading = useFontsLoad();
  if (!loading) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (

    <HolographicScreen >
            <ToastContext.Provider value={{ ...toast, setToast }}>

    <Slot
      screenOptions={{
        headerShown: false,
      }}
      />
          <Toast message={toast.message} visible={toast.visible} duration={toast.duration} color={toast.color} setToast={() => setToast('', false)} />
            
      </ToastContext.Provider>
    </HolographicScreen>
  );
}



const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  tabsContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
});