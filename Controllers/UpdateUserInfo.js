import {auth,db}  from '../Controllers/config';
import {doc,updateDoc } from "firebase/firestore";
const UpdateUserInfo = async (id,name,country,sex)=>{
    const userDoc = doc(db,'users',id)
    const newfield = {name,country,sex}
    await updateDoc(userDoc,newfield)



}

export {UpdateUserInfo};