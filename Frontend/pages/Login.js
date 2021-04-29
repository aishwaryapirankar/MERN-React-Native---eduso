import React, {useEffect, useState} from "react";
import { KeyboardAvoidingView , StyleSheet, TextInput, Text, View, Button, Image, TouchableOpacity, Alert, ScrollView } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import validator from "validator";
import { Formik } from 'formik';
import Axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';

const logo = require('../images/yellow-logo.png');
const email_icon = require('../images/email-icon.png');
const password_icon = require('../images/password-icon.png')

const BASE_URL = 'http://10.0.2.2:3012';

function Login({ navigation }) {
  const initialState = {
    email: "",
    password: "",
    errors: {},
  };

  const [email, setEmail] = useState(initialState.email);
  const [password, setPassword] = useState(initialState.password);
  const [errors, setErrors] = useState(initialState.errors);

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!validator.isEmail(email)) {
      emailError = " Invalid Email";
    }
    if (password === "") {
      passwordError = " Password cannot be empty";
    }
    if (emailError || passwordError) {
      setErrors({ ...errors, email: emailError, password: passwordError });
      return false;
    }
    return true;
  };

  const handleLogin = async ()=>{
    const dataToSend ={
      email: email,
      password: password
    }
    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        const res = await Axios.post(`${BASE_URL}/users/login`, dataToSend);
        let token = res.data.token.token;
        let userName = res.data.user.name;
      
        await AsyncStorage.setItem("SavedToken", token);
        

        console.log(token);
        navigation.navigate('BottomBar')
      } catch (error) {
        alert("No such user , Check your Credentials again!");
      }
    }
  }

  const handleSubmit = () => {
    handleLogin();
  };

    return (

    <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding": "height"} 
        style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image source={logo} style={styles.image} />
        <Formik>
        {(props)=>
          <>
            <View style={styles.icon}>
              <Image source={email_icon} style={styles.icons}/>
              <TextInput 
                style={styles.input} 
                onChangeText={email => setEmail(email)}
                value={email}
                onBlur={props.handleBlur('email')}
                placeholder="Email" 
                placeholderTextColor="white" 
                keyboardType="email-address">
              </TextInput>
            </View>
            <View>
                  <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
            </View>

            <View style={styles.icon}>
              <Image source={password_icon} />
              <TextInput 
                onChangeText={password => setPassword(password)}
                value={password}
                onBlur={props.handleBlur('password')}
                style={styles.input} 
                placeholder="Password" 
                placeholderTextColor="white" 
                secureTextEntry={true}>
              </TextInput>
            </View>
            <View>
                <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
            </View>

            <TouchableOpacity style={styles.login} onPress={handleSubmit}  ><Text style={styles.login_text} >LOGIN</Text></TouchableOpacity>
          </>
        }
        </Formik>
      </View>
    </KeyboardAvoidingView>
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
  image: {
    height: 100,
    width: 100,
    margin: 20,
    padding: 20
  },
  input: {
    backgroundColor: '#222222',
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
  login: {
    alignItems: 'center',
    backgroundColor: '#EDC31D',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    width: 150,
  },
  login_text: {
    color: 'black',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Login