import HolographicScreen from "@/components/Anuevos/HolographicScreen";
import Toast from "@/components/basic/Toast";
import { Slot } from "expo-router";
import { createContext, useContext, useState } from "react";
import { useFontsLoad } from "@/utils/fontsload";
import { StyleSheet, View } from "react-native";


const ToastContext = createContext({
  message: '',
  visible: false,
  duration: 3000,
  setToast: (message: string, visible: boolean, duration?: number) => {}
});

export const useToast = () => useContext(ToastContext);


export default function Layout() {
  const [toast, setToastState] = useState({ message: '', visible: false, duration: 3000 });




  const setToast = (message: string, visible: boolean, duration: number = 3000) => {
    setToastState({ message, visible, duration });
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
          <Toast message={toast.message} visible={toast.visible} duration={toast.duration} setToast={() => setToast('', false)} />
            
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