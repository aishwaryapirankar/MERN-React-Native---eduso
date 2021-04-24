import React, {useEffect, useState} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Button, Alert} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import * as ImagePicker from "react-native-image-picker"

import * as yup from 'yup';
import { Formik } from 'formik';

import {useDispatch} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios'


const BASE_URL = 'http://10.0.2.2:3012';

function EditProfile({navigation}) {

  const [name, setName] = useState("");
  const [age, setAge] = useState();
  const [qualification, setQualification] = useState("");
  const [interests, setInterests] = useState("");

  const [errors, setErrors] = useState({});

  

  useEffect(() => {
    const fetchData = async () => {
      const res = await Axios.get(`${BASE_URL}/users/me/profile`, 
      {headers: { Authorization: await AsyncStorage.getItem("SavedToken") },
      });
      setName(res.data.name);
      setAge(res.data.age);
      setQualification(res.data.qualification);
      setInterests(res.data.interests);

    };
    fetchData();

  }, []);

  const validate = () => {
    let nameError = "";
    let ageError = "";
    let qualificationError = "";
    let interestsError = "";

    if (name === "") {
      nameError = " name cannot be empty";
    }

    if (age === "") {
      ageError = " age cannot be empty";
    } else if (isNaN(age)) {
      ageError = "age should be a number";
    }

    if (qualification === "") {
      qualificationError = " Field cannot be empty";
    }

    if (interests === "") {
      interestsError = " Field cannot be empty";
    }

    if (nameError || ageError || qualificationError || interestsError) {
      setErrors({
        ...errors,
        name: nameError,
        age: ageError,
        qualification: qualificationError,
        interests: interestsError
      });
      return false;
    }
    return true;
  };




  const handleCreateProfile = async () => {
    const form = new FormData();
        form.append("name", name);
        form.append("age", age);
        form.append("qualification", qualification);
        form.append("interests", interests);

    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        var mytoken = await AsyncStorage.getItem('SavedToken')
        const res = await Axios.post(
          `${BASE_URL}/users/me/createProfile`,
          form,
          {
            headers: { Authorization: mytoken }
          },
          
        );
        navigation.navigate('BottomBar');
        console.log(res);
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleSubmit = () => {
    handleCreateProfile();
  };



    return (
      <LinearGradient colors={['#EDC31D', '#000000']} style={styles.linearGradient}>
      <View style={styles.container}>
        <Text style={styles.text}>Edit Profile</Text>    

        <Formik
          >
          {(props) => 
          <>
          <TextInput 
                  style={styles.input}
                  onChangeText={name => setName(name)}
                  value={name}
                  onBlur={props.handleBlur("name")}
                  placeholder="Name" 
                  placeholderTextColor="white"
                  keyboardTyoe="number-pad" >
          </TextInput>  
          <View>
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
          </View>
          <TextInput 
                  style={styles.input}
                  onChangeText={age => setAge(age)}
                  value={age}
                  onBlur={props.handleBlur("age")}
                  placeholder="Age" 
                  placeholderTextColor="white"
                  keyboardType="number-pad" >
          </TextInput>  
          <View>
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.age}</Text>
          </View>
          

          <TextInput 
                  style={styles.input}
                  onChangeText={qualification => setQualification(qualification)}
                  value={qualification}
                  onBlur={props.handleBlur("qualification")}
                  placeholder="Qualification" 
                  placeholderTextColor="white" >
          </TextInput>  
          <View>
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.qualification}</Text>
          </View>

          <TextInput 
                  style={styles.input}
                  onChangeText={interests => setInterests(interests)}
                  value={interests}
                  onBlur={props.handleBlur("interests")} 
                  placeholder="Interests" 
                  placeholderTextColor="white">
          </TextInput>  
          <View>
              <Text style={{ fontSize: 10, color: 'red' }}>{errors.interests}</Text>
          </View>

          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {photo && (
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <Button title="Choose Photo" onPress={handleChoosePhoto} />
        </View> */}


        <TouchableOpacity style={styles.register} onPress={handleSubmit}><Text style={styles.register_text}>Update</Text></TouchableOpacity>
                
      </>
      }
      </Formik>
      </View>
              
      </LinearGradient>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      fontFamily: 'Montserrat',
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      color: 'white',
      fontSize: 25
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      width: 400
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    input: {
      backgroundColor: '#222222',
      width: 300,
      color: 'white',
      borderRadius: 10,
      margin: 10,
      padding: 10
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
  });

export default EditProfile
