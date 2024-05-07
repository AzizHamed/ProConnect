import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { View, Text, Image, Keyboard, TouchableWithoutFeedback, Modal, StyleSheet, TouchableOpacity, KeyboardAvoidingView, PermissionsAndroid } from 'react-native'
import { GiftedChat, Bubble, BubbleProps, IMessage, MessageProps, Time, InputToolbar, Send, Composer } from 'react-native-gifted-chat'
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
import { listFiles,storage ,database, auth, uploadSelectedFiles } from '../../Services/Firebase/Firebase';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedChatEmail, getSelectedChatModal, getSelectedReceiverUser, getSelectedReceiverUserName } from '../../Services/Redux/Slices/ChatSlice';
import ModalD from '../../Features/Persons/ModalD';
import { User } from '../../Services/Redux/Api';
import { LinearGradient } from 'expo-linear-gradient';
import ProButton from '../../Components/Controls/ProButton';
import ProImagePicker from '../../Components/Controls/ProImagePicker';
import { SelectedFile } from '../../Constants/Types';
import { Button, Colors } from 'react-native-ui-lib';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as Location from 'expo-location';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useImagePicker } from '../../Hooks/useImagePicker';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { setFullScreenMap } from '../../Services/Redux/Slices/FullScreenMapSlice';
import LocationModal from './LocationModal';
import * as Contacts from 'expo-contacts';
import ContactsModal from './ContactsModal';
import { setPersonChat } from '../../Services/Redux/Slices/PersonChatSlice';
import { selectUser } from '../../Services/Redux/Slices/UserSlice';
import { IS_WEB } from '../../Constants/Values';




