import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View,Text,Image,Keyboard, TouchableWithoutFeedback } from 'react-native'
import { GiftedChat,Bubble, BubbleProps, IMessage, MessageProps } from 'react-native-gifted-chat'
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  onSnapshot,
  getDocs,
  DocumentData,
  Query
} from 'firebase/firestore';
import { database, auth } from '../../Services/Firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedChat } from '../../Services/Redux/Slices/ChatSlice';


interface ChatProps {
  user1 : string;
  user2 : string;
}
const Chat :React.FC<ChatProps> =  (props) => {



  const [messages, setMessages] = useState<IMessage[]>([])

  const ReceiverEmail = useSelector(getSelectedChat)

  useEffect(() => {
   

  }, [])

  useLayoutEffect(() => {

    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));


const user = {_id : auth.currentUser?.email};
const ReceiverUser = {_id : ReceiverEmail};
const results = query(
  collectionRef,
  where('user', 'in', [user,ReceiverUser]),
  where('ReceiverUser', 'in', [user,ReceiverUser]),
  orderBy('createdAt', 'desc')
);



//console.log(results)


    const unsubscribe = onSnapshot(results, querySnapshot => {
      
    // console.log('querySnapshot unsusbscribe');
   console.log(querySnapshot.docs.length)
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user : doc.data().user,
          ReceiverUser : doc.data().ReceiverUser,         
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages : IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );


    const { _id, createdAt, text, user, ReceiverUser } = messages[0];    
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user,
      ReceiverUser,
    });
    
  }, []);


  

  const BubbleChat = (props : Readonly<BubbleProps<IMessage>>) => {
    const id = props.currentMessage?.user._id

    const isCurrentUser = id === auth?.currentUser?.email;

  // Set the background color based on whether the message is from the current user or not
  const backgroundColor = isCurrentUser ? 'blue' : 'white'; 
    return (
      <Bubble
      {...props}
      
      wrapperStyle={{
        right: {
          backgroundColor: backgroundColor, 
        },
        left: {
          backgroundColor: backgroundColor, 
        },
      }}
    />
     )
    }
  return (

    
  <GiftedChat 
    messages={messages}
    renderBubble={BubbleChat}
    onSend={messages => onSend(messages.map(message => ({
      ...message,
      user: {
        _id: auth?.currentUser?.email || ''
      },
      ReceiverUser: {
        _id: ReceiverEmail, // replace with actual receiver user ID
        // include other receiver user properties here if needed
      },
    })))}
    user={{
      _id: auth?.currentUser?.email || 'aziz26@gmail.com',
    }}
  />          
  
       
    
   
  )
}

export default Chat
