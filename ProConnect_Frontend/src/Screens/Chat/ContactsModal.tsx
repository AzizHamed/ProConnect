import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { IMessage } from 'react-native-gifted-chat'
import PersonCard from '../../Features/Persons/PersonCard'
import { TouchableOpacity } from 'react-native-ui-lib'
import MyTextInput from '../../Components/Controls/MyTextInput'
import { FontAwesome,EvilIcons } from '@expo/vector-icons';
import { checkName } from '../../Constants/Functions/Functions'
import ProButton from '../../Components/Controls/ProButton'


interface ContactsModalProps {
  setVisble : (t : boolean)=>void
  contacts : any[]
  onSendContact : (m: IMessage [])=>void
  convertContactToMessage : (t : any)=>IMessage
}

const ContactsModal :React.FC<ContactsModalProps> =  (props) => {


  const [contacts1, setcontacts1] = useState(props.contacts)

  let textInput = ""


  function filterContacts(){

    if(textInput == "")
      setcontacts1(props.contacts)

    else
    setcontacts1(contacts1.filter((contact) => contact.name!== undefined && checkName(textInput, contact.name, contact.name)))
  }


  function onChangeText(text : string){

    textInput = text
    filterContacts()
  }

  useEffect(() => {
   
    
  }, [props.contacts])
  
  return (

    <View style={{top : 57, backgroundColor : "silver", padding : 10,}}>
      <View style={{marginBottom : 20, borderWidth : 1, borderColor :"white", height : 40, justifyContent : "center", backgroundColor : "white"}}>

      <Text style={{color : "blue", fontWeight : "bold"}} onPress={()=>{props.setVisble(false)}}>Cancel</Text>
      </View>
      <ScrollView>
        <View style={{marginBottom : 20}}>

      <MyTextInput onChange={onChangeText} placeHolder={'Seacrh'} icon={<EvilIcons name='search'  size={45} style={{backgroundColor:"white"}}/>} />
        </View>
      
      {contacts1.map((contact) => {
        if(contact.name !== undefined)
        return (
          <TouchableOpacity onPress={() => {
            props.onSendContact([props.convertContactToMessage(contact)])
            props.setVisble(false)
          }} style={{ marginBottom : 15, alignItems : "flex-start"}}>
           <View style={{flexDirection : "row", alignItems : "center"}}>
            <View style={{marginRight : 5}}>

            <FontAwesome name='user-circle' size={40} color={"black"}/>
            </View>
            <Text>{contact.name}</Text>
           </View>
          </TouchableOpacity>
        )
      })}
      </ScrollView>
    </View>
    
)
}



export default ContactsModal
