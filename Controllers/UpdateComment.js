import {auth,db}  from '../Controllers/config';
import {doc,updateDoc,arrayUnion } from "firebase/firestore";
const UpdateComment = async (id,mycomment)=>
        {
        const blogDoc = doc(db,'blogs',id)
        const newfield = {comments:arrayUnion(mycomment)}
        await updateDoc(blogDoc,newfield)
        }

export {UpdateComment};