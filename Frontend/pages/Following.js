import React from 'react'
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';


function Following() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is Following</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      fontFamily: 'Montserrat',
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
    },
  });

export default Following
