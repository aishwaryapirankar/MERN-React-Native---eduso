import React from 'react'
import { Image, StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import {Picker} from '@react-native-picker/picker';
import * as yup from 'yup';
import { Formik } from 'formik';

import { NavigationContainer } from '@react-navigation/native';
import { color } from 'react-native-reanimated';

const logo = require('../images/yellow-logo.png');
const name_icon = require('../images/name-icon.png');
const email_icon = require('../images/email-icon.png');
const password_icon = require('../images/password-icon.png')


function CreatePost({navigation}) {

  const register = () => {
    Alert.alert('Status','Posted!')
    navigation.navigate('Feed')
  }  

    return (
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <TextInput 
          style={styles.input}
          multiline
          placeholder="What do you want to share?" 
          placeholderTextColor="white">
        </TextInput>
        
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
        
        <TouchableOpacity style={styles.register} onPress={register}><Text style={styles.register_text}>CREATE</Text></TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: 'Montserrat',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  image: {
    height: 100,
    width: 100,
    margin: 20,
    padding: 20
  },
  input: {
    backgroundColor: '#222222',
    height: 100,
    width: 300,
    color: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  register: {
    alignItems: 'center',
    backgroundColor: '#EDC31D',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    width: 150,
  },
  register_text: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
  picker: {
    width: 300,
    height: 60,
    backgroundColor: '#222222',
    color: 'white',
    borderRadius: 10,
    paddingBottom: 30,
    fontSize: 5
  }
});


export default CreatePost


