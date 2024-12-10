import { Slot } from "expo-router";
import { StyleSheet, View } from "react-native";
import { useFontsLoad } from "../utils/fontsload";

import { LoadingScreen } from "../components/wrapper/LoadingScreen";
import { ProfileProvider } from '../context/ProfileContext';
import { ToastProvider } from '../context/ToastContext';
import { LoadingScreenProvider, useLoadingScreen } from '../context/LoadingScreenContext';
import { UserDataProvider } from '../context/UserDataContext';
import { useState } from "react";

export default function Layout() {
  const loading = useFontsLoad();
  const [toast, setToast] = useState({ message: "", visible: false, duration: undefined, color: undefined });
  const { isLoading  } = useLoadingScreen();
  console.log("valo de isLoading",isLoading);

  if (!loading) {
    return <View style={styles.loadingContainer}></View>;
  }

  return (
    
    <ProfileProvider>
      <ToastProvider>
        <LoadingScreenProvider>
          <UserDataProvider>
            <LoadingScreen isLoading={isLoading}>

              <Slot
                screenOptions={{
                  headerShown: false,
                }}
              />

            </LoadingScreen>
          </UserDataProvider>
        </LoadingScreenProvider>
      </ToastProvider>
    </ProfileProvider>
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
