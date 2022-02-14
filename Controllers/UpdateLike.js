import {auth,db}  from '../Controllers/config';
import {doc,updateDoc } from "firebase/firestore";
const UpdateLike = async (id,like)=>{
    // 3JNHhPzMAh6jqjG0A80u
    const blogDoc = doc(db,'blogs',id)
    const newfield = {count_like:like+1}
    await updateDoc(blogDoc,newfield)



}

export {UpdateLike};