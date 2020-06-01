/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Cover from './src/main_pages/Cover';
import Login from './src/main_pages/Login';
import Profile from './src/main_pages/Profile';
import Intro from './src/add_devices/Intro';
import Link from './src/add_devices/Link';
import List from './src/manage/List';
import Signup from './src/main_pages/Signup';
import firebase from 'react-native-firebase';


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  AsyncStorage
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

  checkPermission()
  createNotificationListeners()

  async function checkPermission() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
        getToken();
    } else {
        requestPermission();
    }
  }

  async function getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
            // user has a device token
            await AsyncStorage.setItem('fcmToken', fcmToken);
        }
    }
  }

  async function requestPermission() {
    try {
        await firebase.messaging().requestPermission();
        // User has authorised
        getToken();
    } catch (error) {
        // User has rejected permissions
        console.log('permission rejected');
    }
  }

  ////////////////////// Add these methods //////////////////////

  // //Remove listeners allocated in createNotificationListeners()

  // notificationListener();
  // notificationOpenedListener();

  /*
  * Triggered when a particular notification has been received in foreground
  * */
  firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      showAlert(title, body);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      showAlert(title, body);
  });

  async function createNotificationListeners() {


    /*
    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
    * */
    const notificationOpen = await firebase.notifications().getInitialNotification();
    if (notificationOpen) {
        const { title, body } = notificationOpen.notification;
        this.showAlert(title, body);
    }
    /*
    * Triggered for data only payload in foreground
    * */
    this.messageListener = firebase.messaging().onMessage((message) => {
      //process data message
      console.log(JSON.stringify(message));
    });
  }

  function showAlert(title, body) {
    Alert.alert(
      title, body,
      [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false },
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name="Cover" component={Cover} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
        <Stack.Screen options={{headerShown: true}} name="Intro" component={Intro} />
        <Stack.Screen options={{headerShown: true}} name="Link" component={Link} />
        <Stack.Screen options={{headerShown: true}} name="List" component={List} />
        <Stack.Screen options={{headerShown: true}} name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
