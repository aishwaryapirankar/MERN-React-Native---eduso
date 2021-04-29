import React, {useState, useEffect} from 'react'
import { ImageBackground, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';

import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const BASE_URL = 'http://10.0.2.2:3012';

function Following() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await Axios.get(`${BASE_URL}/users/me/SavedPost`, {
      headers: { 'Authorization': await AsyncStorage.getItem("SavedToken") },
    });
    setData(res.data.userFavPosts);

    //testing
    console.log(res.data.userFavPosts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <ScrollView style={{backgroundColor: 'black'}}>
        <View style={styles.container}>
          {data.map((item, index) => {
            return(
              <View key={item.post._id} style={styles.modal}>
                <Text style={styles.boldtext}>Subject: {item.post.subject}</Text>
                <Text style={styles.text}>{item.post.content}</Text>
              </View>
            )
          })}
        </View>
    </ScrollView>
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
    boldtext: {
      color: '#EDC31D',
      marginTop: 20,
      marginLeft: 20,
      marginRight: 20,
      fontWeight: 'bold'
    },
    text: {
      color: 'white',
      margin: 20,
      fontSize: 16
    },
    modal: {
      marginBottom: 20,
      padding: 10,
      fontFamily: 'Montserrat',
      //height: 250,
      width: 370,
      flex: 1,
      // justifyContent: 'flex-start',
      // alignItems: 'center',
      backgroundColor: '#222222',
      //zIndex: 2,
      margin: 10,
      //position: 'absolute',
      borderRadius: 50,
      shadowColor: "#222222",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      }
    },
  });

export default Following
