// In App.js in a new project

import * as React from 'react';
import { useState,useEffect,useContext } from 'react';
import { View, Text} from 'react-native';
import { SafeAreaView, StyleSheet,Pressable } from "react-native";
import { signInWithEmailAndPassword,onAuthStateChanged } from "firebase/auth";
import { LoginContext } from '../Contexts/LoginContext';
import { GoogleAuthProvider ,signInWithPopup, FacebookAuthProvider} from "firebase/auth";
import {auth,db}  from '../Controllers/config';
import { TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';
import { collection, addDoc, query, where, getDocs  } from "firebase/firestore";



const Login = ({navigation}) =>{
  const [Username,setUsername]= useState("");
  const [Password,setPassword]= useState("");
  const dataContext = useContext(LoginContext);

  useEffect( async ()=>{
    onAuthStateChanged(auth, (user) => {
    if (user) {

  const uid = user.uid;
  let email = user.email;
  dataContext.setLogin(true);
  dataContext.setUserEmail(email);
  handleUserName(email);
  navigation.navigate("Home");
} 
});
  })
  const onChangeUsername = (text)=>{
    
    setUsername(text);
  }
  const onChangePassword = (text)=>{
    setPassword(text);
  }

  const handleUserName = async (email)=>{
    const q = query(collection(db, "users/"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

        const userList = querySnapshot.docs.map((doc) =>{
              return({...doc.data(),id:doc.id})
         });
        if(userList.length==1){
            dataContext.setUserName(userList[0].name);
            navigation.navigate("Home");
            
        }
        else{
          dataContext.setUserName(email.split('@')[0])
        }
  }

  const handleLogin = ()=>{

      // const auth = getAuth();
    signInWithEmailAndPassword(auth, Username, Password)
    .then((userCredential) => {
      const uid = user.uid;
    let email = user.email;
    
    dataContext.setLogin(true);
    dataContext.setUserEmail(email);
    handleUserName(email);
      navigation.navigate("Home",{...user})
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });

  }
  const handleLoginWithGoogle= ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    dataContext.setLogin(true);
    dataContext.setUserEmail(email);
    handleUserName(email);
    navigation.navigate("Home",{...user})

    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });

  }

  const handleLoginWithFacebook = ()=>{
    const fbprovider = new FacebookAuthProvider();
    signInWithPopup(auth, fbprovider)
  .then((result) => {
    const user = result.user;
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;

    dataContext.setLogin(true);
    navigation.navigate("Home",{...user})

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    console.log(error)
    

    // ...
  });

  }



  
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fffafa'}}>
      <Text style={styles.text}>Login</Text>
      <View style={{padding:15}}>
      <SafeAreaView>
         
         <TextInput
         style={styles.input}
         placeholder='enter email'
         onChangeText={onChangeUsername}
         value={Username}
       />
       <TextInput
         style={styles.input}
         onChangeText={onChangePassword}
         value={Password}
         secureTextEntry
         placeholder="password"
       />
       
       <Pressable style={styles.btn}  onPress={handleLogin}>
        <Text style={styles.btn_text}>Login</Text>
        </Pressable>      
     </SafeAreaView>

      <View style={styles.btn_i_container}>
        <Pressable style={styles.btn_i}  onPress={handleLoginWithGoogle}>
        <FontAwesome name="google-plus-square" size={38} color="black" />
          </Pressable>
        <Pressable style={styles.btn_i}  onPress={handleLoginWithFacebook}>
          <FontAwesome5 name="github-square" size={38} color="black" />
          </Pressable>
      </View>
      <Pressable style={styles.btn}  onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.btn_text}>Register</Text>
        </Pressable>
      </View>
      
      
    </View>
  );
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 10,
    padding: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor:'white',
    borderRadius: 15
  },
  text: {
    color: 'black',
    fontSize: 35,
    fontFamily:'headingFont',
  
    fontWeight:'bold',
    fontSize:45,
    lineHeight:48 , margin: 0, 

    
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
  alignSelf:'center',
},
btn_i: {
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 5,
  elevation: 2,
  borderColor:'black',
  marginLeft:15,

},
btn_i_container:{
  alignItems:'center',
  flex:1,
  flexDirection:"row",
  justifyContent:"center",
  paddingRight:15
},

});




export default Login;