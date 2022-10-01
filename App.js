import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase/app'
import Constants from 'expo-constants'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import rootReducer from './src/redux/reducers'
import AuthScreen from './src/screens/auth';
import { useState } from 'react';
import Route from './src/navigation/main';
import { QueryClient, QueryClientProvider } from 'react-query';

const store = createStore(rootReducer, applyMiddleware(thunk))

const firebaseConfig = {
  apiKey: "AIzaSyBf2IMJLaxKNY-IpGrsW6HfUYv4dKXG830",
  authDomain: "tiktok-clone-49120.firebaseapp.com",
  databaseURL: "https://tiktok-clone-49120-default-rtdb.firebaseio.com",
  projectId: "tiktok-clone-49120",
  storageBucket: "tiktok-clone-49120.appspot.com",
  messagingSenderId: "738467918704",
  appId: "1:738467918704:web:c536449ec0091803a0d5b5",
  measurementId: "G-H67S33YPT4"
};

let app = firebase.initializeApp(firebaseConfig)

const queryClient = new QueryClient({
  defaultOptions: {queries: {refetchInterval: false, staleTime: Infinity}}
})

export default function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Route />
      </QueryClientProvider>

    </Provider>
  );
}

export { app }

