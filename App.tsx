import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from "react-redux";
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { store } from './store/store';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { APP_CLIENT_ID } from '@env';

GoogleSignin.configure({
  webClientId: APP_CLIENT_ID
});


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
      <SafeAreaProvider >
        <Navigation colorScheme={'dark'} />
        <StatusBar />
      </SafeAreaProvider>
      </Provider>

    );
  }
}