interface ChatProps {
  user1: string;
  user2: string;
}
const Chat: React.FC<ChatProps> = (props) => {


    const [contacts, setcontacts] = useState<any[]>([])

   const naviagtion = useNavigation()

   const dispatch = useDispatch();
    const filesRef = useRef<any>([]);


    const receiverUser = useSelector(getSelectedReceiverUserName)
    // const docRef = useRef<any>([]);



    const [messages, setMessages] = useState<IMessage[]>([])

    const ReceiverEmail = useSelector(getSelectedChatEmail)

    const modalOpened = useSelector(getSelectedChatModal)
    const { selectPictures, selectedFiles, removeSelectedPicture, clear } = useImagePicker();


  const [ModalVisible, setModalVisible] = useState(modalOpened)
  const [showOptions, setShowOptions] = useState(false);

  const  [locationModal, setlocationModal] = useState(false)

  const [latitude1, setlatitude1] = useState(0)

  const [longitude1, setlongitude1] = useState(0)

  const [VisibleContactModal, setVisibleContactModal] = useState(false)

  const receiverUser1 = useSelector(getSelectedReceiverUser)


  // const reRenderPersonChat = useSelector(getSelectedReRenderFunction)

  dispatch(selectUser(receiverUser1))

  useEffect(() => {
    filesRef.current = selectedFiles;
    // dispatch(setPersonChat({enterToCode : true}))
    // if(reRenderPersonChat!== undefined)
    // reRenderPersonChat(true)
  }, [selectedFiles]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // Trigger re-render of PersonsChat component when navigating to Chats screen
  //     // Update the reRender state variable to true
  //     // This will cause the PersonsChat component to re-render
  //     console.log('Navigated to Chats screen');
  //     setReRender(true);
  //   });

  //   return unsubscribe;
  // }, [navigation]);


  // useEffect(() => {
  //   docRef.current = selectedFiles;
  // }, [selectedFiles]);


  useLayoutEffect(() => {

    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));


    const user = { _id: auth.currentUser?.email };
    const ReceiverUser = { _id: ReceiverEmail };
    const results = query(
      collectionRef,
      where('user', 'in', [user, ReceiverUser]),
      where('ReceiverUser', 'in', [user, ReceiverUser]),
      orderBy('createdAt', 'desc')
    );





    const unsubscribe = onSnapshot(results, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => {
          const isCurrentUserReceiver = auth.currentUser?.email === doc.data().ReceiverUser._id;
          if (isCurrentUserReceiver && !doc.data().seen) {
            
            updateDoc(doc.ref, { seen: true })
          }
          return {
            _id: doc.id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text ==="File" ? "" : doc.data().text,
            user: doc.data().user,
            ReceiverUser: doc.data().ReceiverUser,
            isAccepted: doc.data().isAccepted,
            isRejected: doc.data().isRejected,
            GoldMessage: doc.data().GoldMessage,
            image: doc.data().image,
            location: doc.data().location,
            latitude: doc.data().latitude,
            longitude: doc.data().longitude,
            isContact: doc.data().isContact,
            contactName: doc.data().contactName,
            contactNumber: doc.data().contactNumber,
            seen: isCurrentUserReceiver ? true : doc.data().seen,
          };
        })
      );
    });
    
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, messages)}
      
    );


    const { createdAt, text, user, ReceiverUser, GoldMessage, isAccepted, isRejected, image,location, latitude, longitude,isContact,contactName, contactNumber, seen } = messages[0];
    addDoc(collection(database, 'chats'), {
      createdAt,
      text,
      user,
      ReceiverUser,
      GoldMessage,
      isAccepted,
      isRejected,
      image,
      location,
      latitude,
      longitude,
      isContact,
      contactName,
      contactNumber,
      seen,
    });

  }, []);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
      });
      if (data.length > 0) {
        setcontacts(data);
      }
    } else {
      console.error('Permission to access contacts was denied');
    }

    setVisibleContactModal(true)


  
  };




  const updateMessage = async (messageId: string, newData: Partial<IMessage>) => {
    const messageRef = doc(database, 'chats', messageId); // Construct a reference to the message document

    try {
      await updateDoc(messageRef, newData); // Update the document with the new data
      console.log('Message updated successfully');
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };


  const convertToIMessage = (text: string) => {
    const newMessage = {
      text: text, // The message text
      createdAt: new Date(), // The timestamp of when the message was created
      user: { _id: auth?.currentUser?.email || '' }, // The user object representing the sender of the message
      ReceiverUser: { _id: ReceiverEmail },
      GoldMessage: true,
      isAccepted: false,
      isRejected: false,
      image: "", 
      location : false,
      latitude : 0,
      longitude : 0,
      isContact : false,
      contactName : "",
      contactNumber : "",
      seen : false,
     
    };
    return newMessage;
  };

  const convertLocationToIMessage = (latitude: number, longitude : number) => {
    const newMessage = {
      _id : Math.random().toString(36).substring(7),
      text: "", // The message text
      createdAt: new Date(), // The timestamp of when the message was created
      user: { _id: auth?.currentUser?.email || '' }, // The user object representing the sender of the message
      ReceiverUser: { _id: ReceiverEmail },
      GoldMessage: false,
      isAccepted: false,
      isRejected: false,
      image: "",
      location : true,
      latitude : latitude,
      longitude : longitude,
      isContact : false,
      contactName : "",
      contactNumber : "",
      seen : false,

    };
    return newMessage;
  };

  const convertContactToMessage = (contact : any) => {
    const newMessage = {
      _id : Math.random().toString(36).substring(7),
      text: contact.phoneNumbers === undefined ? `${contact.name}` : `${contact.name}\n${contact.phoneNumbers[0].number}`, 
      createdAt: new Date(), // The timestamp of when the message was created
      user: { _id: auth?.currentUser?.email || '' }, // The user object representing the sender of the message
      ReceiverUser: { _id: ReceiverEmail },
      GoldMessage: false,
      isAccepted: false,
      isRejected: false,
      image: "",
      location : false,
      latitude : 0,
      longitude : 0,
      isContact : true,
      contactName : contact.name,
      contactNumber : contact.phoneNumbers !== undefined ? contact.phoneNumbers[0].number : "",
      seen : false,

    };
    return newMessage;
  };

  const convertPhotoToIMessage = (uri: string) => {
    const newMessage = {
      _id : Math.random().toString(36).substring(7),
      text: 'File', // The message text
      createdAt: new Date(), // The timestamp of when the message was created
      user: { _id: auth?.currentUser?.email || '' }, // The user object representing the sender of the message
      ReceiverUser: { _id: ReceiverEmail },
      GoldMessage: false,
      isAccepted: false,
      isRejected: false,
      image: uri,
      location : false,
      latitude : 0,
      longitude : 0,
      isContact : false,
      contactName : "",
      contactNumber : "",
      seen : false,
    };
    return newMessage;
  };


  

  const sendMessage = (text: string) => {
    const message = convertToIMessage(text);
    onSend([message]);
    // Add logic to send the message to the backend or wherever it needs to go
  };


  const sendPhoto = (uri: string) => {
    const message = convertPhotoToIMessage(uri);;
    onSend([message]);
  }





  function getModal() {
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
            <ModalD send={sendMessage} setModalVisible={setModalVisible} userName={receiverUser} />
          </Modal>
        </View>
      )
  }

  const BubbleChat = (props: Readonly<BubbleProps<IMessage>>) => {
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

      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonsStyleAccept} onPress={() => {
            updateMessage(messageId || '', { isAccepted: true });
          }}>
            <Text style={styles.textStyle}>Accept</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonsStyleReject} onPress={() => {
            updateMessage(messageId || '', { isRejected: true });
          }}>
            <Text style={styles.textStyle}>Reject</Text>
          </TouchableOpacity>
        </View>
      );

      return null;
    };

    const renderTime = (props: Readonly<BubbleProps<IMessage>>) => {
      return (
        <Time
          {...props}
          timeTextStyle={{
            left: {
              color: goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ? "white" : "gray"
            },
            right: {
              color: goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ? "white" : "white"
            }
          }}

          
        />
      );
    };

    


    const renderTimeLocation = (props: Readonly<BubbleProps<IMessage>>) => {
      return (
        <Time
          {...props}
          containerStyle={{
            left: {
              position: "absolute",
              bottom : 10,
              left : 2
            },

            right : {
              position : "absolute",
              bottom : 20,
              right : 2,

            }
          }}

          timeTextStyle={{
            right : {
              color : "black",
              fontWeight : "bold",
            
            },

            left : {
              color : "black",
              fontWeight : "bold",
            }
          }}

          
        />
      );
    };


    const renderBubble = (props: Readonly<BubbleProps<IMessage>>) => {
      
      if(props.currentMessage?.location === true){
        if(IS_WEB())
          return <></>;
        return (          
          <View>
           
           <TouchableOpacity onPress={()=>{
            dispatch(setFullScreenMap({latitude : props.currentMessage?.latitude, longitude : props.currentMessage?.longitude}))
            naviagtion.navigate("FullMapScreen")
           }}>
            <View style={{width : 150, height : 110, backgroundColor:  "blue", alignItems : "center", justifyContent : "center"}}>
              

            <MapView
              style={{  width : 145, height : 105 }}
              initialRegion={{
                latitude: props.currentMessage?.latitude || 0,
                longitude: props.currentMessage?.longitude || 0,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker coordinate={{ latitude: props.currentMessage.latitude || 0, longitude: props.currentMessage.longitude || 0}} />
            </MapView>
             
          
            </View>

            </TouchableOpacity>


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

              renderTime={renderTimeLocation}

              

            />
            
          </View>
        );
      }

    else {
      if (auth.currentUser?.email !== props.currentMessage?.user._id && isAccepted === false && isRejected === false && goldMessage === true) {
        return (
          
          <View key={props.currentMessage?._id} style={styles.messageContainer}>
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
                right: {
                  marginRight: 55,
                },

                left: {
                  marginLeft: 55,

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


              left: {
                color: goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ? "white" : "black",


              },

              right: {
                color: goldMessage && isRejected === false && isAccepted === false ? "black" : goldMessage ? "white" : "white",

              },


            }}

            renderTime={renderTime}












          />
        )
      }
    }

    }
    return (
      renderBubble(props) // Pass the required argument to the renderBubble function
    )
  }


  const RenderInputToolbar = (props: any) => (
    <InputToolbar  {...props} renderAccessory={renderAccessory} renderActions={renderAction} renderSend={renderSend} accessoryStyle={{ height: showOptions ? 130 : 0, backgroundColor: "silver" }} />
  );

  async function chooseFile() {
    console.log(filesRef.current)
    clear();
    await selectPictures('GALLERY', true);
    setShowOptions(!showOptions)
    setTimeout(async () => {

      console.log(filesRef.current)
      console.log(554654654)
      let i = 0
      const user = auth.currentUser;
      uploadSelectedFiles('chats', Array.from(filesRef.current), user).then((downloadUrls) => {
        for (i = 0; i < downloadUrls.length; i++) {

          sendPhoto(downloadUrls[i]);
        }

      }).catch((error) => {
        console.log('Error posting job:', error);
      });

    }, 100)

    // 

  }


  async function openCamera (){
    clear();
    await selectPictures('CAMERA', true);
    setShowOptions(!showOptions)
    setTimeout(async () => {

    
      let i = 0
      const user = auth.currentUser;
      uploadSelectedFiles('chats', Array.from(filesRef.current), user).then((downloadUrls) => {
        for (i = 0; i < downloadUrls.length; i++) {

          sendPhoto(downloadUrls[i]);
        }

      }).catch((error) => {
        console.log('Error posting job:', error);
      });

    }, 100)

  }




 const sendLocation = async () => {
  try {
    // Request permission to access the device's location
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      // Permission not granted
      console.error('Permission to access location was denied');
      return;
    }

   

 } catch (error) {
    console.error('Error getting location:', error);
  }

   // Get the device's current location
   const location = await Location.getCurrentPositionAsync({});
   const { latitude, longitude } = location.coords;

  setlatitude1(latitude)
  setlongitude1(longitude)

   

    const message = convertLocationToIMessage(latitude,longitude);

    setlocationModal(true)

    
    //onSend([message]);


}

  const renderAccessory = (props: any) => (

    <View style={{ flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", padding: 20 }}>
      <TouchableOpacity style={styles.actionContainer} onPress={chooseFile}>
        <View style={styles.actions}>
          <Ionicons name='images' size={40} color={Colors.$backgroundDarkElevated} />
        </View>
        <Text>Photos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionContainer} onPress={openCamera}>
        <View style={styles.actions}>
          <Ionicons name='camera' size={40} color={Colors.$backgroundDarkElevated} />
        </View>
        <Text>Camera</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.actionContainer} onPress={sendLocation}>
        <View style={styles.actions}>
          <Ionicons name='location' size={40} color={Colors.$backgroundDarkElevated} />
        </View>
        <Text>Location</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.actionContainer} onPress={getContacts}>
        <View style={styles.actions}>
          <MaterialIcons name='contacts' size={40} color={Colors.$backgroundDarkElevated} />
        </View>
        <Text>Contacts</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.actionContainer} onPress={()=>{}}>
        <View style={styles.actions}>
          <Ionicons name='document' size={40} color={Colors.$backgroundDarkElevated} />
        </View>
        <Text>Document</Text>
      </TouchableOpacity> */}


      
    </View>
  )



  const renderSend = (props: any) => (
    <Send {...props} containerStyle={{ alignItems: "center" }} />
  )
  const renderAction = (props: any) => (
    <View style={{ flexDirection: "row", height: "100%", width: 70, alignItems: "center", justifyContent: "space-between", paddingLeft: 5 }}>

      <TouchableOpacity onPress={openCamera}>
        <AntDesign name='camera' size={30} color={Colors.$backgroundDarkElevated} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => {
         Keyboard.dismiss();
         setShowOptions(!showOptions) }}>
          {!showOptions &&
        <Ionicons name='add-outline' size={30} color={Colors.$backgroundDarkElevated} />
          }
          {showOptions &&
        <AntDesign name='minus' size={30} color={Colors.$backgroundDarkElevated} />
          }
      </TouchableOpacity>
    </View>
  )





  function getLocationModal(){
    return (
    <Modal visible={locationModal} transparent={true}>
      <LocationModal latitude={latitude1} longitude={longitude1} onSendLocation={onSend} setVisible={setlocationModal} convertLocationToMessage={convertLocationToIMessage} />
    </Modal>
    )
  }


  function getContactsModal(){
    return (
      <Modal visible={VisibleContactModal} transparent={false}>
        <ContactsModal setVisble={setVisibleContactModal} contacts={contacts} onSendContact={onSend} convertContactToMessage={convertContactToMessage}  />
      </Modal>
      )
  }

  return (
    <View style={{ flex: 1 }}>




      {getModal()}

      {getLocationModal()}

      {getContactsModal()}
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
          GoldMessage: false,
          isAccepted: false,
          isRejected: false,
          image: "",
          location : false,
          latitude: 0,
          longitude: 0,
          isContact: false,
          contactName : "",
          contactNumber : "",
          seen : false,




        })))}
        user={{
          _id: auth?.currentUser?.email || 'aziz26@gmail.com',
        }}

        renderInputToolbar={RenderInputToolbar}


      />





    </View>







  )
}

export default Chat

const styles = StyleSheet.create({

  actionContainer: {

    alignItems: "center",
    marginBottom: 30,
    marginRight: 10,
  },

  actions: {
    backgroundColor: "white",
    height: 70,
    width: 70,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,

  },

  modalBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color
  },
  modalContainer: {
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
    justifyContent: "space-between",
    width: 175,

  },

  buttonsStyleAccept: {
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
    width: "auto"
  },
  buttonsStyleReject: {
    backgroundColor: '#e62143',
    borderRadius: 8,
    borderWidth: 0,
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

  textStyle: {
    color: "white",

  },
  messageContainer: {
    alignItems: "center",
    backgroundColor: "#FFE373",
    borderRadius: 20,
    width: "auto"
  }
})
