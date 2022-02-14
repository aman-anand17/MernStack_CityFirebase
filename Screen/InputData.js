import { useState,useEffect } from 'react';
import { View, Text,Pressable, StyleSheet} from 'react-native';
import { SafeAreaView} from "react-native";
import { TextInput } from 'react-native-paper';
import { collection, addDoc } from "firebase/firestore";
import {auth,db}  from '../Controllers/config';
import MyImagePicker from '../Component/ImagePicker';
import { storageRef } from '../Controllers/config';
import { ref,uploadBytes,getDownloadURL } from "firebase/storage";


const InputData = ({ route, navigation })=> {
    const [name,setName]= useState("");
    const [title,setTitle]= useState("");
    const [content,setContent]= useState("");
    const[imgUrl,setImgUrl]=useState("");
    
    const imagesRef = ref(storageRef, 'images');

    const onChangeName = (text)=>{ setName(text); }
    const onChangeTitle = (text)=>{setTitle(text);}
    const onChangeContent = (text)=>{setContent(text); }
    const handleInputData = async ()=>
    {
      let myurl=''
      try {      
          
          const myref = ref(imagesRef,name+title)
          const imgs = await fetch(imgUrl);
          const bytes = await imgs.blob();
          await uploadBytes(myref,bytes);
          

              getDownloadURL(ref(imagesRef,name+title))
                                                              .then(async (url) => {
                                                                // `url` is the download URL for 'images/stars.jpg'
                                                                
                                                                // console.log(url);
                                                                const docRef = await addDoc(collection(db, "blogs/"), {
                                                                  blog_name : name,
                                                                  blog_title: title,
                                                                  blog_content: content,
                                                                  comments:[],
                                                                  count_like:0,
                                                                  imgUrl:url
                                                                }); 
                                                                console.log("Document written with ID: ", docRef.id);
                                                                navigation.navigate("Home");
                                                              
                                                              })
                                                              .catch((error) => {
                                                                // Handle any errors
                                                              });
             

        }
         catch (e) {
          console.error("Error adding document: ", e);
        }
        
        
    } 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fffafa'}}>
      <Text style={styles.text}>Enter Details</Text>
      <SafeAreaView>        
         <TextInput
          style={styles.input}
          placeholder='enter author name'
          onChangeText={onChangeName}
          value={name}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={title}
          placeholder="enter title"
        />
        <MyImagePicker setImgUrl={setImgUrl}/>
        <TextInput
          style={styles.inputcontent}
          onChangeText={onChangeContent}
          value={content}
          multiline={true}
          placeholder="enter content"
        />

        <Pressable style={styles.btn}  onPress={handleInputData}>
          <Text style={styles.btn_text}>Send Data</Text>
        </Pressable>

       <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <Text style={styles.btn_text}>go back</Text>
        </Pressable>     
     </SafeAreaView>
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
    borderRadius: 10
  },
  inputcontent: {
    height: 120,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: 'gray',
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 10
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
  paddingVertical: 10,
  paddingHorizontal: 26,
  borderRadius: 3,
  elevation: 2,
  backgroundColor: 'black',
  margin:10,
},
btn_text: {
  fontSize: 14,
  lineHeight: 18,
  fontWeight: 'bold',
  letterSpacing: 0.25,
  color: 'white',
},
});


export default InputData;