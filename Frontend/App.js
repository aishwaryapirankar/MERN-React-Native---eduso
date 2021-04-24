import React, {useEffect} from "react";
import 'react-native-gesture-handler';
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import {Provider} from 'react-redux';

import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import store from './redux/store';

import Login  from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed'
import Profile from './pages/Profile'
import BottomBar from './pages/BottomBar'
import EditProfile from './pages/EditProfile'

import Firstpage from './pages/Firstpage'

const Stack = createStackNavigator();

const App = () => {
    useEffect(() => {
    SplashScreen.hide();
  },[]);

  return(
    //<Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={Firstpage} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Feed" component={Feed} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="BottomBar" component={BottomBar} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    //</Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: "Montserrat-Light"
  }
});

export default App;
