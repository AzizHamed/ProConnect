import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import { View } from 'react-native-ui-lib'
import { RequestTypes, defaultWidthValues } from '../../Constants/Values';
import { Colors } from 'react-native-ui-lib';
import ProButton from '../../Components/Controls/ProButton';
import { JobOffer, usePostJobOfferMutation } from '../../Services/Redux/Api';
import { useSelector } from 'react-redux';
import { getSelectedJob1, getSelectedReceiverUser } from '../../Services/Redux/Slices/ChatSlice';
import { getUserAccount } from '../../Services/Redux/Slices/AuthSlice';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native';


interface ModalDProps {
  send: (message: string) => void;
  setModalVisible: (visible: boolean) => void;
  userName: string;
}


const ModalD: React.FC<ModalDProps> = (props) => {
  const [displayText, setDisplayText] = useState('');
  const [initialOfferText, setInitialOfferText] = useState('');

  let budget = 0;
  const [RequestType, setRequestType] = useState("Job Offer")
  const [Budget, setBudget] = useState("0")
  const [Index, setIndex] = useState(0)

  const ReceiverUser = useSelector(getSelectedReceiverUser);
  const job = useSelector(getSelectedJob1)
  const senderUser = useSelector(getUserAccount)
  const [postJobOffer] = usePostJobOfferMutation();
  const width = defaultWidthValues();

  useEffect(() => {
    let interval: any = undefined;
    const timeOutId = setTimeout(() => {
      let currentIndex = 0;
      const text = "This is a job offer for the job:\n" + job?.title + "\n\nCost Estimate: " + (Budget || 0);
      const words = text.split(' ');
      setDisplayText('');
      setInitialOfferText(text);
      interval = setInterval(() => {
        if (currentIndex < words.length) {
          const currentWord = words[currentIndex];
          if (currentWord !== undefined) {
            setDisplayText((prevText) => prevText + ' ' + currentWord);
            currentIndex++;
          }
        }
      }, 50);

    }, 250);
    return () => {
      clearTimeout(timeOutId);
      if (interval) clearInterval(interval);
    }

  }, [RequestType, Budget]);



  function onChange(RequestType: string, Budget: string, index: number) {
    setRequestType(RequestTypes[Index].label);
    setBudget(Budget);
    setDisplayText('');
    setIndex(index);
  }

  return (
    <View margin-20 center backgroundColor={Colors.white} style={[styles.container, { width: (typeof width === 'number' ? width + 50 : width) }]}>
      <TouchableOpacity style={{ position: 'absolute', top: 35, right: 30 }} onPress={() => {
        props.setModalVisible(false);
      }} >
        <Entypo name="cross" size={24} color={Colors.failure} />
        <Entypo name="circle" size={24} color={Colors.failure} style={{ position: 'absolute', transform: [{ scale: 1.3 }] }} />
      </TouchableOpacity>

      <View invisible style={{ alignItems: "center" }}>
        <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>Send a Request</Text>
      </View>

      <View invisible marginB-5 style={{ alignItems: "center" }}>
        <Text style={{ color: "green", alignSelf: 'center' }}>Increase your chances</Text>
      </View>

      <View invisible style={styles.w95}>
        {/* <View invisible style={styles.RequestTypeContainer}>
          <Text style={styles.textStyle}>Request Type:</Text>

          <ProRNPickerSelect data={RequestTypes} onValueChange={(value) => { onChange(value, Budget, Number(value) - 1) }} index={Index} />
        </View> */}

        <View invisible row marginT-10 style={{ flexWrap: "wrap" }}>
          <Text style={styles.textStyle}>To:  </Text>
          <Text style={styles.textStyle}>{props.userName}</Text>
        </View>
        {job && <View invisible row marginV-10>
          <Text style={styles.textStyle}>Job:  {job?.title}</Text>
        </View>}

        <View invisible spread row style={styles.BudgetContainerContainer}>
          <Text style={styles.textStyle}>Price</Text>

          <TextInput inputMode='numeric' placeholder='Set Price' style={{ backgroundColor: "silver", height: 50, paddingLeft: 10, flexGrow: 1, marginLeft: 10 }} onChangeText={(text) => { setBudget(text) }} />
        </View>

        <View invisible style={styles.messageContainer}>
          <Text>Message</Text>
          <TextInput multiline={true} style={styles.messageStyle} editable={false} value={displayText} />
        </View>

        <View invisible style={{ alignItems: "center" }} marginT-15>
          <ProButton text={"Send"} onPress={() => {
            if (!senderUser || !ReceiverUser || !job) { console.log("Error: Missing data!"); return; }
            const jobOffer: JobOffer = { senderUser: senderUser, receiverUser: ReceiverUser, job: job, description: displayText, bid: Number(Budget) }
            console.log(jobOffer)
            postJobOffer({ jobOffer: jobOffer })
            props.send(initialOfferText);
            props.setModalVisible(false);
          }} />
          {/* <ProButton text={"Close"} mobileWidth={150} onPress={() => {
            props.setModalVisible(false);
          }} /> */}
        </View>
      </View>
    </View>
  )
}

export default ModalD


const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: "space-between",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 35
    // Change the width here
  },

  RequestTypeContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 68,
    justifyContent: "space-between",
    marginBottom: 20,
  },

  ReceiverContainer: {
    flexDirection: "row",
    alignItems: "center",
    // height: 68,
    width: "50%",
    marginBottom: 10,
  },
  BudgetContainerContainer: {
    // flexDirection: "row",
    alignItems: "center",
    height: 68,
    marginBottom: 20,

  },
  textStyle: {
    color: "black",
    fontSize: 15,
  },

  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 100,

  },
  messageStyle: {
    height: 200,
    backgroundColor: "silver",
    justifyContent: "flex-start",
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 10,
    textAlignVertical: "top",
    textAlign: "left",
    color: "black",
  },
  messageContainer: {
    justifyContent: "space-between",
    height: 222,
  },

});
