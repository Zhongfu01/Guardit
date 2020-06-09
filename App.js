/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import Cover from './src/main_pages/Cover';
import Login from './src/main_pages/Login';
import Profile from './src/main_pages/Profile';
import Intro from './src/add_devices/Intro';
import Link from './src/add_devices/Link';
import DeviceList from './src/manage/DeviceList';
import Signup from './src/main_pages/Signup';
import BluetoothConnect from './src/manage/BluetoothConnect';BluetoothList
import BluetoothList from './src/manage/BluetoothList';
import firebase from 'react-native-firebase';
import messaging, { AuthorizationStatus } from '@react-native-firebase/messaging';



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage,
  NativeEventEmitter,
  NativeModules,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const config = {
  apiKey: "AIzaSyAmWZAwAcnnqzdZwvf-sWuWhwNDF_nP_VY",
  authDomain: "guard-it-2a518.firebaseapp.com",
  databaseURL: "https://guard-it-2a518.firebaseio.com",
  storageBucket: "guard-it-2a518.appspot.com",
  messagingSenderId: "320044660659"
}

const Stack = createStackNavigator();
const App: () => React$Node = () => {

  // firebase.messaging().getToken()
  // .then(token => {
  //   console.log(token);
  // })


  request_user_permission()
  .then()
  .catch(() => {

  })

  firebase.notifications().onNotification((notification) => {
    firebase.notifications().displayNotification(notification);
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Cover" component={Cover} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
        <Stack.Screen options={{headerShown: true}} name="Intro" component={Intro} />
        <Stack.Screen options={{headerShown: true}} name="Link" component={Link} />
        <Stack.Screen options={{headerShown: true}} name="DeviceList" component={DeviceList} />
        <Stack.Screen options={{headerShown: true}} name="Signup" component={Signup} />
        <Stack.Screen options={{headerShown: true}} name="BluetoothConnect" component={BluetoothConnect} />
        <Stack.Screen options={{headerShown: true}} name="BluetoothList" component={BluetoothList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

async function request_user_permission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

export default App;
