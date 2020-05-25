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


import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Stack = createStackNavigator();
const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Cover" component={Cover} options={{headerShown: false}} />
        <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
        <Stack.Screen options={{headerShown: false}} name="Profile" component={Profile} />
        <Stack.Screen options={{headerShown: true}} name="Intro" component={Intro} />
        <Stack.Screen options={{headerShown: true}} name="Link" component={Link} />
        <Stack.Screen options={{headerShown: true}} name="List" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
