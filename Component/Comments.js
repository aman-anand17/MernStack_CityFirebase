import { useState,useEffect } from 'react';
import { View, Text,Pressable, StyleSheet} from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import CommentCard from './CommentCard';
import { UpdateComment } from '../Controllers/UpdateComment';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Comments = (props)=>{
    const[text,setText]=useState("");
    const[commentArr,setCommentArr]=useState(props.data.comments);
    
    const addComment = ()=>{
        const newarr= [...commentArr,text];     
        setCommentArr(newarr);
        UpdateComment(props.data.id,text); 
        setText("");
    }
    return(
        <View style={{borderTopColor:'gray',borderTopWidth:1}}>
            <View style={{flex:1,flexDirection:'row',borderWidth:1,borderColor:'gray',marginBottom:2,alignItems:'center',justifyContent:'space-evenly',backgroundColor:"white"}}> 
            <TextInput style={{width:"90%",margin:3,backgroundColor:'white'}}
                label="comment"
                placeholder='enter comment'
                type="outlined"
                value={text}
                multiline={true}
                onChangeText={text => setText(text)}
            />
            <Pressable onPress={addComment} >
            <MaterialCommunityIcons name="send-circle-outline" size={32} color="black" />
            </Pressable>
            </View>
            {
                commentArr.map((cm)=>{
                    return(
                    <CommentCard comment={cm} />
                    )

                })
            }

        </View>
        
        
        
    );

}

export default Comments;