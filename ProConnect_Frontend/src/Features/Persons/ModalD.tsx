import React, { useEffect, useState } from 'react'
import { View ,StyleSheet,Text, TextInput, Dimensions, TouchableWithoutFeedback} from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
import { RequestTypes } from '../../Constants/Values';
import ProRNPickerSelect from '../../Components/Layout/ProRNPickerSelect';
import ProTextInput from '../../Components/Controls/ProTextInput';
import { Colors } from 'react-native-ui-lib';
import ProButton from '../../Components/Controls/ProButton';
import { set } from 'date-fns';
import { ka } from 'date-fns/locale';
import { PostJobOfferApiArg, User, usePostJobOfferMutation } from '../../Services/Redux/Api';
import { auth } from '../../Services/Firebase/Firebase';
import { useSelector } from 'react-redux';
import { getSelectedJob1, getSelectedReceiverUser } from '../../Services/Redux/Slices/ChatSlice';
import { getUserAccount } from '../../Services/Redux/Slices/AuthSlice';


interface ModalDProps {
  send : (message : string) => void;
  setModalVisible : (visible : boolean) => void;
  userName : string;
}


const ModalD :React.FC<ModalDProps> =  (props) => {
  const [displayText, setDisplayText] = useState('');

  let budget = 0;
  const [RequestType, setRequestType] = useState("Job Offer")
  const [Budget, setBudget] = useState("0")
  const [Index, setIndex] = useState(0)
  const text = "This is a " + RequestType + "\n Budget :" + Budget
  const words = text.split(' ');

  const ReceiverUser = useSelector(getSelectedReceiverUser);
  const job = useSelector(getSelectedJob1)
  const senderUser = useSelector(getUserAccount)
  const [postJobOffer] = usePostJobOfferMutation();

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayText((prevText) => prevText + ' ' + words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [RequestType,Budget]);



  function onChange(RequestType : string, Budget : string, index : number){
    setRequestType(RequestTypes[Index].label);
    setBudget(Budget);
    setDisplayText('');
    setIndex(index);
  }

  return (



    
    <View style={styles.container}>
      <View style={{alignItems : "center", width : "90%"}}>
      <Text style={{color : "black", fontSize : 20, fontWeight : "bold"}}>Send a Request</Text>
      </View>

      <View style={{alignItems : "center", width : "100%", right : 20}}>

      <Text style={{color : "green"}}>Increase your chances</Text>
      </View>
     
      <View style={{width : "90%"}}>
        <View style={styles.RequestTypeContainer}>
          <Text style={styles.textStyle}>Request Type:</Text>
          
          <ProRNPickerSelect  data={RequestTypes} onValueChange={(value) => { onChange(value, Budget, Number(value) - 1)} } index={Index} />
        </View>

        <View style={styles.ReceiverContainer}>

          <Text style={styles.textStyle}>To:  </Text>

          <Text style={styles.textStyle}>{props.userName}</Text>
        </View>

        <View style={styles.BudgetContainerContainer}>
          <Text style={styles.textStyle}>Budget     </Text>

          <TextInput placeholder='Set Budget' style={{backgroundColor : "silver" , width : "90%", height : 50, paddingLeft : 10} } onChangeText={(text)=>{onChange(RequestType,text,Index)}}/>
        </View>

        <View style={styles.messageContainer}>
          <Text>Message</Text>
          <TextInput multiline={true} style={styles.messageStyle} editable={false} value={displayText}/>
        </View>

        <View style={styles.buttonsContainer}>
        <ProButton text={"Send"} mobileWidth={150} onPress={()=>{
          const jobOffer = {jobOffer : {senderUser : senderUser, receiverUser : ReceiverUser, job : job, description : displayText, bid : Number(Budget)}}
          console.log(jobOffer)
          postJobOffer(jobOffer)
          props.send(text);
          props.setModalVisible(false);
        }}/>
        <ProButton text={"Close"} mobileWidth={150} onPress={()=>{
        props.setModalVisible(false);
        }}/>
        </View>
      </View>
    </View>

      
    
  )
}

export default ModalD


const styles = StyleSheet.create({

  container : {
    marginTop : 100,
    marginLeft : 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft :35 ,
    paddingTop : 35,
    alignItems: 'flex-start',
    justifyContent : "space-between",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // Change the width here
    width: 375, // Adjust this value as needed
    height: 700, // Adjust this value as needed
  },

  RequestTypeContainer: {
    flexDirection: "row",
    alignItems : "center",
    height : 68,
    justifyContent : "space-between",
    marginBottom : 20,
  },

  ReceiverContainer : {
    flexDirection: "row",
    alignItems : "center",
    height : 68,
    width : "50%",
    marginBottom : 20,
  },
  BudgetContainerContainer : {
    flexDirection: "row",
    alignItems : "center",
    height : 68,
    width : "90%",
    marginBottom : 20,

  },
  textStyle : {
    color : "black",
    fontSize : 15,
    },

  buttonsContainer : {
    flexDirection: "row",
    justifyContent : "space-between",
    width : "100%",
    height : 100,

  },
  messageStyle:{
    height : 200,
    backgroundColor : "silver",
    justifyContent : "flex-start",
    paddingLeft : 8,
    paddingRight : 8,
    paddingTop : 10,
    textAlignVertical : "top",
    textAlign : "left",
    color : "black",
  },
  messageContainer : {
    justifyContent : "space-between",
    height : 222,
  },

});
