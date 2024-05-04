import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View,StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native'
import MyTextInput from '../../Components/Controls/MyTextInput'
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import PersonCard from '../../Features/Persons/PersonCard';
import { useGetAllUsersQuery, useGetUsersByEmailQuery } from '../../Services/Redux/Api';
import { Colors } from 'react-native-ui-lib';
import BackgroundView from '../../Components/Layout/BackgroundView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setChat } from '../../Services/Redux/Slices/ChatSlice';
import { database, auth } from '../../Services/Firebase/Firebase';
import { collection, orderBy, query, where, limit, onSnapshot,or, DocumentData } from 'firebase/firestore';
import { checkName } from '../../Constants/Functions/Functions';
import ProButton from '../../Components/Controls/ProButton';
import RateModal from './RateModal';
import { AirbnbRating } from 'react-native-ratings';
import { IMessage } from 'react-native-gifted-chat';
import Sound from 'react-native-sound';



const PersonsChat = () => {

  // const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});

  const [data1, setdata1] = useState()

  const [reRender, setreRender] = useState(false)
  
  const [emails, setemails] = useState([])


  let textInput = ""

  const collectionRef = collection(database, 'chats');
  
  

  const q = query(collectionRef, orderBy('createdAt', 'desc'));

  const uniqueResults = new Set<String>();

  const [rateModalVisible, setrateModalVisible] = useState(false)

  const [selectedUser, setselectedUser] = useState([])

  const messagesNotSeen = new Map<String,number>()


  const [messageNotSeenS, setmessageNotSeenS] = useState<Map<String,number>>()

  let lastMessages = new Map<String, DocumentData>()

  const [lastMessagesU, setlastMessagesU] = useState<Map<String, DocumentData>>()

  // const playNotificationSound = () => {
  //   const notificationSound = new Sound('C:\Users\azizh\OneDrive\שולחן העבודה\ProConnect\ProConnect\ProConnect_Frontend\src\Screens\Chat\whatsapp-message-for-iphone.mp3', Sound.MAIN_BUNDLE, (error) => {
  //     if (error) {
  //       console.log('Failed to load the sound', error);
  //       return;
  //     }
  //     // Play the sound
  //     notificationSound.play((success) => {
  //       if (success) {
  //         console.log('Sound played successfully');
  //       } else {
  //         console.log('Failed to play the sound');
  //       }
  //     });
  //   });
  // };

  useLayoutEffect(() => {

    const user = { _id: auth.currentUser?.email };
    setemails([])
    const results = query(
      collectionRef,
      or(
      where('user', 'in', [user]),
      where('ReceiverUser', 'in', [user])),
      orderBy('createdAt', 'asc'),
    );


    


    const unsubscribe = onSnapshot(results, querySnapshot => {

      querySnapshot.docChanges().forEach(change => {
        

        // playNotificationSound()


          if(auth.currentUser?.email !== change.doc.data().user._id){

            if(!lastMessages.has(change.doc.data().user._id))

          lastMessages.set(change.doc.data().user._id, change.doc.data())

          if(change.doc.data().createdAt > lastMessages.get(change.doc.data().user._id).createdAt)
            lastMessages.set(change.doc.data().user._id, change.doc.data())


          }

          else{

            if(!lastMessages.has(change.doc.data().ReceiverUser._id))

              lastMessages.set(change.doc.data().ReceiverUser._id, change.doc.data())
    
              if(change.doc.data().createdAt > lastMessages.get(change.doc.data().ReceiverUser._id).createdAt)
                lastMessages.set(change.doc.data().ReceiverUser._id, change.doc.data())
          }
        
        
      

      if (!messagesNotSeen.has(change.doc.data().user._id)) {
        messagesNotSeen.set(change.doc.data().user._id, 0);
        
      }

      if (change.doc.data().seen === false) {
        const count = messagesNotSeen.get(change.doc.data().user._id) || 0;
        messagesNotSeen.set(change.doc.data().user._id, Number(count) + 1);
      }
     
    

      if (!uniqueResults.has(change.doc.data().ReceiverUser._id) && change.doc.data().ReceiverUser._id !== auth.currentUser?.email) {
        uniqueResults.add(change.doc.data().ReceiverUser._id);
      }

        if(!uniqueResults.has(change.doc.data().user._id) && change.doc.data().user._id !== auth.currentUser?.email){
          uniqueResults.add(change.doc.data().user._id)

         
          

        }
      })
      setemails([...uniqueResults])
      setmessageNotSeenS(messagesNotSeen)
      setlastMessagesU(lastMessages)
      


     




    });


  },[]);

  const {data : users} = useGetUsersByEmailQuery({emails : emails});



  useEffect(() => {
    filterUsers()
  } ,[users])


  

  const dispatch = useDispatch();

  const {height,width} = Dimensions.get('window');
  var numberofImages = 0
  const navigation = useNavigation();

  
  

  let chatNumber = users === undefined ? 0 : users.length
  const style = style1(chatNumber);


  


  function filterUsers (){
    if(textInput === "")
      setdata1(users?.filter((user) => user.email !== auth.currentUser?.email && user.name.lastName!== "Admin" && user.name.firstName !== ""))
    else
      setdata1(users?.filter((user) =>  user.email !== auth.currentUser?.email && user.name.lastName!== "Admin" && user.name.firstName !== "" && checkName(textInput, user.name.firstName, user.name.lastName)))

  }

  
  function onChangeText(text : string){ 

    textInput = text;
    filterUsers()
    
    }

  return (

    <BackgroundView children={
     

      <ScrollView>

        <View style={{ flex: 1,justifyContent: 'center',alignItems: 'center'  }}>
                              
                               

      <Modal style={{alignItems : "center"}} visible={rateModalVisible} transparent={true} >

    <RateModal setModalVisible={setrateModalVisible} reviewrUser={auth.currentUser} reviewdUser={selectedUser} />
        </Modal>
        </View>



     

   <View style={style.container}> 
    <View style={style.searchTextInput}>
      <MyTextInput onChange={(onChangeText)} placeHolder={'Search'} icon={<EvilIcons name='search'  size={45} style={{backgroundColor:"white"}}/>} />
    </View>
   



    <View style={style.chatPeople}>
      {data1?.slice().sort((a,b) => {

        if(lastMessagesU?.get(a.email).createdAt < lastMessagesU?.get(b.email).createdAt)
          return 1 

        else {
          if(lastMessagesU?.get(a.email).createdAt > lastMessagesU?.get(b.email).createdAt)
            return -1
          
        }

        return 0

       
        
      }).map((friend)=> {
        
        return(
          <TouchableOpacity key={friend.id} style={{flexDirection : "row", justifyContent: "space-between" , paddingRight : 25}} onPress={()=>{
            dispatch(setChat({ReceiverEmail : friend.email , openModal : false, receiverUserName : friend.name.firstName + " " + friend.name.lastName}))
            // messageNotSeenS?.set(friend.email, 0)
            navigation.navigate("Chats")
          }} >

          <PersonCard imageurl={''} imageStyle={style.imageStyle} user={friend} componentsUnderImage={[]} cardContainerStyle={style.cardContainer1} additionalComponents={[
            <View>

              <Text style={{color : Colors.textPrimary, marginBottom: 7, fontWeight : '500'}}>{friend.name.firstName} {friend.name.lastName}</Text>
              {lastMessagesU?.get(friend.email).location === true ? (
                <View style={{flexDirection :"row", alignItems : "center"}}>
                  <Ionicons name='location' size={20} color={Colors.controlBackground} />
                  <Text style={{ fontWeight: '300', color: Colors.textPrimary, marginLeft : 5 }}>Location</Text>
                </View>
              ) : lastMessagesU?.get(friend.email).text === 'File' ? (

                <View style={{flexDirection : "row", alignItems :"center"}}>
                  <Ionicons name='camera' size={20} color={Colors.controlBackground} />
                <Text style={{ color: Colors.textPrimary, fontWeight: '300', marginLeft : 5 }}>File</Text>
                </View>
              ) : (
                <Text style={{ color: Colors.textPrimary, fontWeight: '300' }}>{lastMessagesU?.get(friend.email).text}</Text>
)}
            </View>
      ]} containerStyle={style.containerStyle}/>
      

{messageNotSeenS.get(friend.email) > 0 &&

          <View  style={{justifyContent : "center", alignItems : "center"}}  >
            <View style={{height : 25, width : 25, borderRadius : 12.5, backgroundColor : Colors.controlBackground, alignItems :"center",justifyContent : "center"}} >
              <Text style={{color : Colors.controlText}}>{messageNotSeenS.get(friend.email)}</Text>
            </View>
          </View>
}
          </TouchableOpacity>
        )
      })}
    </View>
    
   

   
   </View>
   </ScrollView>
    } />
   
  )
}

export default PersonsChat


const style1 = (chatsNumber : number) =>{

  return StyleSheet.create({
    

    containerStyle : {
      display : "flex",
      flexDirection : "row",
      justifyContent :"flex-start",
      
    },
  
    chatPeople : {
      borderTopWidth : 1,
      borderTopColor : "gray",
      justifyContent : "space-between",
      height : 100 * chatsNumber + 8 * chatsNumber,
      marginBottom : 50,
  
    },
  
    container : {
      padding : 8,
      justifyContent : "space-between",
      flexDirection : "column",
      
      
    },
  
    searchTextInput : {

  
    },
    friends : {
      display : "flex",
      flexDirection : "row",
      justifyContent : "space-between",
      height : 130,
      marginBottom : 20,
      paddingLeft : 10,
      paddingRight : 10,
      
    },
  
    imageStyle : {
      height : 65,
      width : 65,
      borderRadius : 65,
      marginBottom : 6,
    },
  
    cardContainer : {
      height : 120,
      width :120,
      alignItems:"center",
      justifyContent:"center",
      
    },
  
    cardContainer1 : {
      height : 100,
      width : 80,
      alignItems:"center",
      justifyContent:"center",
      
    },
  })
}

