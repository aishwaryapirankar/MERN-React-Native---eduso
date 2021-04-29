import React, {useState, useRef, useEffect} from 'react'
import { ImageBackground,ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Alert, Dimensions, StatusBar, Platform} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import AsyncStorage from '@react-native-community/async-storage';

import Axios from 'axios';
const BASE_URL = 'http://10.0.2.2:3012';

function Feed() {

  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [subject, setSubject] = useState("General");
  const [postID, setPostID] = useState("");

  const buttonRefs = useRef([]);
  buttonRefs.current = [];

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`${BASE_URL}/users/me/feed`, {
        headers: { 'Authorization': await AsyncStorage.getItem("SavedToken") },
      });
      setData(res.data);
      console.log(res.data);
    };
    fetchData();
  }, []);

  const onFilterData = async () => {
    const res = await Axios.get(`${BASE_URL}/users/me/feed/search`, {
      headers: { 'Authorization': await AsyncStorage.getItem("SavedToken") },
      params: { 'subject': subject },
    });
    setFilteredData(res.data);
  };

  const saved = async (postID) => {
    const dataToSend = {
      post_id: postID,
    };

      try {
        const res = await Axios.post(
          `${BASE_URL}/users/me/addToFavorite`,
          dataToSend,
          {
            headers: { 'Authorization': await AsyncStorage.getItem("SavedToken") },
          }
        );
        console.log(res);
        alert('Saved!')
      } catch (error) {
        alert(error);
      }
  };

  const helpful = async (postID) => {
    const dataToSend = {
      post_id: postID,
    };

      try {
        const res = await Axios.post(
          `${BASE_URL}/users/me/helpful`,
          dataToSend,
          {
            headers: { 'Authorization': await AsyncStorage.getItem("SavedToken") },
          }
        );
        console.log(res);
        alert('Helpful!')
      } catch (error) {
        alert(error);
      }
  };

  const report = async (postID) => {
    const dataToSend = {
      post_id: postID,
    };

      try {
        const res = await Axios.post(
          `${BASE_URL}/users/me/report`,
          dataToSend,
          {
            headers: { 'Authorization': await AsyncStorage.getItem("SavedToken") },
          }
        );
        console.log(res);
        alert('Reported!')
      } catch (error) {
        alert(error);
      }
  };

  const handleFilterToggle = () => {
    setIsFilterOn(true);
    onFilterData();
  };

    return (
        <ScrollView style={{backgroundColor: 'black'}}>
        <View style={styles.container}>
          <View style={styles.filterarea}>
            <View style={styles.picker}>
              <Picker style={styles.picker} selectedValue={subject} onValueChange={(subject) => setSubject(subject)}>
                <Picker.Item label="Choose Subject - General" value="General" />
                <Picker.Item label="Linguistic" value="Linguistic" />
                <Picker.Item label="Mathematics" value="Mathematics" />
                <Picker.Item label="Science" value="Science" />
                <Picker.Item label="History" value="History" />
                <Picker.Item label="Geography" value="Geography" />
                <Picker.Item label="Astronomy" value="Astronomy" />
                <Picker.Item label="Politics" value="Politics" />
                <Picker.Item label="Arts" value="Arts" />
                <Picker.Item label="Music" value="Music" />
                <Picker.Item label="Technology" value="Technology" />
                <Picker.Item label="Environmental Studies" value="Environmental Studies" />
                <Picker.Item label="Finance" value="Finance" />
                <Picker.Item label="Commerce" value="Commerce" />
              </Picker>
            </View>
            <View style={styles.filter}>
            <Icon.Button
                  name='filter'
                  backgroundColor='#EDC31D'
                  style={styles.icons}
                  color='black'
                  onPress={handleFilterToggle}>
                  Filter
            </Icon.Button>
            </View>
          </View>

          {isFilterOn ? (
            <View  >
              {filteredData.map((item, index) => {
              return (
              <View key={item._id} style={styles.modal}>
              <Text style={styles.boldtext}>Subject: {item.subject}</Text>
              <Text style={styles.text}>{item.content}</Text>
              <View style={styles.buttons}>
                <Icon.Button
                  name='check-circle'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => helpful(item._id)}>
                  Helpful
                </Icon.Button>
                <Icon.Button
                  name='save'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => saved(item._id)}>
                  Save
                </Icon.Button>
                <Icon.Button
                  name='bullhorn'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => report(item._id)}>
                  Report
                </Icon.Button>
              </View>
              </View>);
              })}
            </View>
        ):(
          <View  >
            <>
            {data.map((item, index) => {
              return (
                <View key={item._id} style={styles.modal} >
              <Text style={styles.boldtext}>Subject: {item.subject}</Text>
              <Text style={styles.text}>{item.content}</Text>
              <View style={styles.buttons}>
                <Icon.Button
                  name='check-circle'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => helpful(item._id)}>
                  Helpful
                </Icon.Button>
                <Icon.Button
                  name='save'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => saved(item._id)}>
                  Save
                </Icon.Button>
                <Icon.Button
                  name='bullhorn'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => report(item._id)}>
                  Report
                </Icon.Button>
              </View>
                </View>
              )})}
            </>
          </View>

        )}
        </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      paddingTop: 40,
      flex: 1,
      flexDirection: "column",
      fontFamily: 'Montserrat',
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
    },
    filter: {
      paddingTop: 10,
      height: 60,
      borderRadius: 10,
    },
    filterarea: {
      width: 360,
      flexDirection: 'row',
      alignItems: 'stretch',
      justifyContent: 'space-evenly'
    },
    scroll: {
      backgroundColor: 'transparent'
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
    picker: {
      width: 250,
      height: 60,
      backgroundColor: '#222222',
      color: '#EDC31D',
      borderRadius: 10,
      paddingBottom: 30,
      fontSize: 5,
    },
    buttons: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      paddingBottom: 10,
    },
    icons: {
      margin: 2,
      color: '#EDC31D',
    }
  });

export default Feed
