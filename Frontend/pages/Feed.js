import React from 'react'
import { ImageBackground,ScrollView, StyleSheet, Text, View, Button, TouchableOpacity, Alert} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/FontAwesome'; 

function Feed() {
    return (
        <ScrollView style={{backgroundColor: 'black'}}>
        <View style={styles.container}>
            {/* <Text style={styles.text}>This is Feed</Text> */}
            <View style={styles.picker}>
              <Picker style={styles.picker}>
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
            <View style={styles.modal}>
              <Text style={styles.boldtext}>User Name</Text>
              <Text style={styles.text}>Me in 2020: life is chill, writing songs based in fiction to avoid drama, feeling pretty grown up My 2008 music from the vault, in a goblin voice: “REELEEEEEEASE MR PERFECTLY FIIIIIIINE” Me in 2020: life is chill, writing songs based in fiction to avoid drama, feeling pretty grown up My 2008 music from the vault, in a goblin voice: “REELEEEEEEASE MR PERFECTLY FIIIIIIINE”</Text>
              <View style={styles.buttons}>
                <Icon.Button
                  name='check-circle'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => alert('Helpful!')}>
                  Helpful
                </Icon.Button>
                <Icon.Button
                  name='save'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => alert('Saved!')}>
                  Save
                </Icon.Button>
                <Icon.Button
                  name='bullhorn'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => alert('Reported!')}>
                  Report
                </Icon.Button>
              </View>
            </View>
            <View style={styles.modal}>
              <Text style={styles.boldtext}>User Name</Text>
              <Text style={styles.text}>“REELEEEEEEASE MR PERFECTLY FIIIIIIINE” </Text>
              <View style={styles.buttons}>
                <Icon.Button
                  name='check-circle'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => alert('Helpful!')}>
                  Helpful
                </Icon.Button>
                <Icon.Button
                  name='save'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => alert('Saved!')}>
                  Save
                </Icon.Button>
                <Icon.Button
                  name='bullhorn'
                  backgroundColor='black'
                  style={styles.icons}
                  color='#EDC31D'
                  onPress={() => alert('Reported!')}>
                  Report
                </Icon.Button>
              </View>
            </View>
            {/* <View style={styles.modal}></View>
            <View style={styles.modal}></View>
            <View style={styles.modal}></View> */}
          </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
      paddingTop: 20,
      flex: 1,
      flexDirection: "column",
      fontFamily: 'Montserrat',
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
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
      width: 360,
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
