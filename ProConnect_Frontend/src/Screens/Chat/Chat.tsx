import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { View,Text,Image,Keyboard, TouchableWithoutFeedback, Modal,StyleSheet, TouchableOpacity } from 'react-native'
import { GiftedChat,Bubble, BubbleProps, IMessage, MessageProps, Time } from 'react-native-gifted-chat'
import {
  collection,
  addDoc,
  orderBy,
  query,
  where,
  onSnapshot,
  getDocs,
  DocumentData,
  Query,
  updateDoc,
  doc,
  AddPrefixToKeys
} from 'firebase/firestore';
import { database, auth } from '../../Services/Firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedChatEmail, getSelectedChatModal } from '../../Services/Redux/Slices/ChatSlice';
import ModalD from '../../Features/Persons/ModalD';
import { User } from '../../Services/Redux/Api';
import { LinearGradient } from 'expo-linear-gradient';
import ProButton from '../../Components/Controls/ProButton';

interface ChatProps {
  user1 : string;
  user2 : string;
}
const Chat :React.FC<ChatProps> =  (props) => {



  const [messages, setMessages] = useState<IMessage[]>([])

  const ReceiverEmail = useSelector(getSelectedChatEmail)

  const modalOpened = useSelector(getSelectedChatModal)


  const [ModalVisible, setModalVisible] = useState(modalOpened)

  

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





    const unsubscribe = onSnapshot(results, querySnapshot => {
      
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user : doc.data().user,
          ReceiverUser : doc.data().ReceiverUser, 
          isAccepted : doc.data().isAccepted,
          isRejected : doc.data().isRejected,
          GoldMessage : doc.data().GoldMessage        
        }))
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages : IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    


    const {createdAt, text, user, ReceiverUser, GoldMessage, isAccepted, isRejected } = messages[0];    
    addDoc(collection(database, 'chats'), {
      createdAt,
      text,
      user,
      ReceiverUser,
      GoldMessage,
      isAccepted,
      isRejected
    });
    
  }, []);
  


  const updateMessage = async (messageId : string , newData : Partial<IMessage>) => {
    const messageRef = doc(database, 'chats', messageId); // Construct a reference to the message document
    
    try {
      await updateDoc(messageRef, newData); // Update the document with the new data
      console.log('Message updated successfully');
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };


  const convertToIMessage = (text :string) => {
    const newMessage = {
      text: text, // The message text
      createdAt: new Date(), // The timestamp of when the message was created
      user: {_id: auth?.currentUser?.email || ''}, // The user object representing the sender of the message
      ReceiverUser : {_id: ReceiverEmail},
      GoldMessage : true,
      isAccepted : false,
      isRejected : false,
    };
    return newMessage;
  };

  const sendMessage = (text : string) => {
    const message = convertToIMessage(text);
   onSend([message]);
    // Add logic to send the message to the backend or wherever it needs to go
  };

 


  function getModal(){
    if (ModalVisible === true)
    return (
      <View style={styles.modalContainer}>
      <Modal 
      visible={ModalVisible}
      transparent={true}
      >
           <TouchableWithoutFeedback>
              <View style={styles.modalBackground} />
            </TouchableWithoutFeedback>
        <ModalD send={sendMessage} setModalVisible={setModalVisible}/>
      </Modal>
      </View>
    )
  }

  const BubbleChat = (props : Readonly<BubbleProps<IMessage>>) => {
    const id = props.currentMessage?.user._id

    const goldMessage = props.currentMessage?.GoldMessage;

    const isCurrentUser = id === auth?.currentUser?.email;
    

    const isAccepted = props.currentMessage?.isAccepted;

    const isRejected = props.currentMessage?.isRejected;

  // Set the background color based on whether the message is from the current user or not
  let BackgroundColor = isCurrentUser ? 'blue' : 'white';
  BackgroundColor = goldMessage && isAccepted ? '#27ae60' : goldMessage && isRejected ? '#e62143' : goldMessage ? '#FFE373' : BackgroundColor;
  let containerBackgroundColor = goldMessage && isAccepted ? '#27ae60' : goldMessage && isRejected ? '#e62143' : goldMessage ? '#FFE373' 
  
  
  
  : "transparent";
  const renderButtons = () => {
    let messageId = props.currentMessage?._id;
    console.log(messageId)
   
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonsStyleAccept} onPress={()=>{
            updateMessage(messageId  || '', {isAccepted: true});
          }}>
            <Text style={styles.textStyle}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonsStyleReject} onPress={()=>{
            updateMessage(messageId || '', {isRejected: true});
          }}>
            <Text style={styles.textStyle}>Reject</Text>
          </TouchableOpacity>
        </View>
      );
    
    return null;
  };

  const renderTime = (props : Readonly<BubbleProps<IMessage>>) => {
    return (
      <Time
      {...props}
      timeTextStyle={{
       left : {
        color : goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ? "white" : "gray"
       },
       right : {
        color : goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ? "white" : "white"
       }
      }}
      />
    );
  };
  

  const renderBubble = (props: Readonly<BubbleProps<IMessage>>) => {
    
    if (auth.currentUser?.email !== props.currentMessage?.user._id && isAccepted === false && isRejected === false && goldMessage === true) {
      return (
        <View style={styles.messageContainer}>
         <Bubble
         {...props}
         
         wrapperStyle={{
           right: {
            
             backgroundColor: BackgroundColor,
             
             
             
           },
           left: {
             backgroundColor: BackgroundColor, 
           },

         
         }}

         textStyle={{
          right : {
            marginRight : 55,
          },

          left : {
            marginLeft : 55,

          }
         }}

         renderTime={renderTime}
   
         />

          {renderButtons()}
       </View>
      )

      
    }

    else {
      return (
        <Bubble
        {...props}
        
        wrapperStyle={{
          right: {
            
            backgroundColor: BackgroundColor, 
            
            
          },
          left: {
            backgroundColor: BackgroundColor, 
          },

        
        }}

        

        textStyle={{
          
          
          left : {
            color: goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ?  "white" : "black",
            

          },

          right : {
            color: goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ?  "white" : "white",

          },
          
          
         }}

         renderTime={renderTime}

        


         

         

        
  
  
        
        />
      )
    }
  }
    return (
      renderBubble(props) // Pass the required argument to the renderBubble function
    )
    }



  return (
    <View style={{flex : 1}}>

      


{getModal()}



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
      GoldMessage : false,
      isAccepted : false,
      isRejected : false,
    })))}
    user={{
      _id: auth?.currentUser?.email || 'aziz26@gmail.com',
    }}
  />        



    </View>

    
    
  
       
    
   
  )
}

export default Chat

const styles = StyleSheet.create({
  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
  modalContainer : {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent : "space-between",
    width : 175,
    
  },

  buttonsStyleAccept : {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    borderWidth: 0,
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'rgba(39, 174, 96, .15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 9,
    elevation: 4,
    width : "auto"
  },
  buttonsStyleReject : {
    backgroundColor: '#e62143',
    borderRadius: 8,
    borderWidth : 0,
    color: '#fff',
    fontFamily: 'Mija',
    fontSize: 18,
    fontWeight: '700',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 13,
    marginVertical: 10,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlignVertical: 'center',
    
    
    width: 'auto',
  },

  textStyle : {
    color : "white",
    
  },
  messageContainer:  {   
    alignItems : "center",
    backgroundColor : "#FFE373",
    borderRadius : 20,
    width : "auto"
  }
})
