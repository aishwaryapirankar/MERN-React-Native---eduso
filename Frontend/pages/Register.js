import React, {useEffect, useState}from "react";
import { connect } from 'react-redux';
import validator from "validator";
import { ImageBackground, KeyboardAvoidingView, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Alert } from "react-native";
import * as yup from 'yup';
import { Formik } from 'formik';
import Axios from 'axios';

const logo = require('../images/yellow-logo.png');
const name_icon = require('../images/name-icon.png');
const email_icon = require('../images/email-icon.png');
const password_icon = require('../images/password-icon.png')

const BASE_URL = 'http://10.0.2.2:3012';


function Register({navigation}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let nameError = "";
    let emailError = "";
    let passwordError = "";

    if (!validator.isEmail(email)) {
      emailError = " Invalid Email";
    }

    if (name === "") {
      nameError = " name cannot be empty";
    }

    if (password === "") {
      passwordError = " Password cannot be empty";
    }


    if (
      emailError ||
      nameError ||
      passwordError 
    ) {
      setErrors({
        ...errors,
        name: nameError,
        email: emailError,
        password: passwordError
      });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    const dataToSend = {
      name: name,
      email: email,
      password: password
    };

    const isValid = validate();
    if (isValid) {
      setErrors({});
      try {
        const res = await Axios.post(
          `${BASE_URL}/users/register`,
          dataToSend
        );
        
        console.log(res);
        await navigation.navigate('Login');
      } catch ({ err }) {
        alert(err);
        console.log(err);
      }
    }
  };

  // const handleSubmit = () => {

  //   console.log(errors);
  //   handleRegister();
  // };
    
  
  //const dispatch = useDispatch();

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image source={logo} style={styles.image} />
          <Formik 
          >
          {(props) =>
             <>
               <View style={styles.icon}>
                  <Image source={name_icon} style={styles.icons}/>
                  <TextInput 
                    name="name"
                    onChangeText={name => setName(name)}
                    value={name}
                    onBlur={props.handleBlur("name")}
                    style={styles.input} 
                    placeholder="Full Name"
                    placeholderTextColor="white">
                  </TextInput>
                </View>
                <View>
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.name}</Text>
                </View>

                <View style={styles.icon}>
                    <Image source={email_icon} style={styles.icons}/>
                    <TextInput 
                      name="email"
                      onChangeText={email => setEmail(email)}
                      value={email}
                      onBlur={props.handleBlur("email")}
                      style={styles.input} 
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
                      name="password"
                      onChangeText={password => setPassword(password)}
                      value={password}
                      onBlur={props.handleBlur("password")}
                      style={styles.input} 
                      placeholder="Password" 
                      placeholderTextColor="white" 
                      secureTextEntry={true}>
                  </TextInput>
                </View>
                <View>
                    <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                </View>

                <TouchableOpacity style={styles.register} onPress={handleRegister}><Text style={styles.register_text} >REGISTER</Text></TouchableOpacity>
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

export default Register
