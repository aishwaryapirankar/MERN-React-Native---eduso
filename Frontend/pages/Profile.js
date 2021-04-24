import React, {useEffect, props} from 'react'
import { ScrollView, Image, Dimensions, StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
const jwtDecode = require('jwt-decode');


function Profile({navigation}) {

    // const loadProfile = async () => {
    //   const token = await AsyncStorage.getItem('token');
    //   if(!token) {
    //       navigation.navigate('Login');
    //   }

    //   const decoded = jwtDecode(token);
    //   setFullName(decoded.fullName);
    //   setEmail(decoded.email);
    // }

    // const logout = () => {
    //     AsyncStorage.removeItem('token')
    //         .then(() => {
    //             navigation.replace('Home')
    //         })
    //         .catch(err => console.log(err));
    // }

    // useEffect(() => {
    //     loadProfile();
    // });  

    return (
      <ScrollView>
        <View  style={styles.container}>
          <View style={styles.header} />
        </View>
        <View style={styles.bg}>
          <View style={styles.modal} elevation={5}>
            <Image 
                style={{width: 150, height: 150, borderRadius: 150/2, margin: 10}}
                source={{
                  uri:'https://picsum.photos/200/300.jpg'
                }}/>
            <Text style={styles.username}>Aishwarya Pirankar</Text>
            <Text style={styles.qualification}>Developer</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}><Text style={styles.text}>EDIT</Text></TouchableOpacity>

            <Button
                title="Logout"
                color="#222222">
            </Button>
            
            
            

          </View>
          
        </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      fontFamily: 'Montserrat',
      backgroundColor: '#ffffff',
      flexDirection: 'column',
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      zIndex: 1,
    },
    bg: {
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
      position: 'absolute',
    },
    header: {
      backgroundColor: '#EDC31D',
      height: 300,
      width: Dimensions.get('window').width,
      zIndex: 1,
      padding: 10,
    },
    modal: {
      paddingBottom: 20,
      fontFamily: 'Montserrat',
      //height: 600,
      width: 350,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
      zIndex: 2,
      margin: 20,
      position: 'absolute',
      borderRadius: 50,
      shadowColor: "#222222",
      shadowOpacity: 0.8,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1
      }
    },
    postmodal: {
      paddingBottom: 20,
      fontFamily: 'Montserrat',
      //height: 600,
      width: 350,
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: 'white',
      zIndex: 2,
      margin: 20,
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
    text: {
      color: 'white',
      fontFamily: 'Montserrat',
    },
    username: {
      padding: 20,
      fontSize: 25,
    },
    button: {
      alignItems: 'center',
      backgroundColor: '#EDC31D',
      padding: 15,
      margin: 20,
      borderRadius: 10,
      width: 150,
    },
    username: {
      fontSize: 20,
    },
  });

export default Profile
