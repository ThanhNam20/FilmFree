import React, { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { store } from "./store/store";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { APP_CLIENT_ID } from "@env";
import { StatusBar } from 'expo-status-bar';
GoogleSignin.configure({
  webClientId: APP_CLIENT_ID,
});

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation colorScheme={"dark"} />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  );
}
