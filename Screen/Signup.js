
import * as React from 'react';
import { useState,useEffect,useContext } from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView, StyleSheet,Pressable} from "react-native";
import { TextInput,Button } from 'react-native-paper';
import {createUserWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import {auth}  from '../Controllers/config';
import { LoginContext } from '../Contexts/LoginContext';

function Signup({navigation}) {
    const [name,setname]= useState("");
    const [email,setemail]= useState("");
    const [Password,setPassword]= useState("");
    const dataContext = useContext(LoginContext);

    useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
      if (user) {
      const uid = user.uid;
      dataContext.setLogin(true);
      dataContext.setUserName(user.email);
      navigation.navigate("Home");

    } 
    });
    })

    const handleSignup =()=>{    
      let user;
          createUserWithEmailAndPassword(auth, email, Password)
            .then((userCredential) => {
              user = userCredential.user;   
                auth.signOut()
                .then(()=>{
                  navigation.navigate("Login");
                })
                .catch(error=>alert(error.message))
              navigation.navigate("Login");
            })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(error);
       });     
    }

    const onChangename = (text)=>{   
        setname(text);
    }
    const onChangeEmail = (text)=>{   
        setemail(text);
    }
    const onChangePassword = (text)=>{
        setPassword(text);
    }

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' ,backgroundColor:'#fffafa'}}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.text}> Sign Up </Text>
        <SafeAreaView>
          <TextInput
          style={styles.input}
          onChangeText={onChangename}
          placeholder='Enter Name'
          keyboardType='email-address'
          value={name}
          />
          <TextInput
          style={styles.input}
          onChangeText={onChangeEmail}
          placeholder='enter email'
          value={email}
          />
        <TextInput
          style={styles.input}
          onChangeText={onChangePassword}

          value={Password}
          secureTextEntry
          placeholder="password"
        />

        <Pressable style={styles.btn}  onPress={handleSignup}>
        <Text style={styles.btn_text}>Create</Text>
        </Pressable>
        <Pressable style={styles.btn}  onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btn_text}>Login</Text>

        </Pressable>

        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
       <Text style={styles.btn_text}>go back</Text>
         
       </Pressable>

       
     </SafeAreaView>
     
        </View>

        
      </View>
    );
  }
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderColor: 'gray',
      backgroundColor:'white',
      borderWidth: 1,
    borderRadius: 12
    
    },
    text: {
      color: 'black',
    fontSize: 35,
    fontWeight:'bold',
    fontSize:45,
    lineHeight:48 , margin: 0,
    fontFamily: 'HeadingFont' 
      
   },
   btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 4,
    elevation: 2,
    backgroundColor: 'black',
    margin:10,
  },
  btn_text: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  });
  

  export default Signup;