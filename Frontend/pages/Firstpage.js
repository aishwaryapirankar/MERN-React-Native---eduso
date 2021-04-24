import React from "react";
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Firstpage = ({ navigation }) => (
  <View style = {styles.container}>
    <ImageBackground source={require('../images/background.png')} style={styles.image}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Register')}
        >
        <Text style={styles.text}>CREATE ACCOUNT</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('Login')}
        >
        <Text style={styles.login_text}>LOGIN</Text>
        </TouchableOpacity>
    </ImageBackground>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    fontFamily: 'Montserrat'
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  text: {
    color: "#F8CE25",
    fontSize: 12,
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 10,
    marginTop: 350
  },
  login: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    marginLeft: 50,
    marginRight: 50,
  },
  login_text: {
    color: "black",
    fontSize: 12,
    textAlign: "center",
  },
});

export default Firstpage;