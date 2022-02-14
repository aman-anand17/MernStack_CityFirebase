import * as React from 'react';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const CommentCard = (props) => {
    return(
        <Card style={{borderLeftWidth:1,borderColor:'gray',marginBottom:5}} >
    <Card.Content>
      <Paragraph style={{fontFamily: 'myfont1',fontWeight:600,}}>{props.comment}</Paragraph>
    </Card.Content>
  </Card>

    )
}
    
  

export default CommentCard;