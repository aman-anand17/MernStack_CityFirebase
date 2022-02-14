import { useState,useContext } from 'react';
import { View, Text,Pressable, StyleSheet} from 'react-native';
import { SafeAreaView} from "react-native";
import { Button, TextInput } from 'react-native-paper';
import { collection, addDoc, query, where, getDocs  } from "firebase/firestore";
import {auth,db}  from '../Controllers/config';
import { RadioButton } from 'react-native-paper';
import { LoginContext } from '../Contexts/LoginContext';
import { UpdateUserInfo } from '../Controllers/UpdateUserInfo';

const ProfileSetting = ({ route, navigation })=> {
    const [name,setName]= useState("");
    const [country,setCountry]= useState("");
    const [sex, setSex] = useState('');

    const onChangeName = (text)=>{ setName(text); }
    const onChangeCountry = (text)=>{setCountry(text); }
    const dataContext = useContext(LoginContext);
    const handleInputData = async ()=>
    {

        const q = query(collection(db, "users/"), where("email", "==", dataContext.userEmail));
        const querySnapshot = await getDocs(q);

        const userList = querySnapshot.docs.map((doc) =>{
              return({...doc.data(),id:doc.id})
         });
        if(userList.length==1){
            UpdateUserInfo(userList[0].id,name,country,sex);
            dataContext.setUserName(name)
            navigation.navigate("Home");
            
        }
        else{
            try {
                const docRef = await addDoc(collection(db, "users/"), {
                  name : name,
                  email:dataContext.userEmail,
                  country:country,
                  sex:sex
                });       
                console.log("Document written with ID: ", docRef.id);
                dataContext.setUserName(name)
                navigation.navigate("Home");
              } catch (e) {
                console.error("Error adding document: ", e);
              }


        }

         


     


    } 

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' ,backgroundColor:'#fffafa'}}>
      <Text style={styles.text}>Update Name</Text>
      <SafeAreaView>        
         <TextInput
          style={styles.input}
          placeholder='enter name'
          onChangeText={onChangeName}
          value={name}
        />
            <View style={{padding:10, margin:10,}}>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                        <RadioButton
                        value="male"
                        status={ sex === 'male' ? 'checked' : 'unchecked' }
                        onPress={() => setSex('male')}
                        />
                        <Text> Male </Text>
                </View>
                <View style={{flexDirection:'row',alignItems:'center'}}>
                    
                        <RadioButton
                        value="female"
                        status={ sex === 'female' ? 'checked' : 'unchecked' }
                        onPress={() => setSex('female')}
                         />
                         <Text> Female </Text>
                </View>           
            </View>
        <TextInput
          style={styles.input}
          onChangeText={onChangeCountry}
          value={country}
          placeholder="enter country"
        />

        <Button style={styles.btn} mode="outlined"  onPress={handleInputData}>
          <Text style={styles.btn_text}>Update Data</Text>
        </Button>

       <Button style={styles.btn} mode='outlined' onPress={() => navigation.goBack()}>
          <Text style={styles.btn_text}>go back</Text>
        </Button>     
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
    borderColor: 'black',
    backgroundColor:'white',
    borderWidth: 1,
    borderRadius: 10
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontWeight:'bold',
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
  backgroundColor:'black',
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


export default ProfileSetting;