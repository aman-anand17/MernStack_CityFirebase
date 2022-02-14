import * as React from 'react';
import { useState,useContext } from 'react';
import { Text,View,StyleSheet} from 'react-native-web';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { LoginContext } from '../Contexts/LoginContext';
import Comments from './Comments';
import { UpdateLike } from '../Controllers/UpdateLike';


const MyCard = (props) => {
  const[isLiked,setLiked] = useState(false);
  const[displayComment,setDisplayComment] = useState(false);
  const dataContext = useContext(LoginContext);
  const[likeCount,setLikeCount]=useState(props.data.count_like);
  const handleLike = ()=>{
    if(isLiked){
      setLikeCount(likeCount-1)
    }
    else{
      setLikeCount(likeCount+1)
    }
    setLiked(!isLiked);
    UpdateLike(props.data.id,likeCount);  
  }
//  console.log(props.data)

    return(
    <View style={{width:'100%',fontFamily: 'HeadingFont',marginTop:10,backgroundColor:'#ebe4e4'}}>
        <Card style={{backgroundColor:'#f7f2fa',borderWidth:2,borderColor:'gray'}}>
        <Card.Cover resizeMode='center' style={{aspectRatio:1,maxWidth:'450px',width:'100%',height:'auto',borderColor:'gray',borderWidth:1}} source={{ uri: props.data.imgUrl }} />
          <Card.Content>
            <Title style={{fontSize:24,fontWeight:'600',textAlign:'center',fontFamily: 'HeadingFont'}}>{props.data.blog_title}</Title>
            <Paragraph style={{fontSize:16,lineHeight:30,padding:'2%', fontFamily: 'myfont1',fontWeight:'600'}}>{props.data.blog_content} 
            </Paragraph>
            <Text style={{fontSize:14,textAlign:'end',marginRight:'10%'}}>By~ {props.data.blog_name}</Text>
          </Card.Content>
          {
            dataContext.islogin?<Card.Actions>
            <Button onPress={handleLike} style={{marginRight:15}}>
              {
                isLiked?<AntDesign name="heart" size={24} color="red" />:<AntDesign name="hearto" size={24} color="red" />
              }
              <Text style={{fontSize:24,color:"black"}}>{likeCount}</Text>
            
            </Button>
            <Button mode="outlined" color='black' style={{backgroundColor:'white'}}  onPress={()=>{setDisplayComment(!displayComment)}}>
              <Text style={{backgroundColor:'white'}}>
                Comments
              </Text>
            </Button>
         </Card.Actions> :null
          } 
        </Card>
        {
          displayComment?<Comments data={props.data}/>:null
        }
    </View>
      );
}

export default MyCard;