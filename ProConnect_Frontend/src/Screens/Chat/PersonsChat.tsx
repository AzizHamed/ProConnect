import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View,StyleSheet, Text, Dimensions, TouchableOpacity, ScrollView, Modal } from 'react-native'
import MyTextInput from '../../Components/Controls/MyTextInput'
import { Ionicons,EvilIcons } from '@expo/vector-icons';
import PersonCard from '../../Features/Persons/PersonCard';
import { useGetAllUsersQuery } from '../../Services/Redux/Api';
import { Colors } from 'react-native-ui-lib';
import BackgroundView from '../../Components/Layout/BackgroundView';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setChat } from '../../Services/Redux/Slices/ChatSlice';
import { database, auth } from '../../Services/Firebase/Firebase';
import { collection, orderBy, query, where, limit, onSnapshot,or } from 'firebase/firestore';
import { checkName } from '../../Constants/Functions/Functions';
import ProButton from '../../Components/Controls/ProButton';
import RateModal from './RateModal';



const PersonsChat = () => {

  const { data, isSuccess, isError, error, refetch } = useGetAllUsersQuery({});

  const [data1, setdata1] = useState(data?.filter((user) => user.email !== auth.currentUser?.email))

  let textInput = ""

  const collectionRef = collection(database, 'chats');

  const q = query(collectionRef, orderBy('createdAt', 'desc'));

  const uniqueResults = new Set();

  const [rateModalVisible, setrateModalVisible] = useState(false)

  const [selectedUser, setselectedUser] = useState(null)


  useLayoutEffect(() => {

    const user = { _id: auth.currentUser?.email };
    const results = query(
      collectionRef,
      or(
      where('user', 'in', [user]),
      where('ReceiverUser', 'in', [user])),
      orderBy('createdAt', 'asc'),
    );


    


    const unsubscribe = onSnapshot(results, querySnapshot => {

      querySnapshot.docs.forEach((doc) => {
        if(!uniqueResults.has(doc.data().ReceiverUser._id) && doc.data().ReceiverUser._id !== auth.currentUser?.email)
          uniqueResults.add(doc.data().ReceiverUser._id);

        if(!uniqueResults.has(doc.data().user._id) && doc.data().user._id !== auth.currentUser?.email)
          uniqueResults.add(doc.data().user._id);
      })

      console.log(uniqueResults.forEach((result) => console.log(result)))
    });

    return unsubscribe;
  },[]);


  useEffect(() => {
    filterUsers()
  } ,[data])


  

  const dispatch = useDispatch();

  let schatNumber = data1?.length
  const {height,width} = Dimensions.get('window');
  var numberofImages = 0
  const navigation = useNavigation();

  let chatNumber = data1 === undefined ? 0 : data1.length
  const style = style1(chatNumber);


  function filterUsers (){
    if(textInput === "")
      setdata1(data?.filter((user) => user.email !== auth.currentUser?.email && user.name.lastName!== "Admin" && user.name.firstName !== ""))
    else
      setdata1(data?.filter((user) =>  user.email !== auth.currentUser?.email && user.name.lastName!== "Admin" && user.name.firstName !== "" && checkName(textInput, user.name.firstName, user.name.lastName)))

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

    <RateModal setModalVisible={setrateModalVisible} user={selectedUser} />
        </Modal>
        </View>



     

   <View style={style.container}> 
    <View style={style.searchTextInput}>
      <MyTextInput onChange={(onChangeText)} placeHolder={'Search'} icon={<EvilIcons name='search'  size={45} style={{backgroundColor:"white"}}/>} />
    </View>
   



    <View style={style.chatPeople}>
      {isSuccess && data1?.map((friend)=> {
        return(
          <TouchableOpacity style={{flexDirection : "row", justifyContent: "space-between" , paddingRight : 25}} onPress={()=>{
            dispatch(setChat({ReceiverEmail : friend.email , openModal : false, receiverUserName : friend.name.firstName + " " + friend.name.lastName}))
            
            navigation.navigate("Chats")
          }} >
          <PersonCard imageurl={''} imageStyle={style.imageStyle} user={friend} componentsUnderImage={[]} cardContainerStyle={style.cardContainer1} additionalComponents={[<Text style={{color : "white"}}>{friend.name.firstName} {friend.name.lastName}</Text>]} containerStyle={style.containerStyle}/>


          <ProButton text={"Rate"} width={50} onPress={()=>{setselectedUser(friend)
             setrateModalVisible(true)}}/>


          


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

