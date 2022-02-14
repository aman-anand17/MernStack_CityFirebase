import * as React from 'react';
import { View, Text,StyleSheet,Pressable, ScrollView } from 'react-native';
import {auth,db}  from '../Controllers/config';
import { useState,useEffect ,useContext} from 'react';
import { collection, getDocs } from "firebase/firestore";
import { LoginContext } from '../Contexts/LoginContext';
import MyCard from '../Component/Cards';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import MyImagePicker from '../Component/ImagePicker';



const HomeScreen = ({ route, navigation })=> {


  const [mydata,setMydata]= useState([]);
  const dataContext = useContext(LoginContext);
  let logintext = dataContext.islogin? <SimpleLineIcons name="logout" size={30} color="black" />:<SimpleLineIcons name="login" size={30} color="black" />;

  useEffect(async ()=>{
    const blogsCol = collection(db, 'blogs/');
  const blogSnapshot = await getDocs(blogsCol);
  const blogList = blogSnapshot.docs.map((doc) =>{
    return({...doc.data(),id:doc.id})
  });
  setMydata(blogList)
  
  },[])
  
  const handleClick =()=>{
    if (dataContext.islogin)
    {
        auth.signOut()
      .then(()=>{
        dataContext.setLogin(false);
        
        
      })
      .catch(error=>alert(error.message))
    }
    else{

      navigation.navigate("Login");

    }   

    }

  const handleGetData = async ()=>{

    const blogsCol = collection(db, 'blogs/');
  const blogSnapshot = await getDocs(blogsCol);
  const blogList = blogSnapshot.docs.map((doc) =>{
    return({...doc.data(),id:doc.id})
  });
  setMydata(blogList)
  }

  return (
    <ScrollView style={{padding:10,backgroundColor:'#fffafa'}}> 
      <View style={{alignItems: 'center', justifyContent: 'flex-start' ,fontFamily: 'HeadingFont',margin:10}}>
        <View style={{flexDirection:'row',justifyContent:'flex-start',width:'100%'}}>
          <Button mode='text' color='black' onPress={()=>{navigation.navigate('Home')}}>
          <Text style={{fontSize:16,fontWeight:700,alignItems:'baseline',paddingBottom:2}} >
                  <FontAwesome5 name="blog" size={20} color="black" />
                  logtor</Text>

          </Button>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingBottom:10}}>
             <View>{
               dataContext.islogin?
               <>
               <Ionicons name="md-person-circle-outline" size={24} color="black" onPress={()=>{
                 navigation.navigate('profile');
               }} />
               <Text style={{fontSize:14,fontWeight:'600',alignItems:'baseline',paddingBottom:2}}>{(dataContext.userName)}
                 </Text>
               </>

               

               :null
             } 
             </View>
             <Button mode="outlined" style={styles.btn} onPress={handleClick}>
                  <Text style={styles.btn_text}>
                  {logintext}
                  </Text>    
              </Button>

        </View>

        <View style={{flexDirection: 'row',justifyContent:'space-between',width:'100%'}}>
              {dataContext.islogin?
              <Pressable  onPress={()=>{
                navigation.navigate("inputData");
              }} >
                <Text>
                <Ionicons name="add-circle-outline" size={40} color="black" />
                </Text>
              </Pressable>
              :null
              }
            <Pressable   onPress={handleGetData}>
              <Text>
              <Ionicons name="refresh-circle-outline" size={40} color="black" />
              </Text>
            </Pressable>
            
        </View>
      </View>
      <View style={{width:'100%',alignItems:'center',borderStartColor:"red"}}>
          {
          mydata.map((data)=>{
            return(
              <MyCard key={data.blog_title} data={data} />                         
            )
          })
        }
      </View>       
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  
  text: {
    color: 'black',
    fontSize: 35,

    fontWeight:'bold',
    fontSize:45,
    lineHeight:48 , margin: 0, 

    
 },
 datatext:{
  color: '#614330',
  fontSize: 15,
 },

 item: {
  backgroundColor: '#f9c2ff',
  padding: 20,
  marginVertical: 8,
  marginHorizontal: 16,
},
title: {
  fontSize: 32,
},
btn: {
  borderRadius: 3,
  elevation: 2,
  fontSize:10
},
btn_text:{
  fontSize:12,
  fontWeight:'600',
  color:"black"
}

});


export default HomeScreen;