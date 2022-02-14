import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCaMtszWjXF8A9eusAHuSidYM-EbMhnl7g",
    authDomain: "myproject-b222a.firebaseapp.com",
    

    projectId: "myproject-b222a",
    storageBucket: "myproject-b222a.appspot.com",
    messagingSenderId: "1075014434325",
    appId: "1:1075014434325:web:b9422ac7dfe01cb2fa581c"
  };
  
  // Initialize Firebase
  const firebaseapp = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getFirestore(firebaseapp);
  const storage = getStorage();
  const storageRef = ref(storage);


  export {auth,db,storageRef};