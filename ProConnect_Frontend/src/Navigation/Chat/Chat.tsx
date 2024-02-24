import React, { useCallback, useEffect, useState } from 'react'
import { View,Text,Image,Keyboard, TouchableWithoutFeedback } from 'react-native'
import { GiftedChat,Bubble, BubbleProps, IMessage, MessageProps } from 'react-native-gifted-chat'


const Chat = () => {
  const CustomMessageContainer = (props: any) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {props.currentMessage.user.avatar && (
          <Image
            source={require("../../../gardner2.png")}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        )}
        <View style={{ flex: 1 }}>{props.renderMessage(props)}</View>
      </View>
    );
  };


  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
   

  }, [])

  const onSend = useCallback((messages : IMessage[] = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );


    
  }, []);

  

  const BubbleChat = (props : Readonly<BubbleProps<IMessage>>) => {
    return (
      <Bubble
      {...props}
      
      wrapperStyle={{
        right: {
          backgroundColor: 'blue', 
        },
        left: {
          backgroundColor: 'white', 
        },
      }}
    />
     )
    }
  return (

    
  <GiftedChat 
      messages={messages}
      renderBubble={BubbleChat}
      

      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
      
    />          
  
       
    
   
  )
}

export default Chat
