import React, { useState, useEffect } from 'react';
import {Image, View, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { storageRef } from '../Controllers/config';
import { getStorage, ref,uploadBytes,getDownloadURL } from "firebase/storage";

export default function MyImagePicker(props){
  const imagesRef = ref(storageRef, 'images');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      console.log(props.setImgUrl)
      props.setImgUrl(result.uri);
      
    //   setImage(result.uri);
      // const myref = ref(imagesRef,'images.jpg')
      // const imgs = await fetch(result.uri);
      // const bytes = await imgs.blob();
      // await uploadBytes(myref,bytes);
                                                              //     getDownloadURL(ref(imagesRef, 'images.jpg'))
                                                              // .then((url) => {
                                                              //   // `url` is the download URL for 'images/stars.jpg'
                                                              //   console.log(url);
                                                              // })
                                                              // .catch((error) => {
                                                              //   // Handle any errors
                                                              // });

    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button mode='outlined' color='black' onPress={pickImage} >
      Upload Image
      </Button>
      {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
    </View>
  );
}
