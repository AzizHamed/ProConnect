import React from "react";
import { StyleSheet, Touchable, TouchableOpacity } from "react-native";
import {
  View,
  Text,
  CardProps,
  Image
} from "react-native-ui-lib";
import ProCard, { CardSectionContent } from "../../Components/Layout/ProCard";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import { useNavigation } from "@react-navigation/native";
import { formatDateString } from "../../Utility/Formatter";
import { useDispatch } from "react-redux";
import { selectJob } from "../../Services/Redux/Slices/JobSlice"
import { Job } from "../../Services/Redux/Api";
import ProCarousel from "../../Components/Controls/ProCarousel";
import { IS_WEB } from "../../Constants/Values";
import ProButton from "../../Components/Controls/ProButton";
import { setChat } from "../../Services/Redux/Slices/ChatSlice";

interface JobCardProps {
  job: Job;
  radius?: number;
  autoAdjustWidth?: boolean;
  onPress?: () => void;
}

// TODO: User picture, like comment share buttons

function generateCardContent(job: Job): CardSectionContent[] {
  const content: CardSectionContent[] = [];
  
  content.push({ text: job.title, "marginB-30": true, h3: true })
  content.push({ text: job.description })
  // content.push({text: job.datePosted, "marginT-20":true, textAlign:"right", flex:true})
  return content;
}

const JobCard: React.FC<JobCardProps & CardProps> = (props) => {
  const job = props.job;
  const children = generateCardChildren(job);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const onPress = props.onPress !== undefined ? props.onPress : () => {
    dispatch(selectJob(job));
    navigation.navigate("Job");
  };

  
  
  function generateCardChildren(job: Job) {
    const SendOfferButton =  <ProButton text={"Send Offer"} onPress={()=>{
      console.log(job?.owner)
      dispatch(setChat({receiverUserName: job.owner?.name.firstName + " " + job.owner?.name.lastName, ReceiverEmail: job.owner?.email, openModal: true, receiverUser: job.owner, job: job, receiverPhotoUrl: job.owner?.photoUrl}))
      navigation.navigate("Chats")
    }}/>
    const CardHeader = <View flex-1 flexG>
      <ProHeader text={job.title} marginB-5 headerType={HeaderType.H3} />
      {/* <TouchableOpacity onPress={()=>{dispatch}}> */}
        <Text marginT-0 marginB-20>{`by ${job.owner?.name.firstName} ${job.owner?.name.lastName}`}</Text>
      {/* </TouchableOpacity> */}
      <Text ellipsizeMode="tail" numberOfLines={3}>
        {job.description}
      </Text>
    </View>;

    if(IS_WEB())
    return (
      <View>
        <View row>
          {CardHeader}

          <TouchableOpacity onPress={()=>{}}>
          <View width={300} height={300} center flex>
            {job.photos && job.photos.length > 0 && <ProCarousel onSnapToItem={setSelectedImageIndex}
             width={300} mode="parallax" blockClicks overflow="hidden" arrowOffset={10} displayArrows data={job.photos} renderItems={({ item, index }) => {
              return <Image source={{ uri: item }} style={{ width: 300, height: 300 }} resizeMode='contain' />
            }} marginT-20 />}

            {SendOfferButton}
          </View>
          </TouchableOpacity>
        </View>
        <Text t2 textAlign="right" marginT-20 style={styles.date}>
          {formatDateString(job.datePosted)}
        </Text>
      </View>
    );
    return (
      <View>
          {CardHeader}
          
         
          <View flexS center>
            {job.photos && job.photos.length > 0 && <ProCarousel mode="parallax" arrowOffset={10} displayArrows data={job.photos} renderItems={({ item, index }) => {
              return <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            }} marginT-20 />}
             {SendOfferButton}
          </View>
         
        <Text t2 textAlign="right" marginT-20 style={styles.date}>
          {formatDateString(job.datePosted)}
        </Text>

      </View>
    );
  }
  return (
    <ProCard style={{ minWidth: 10, width: "95%" }} webWidth={"95%"} children={children} radius={props.radius} onPress={onPress} />
  );
};

export default JobCard;

const styles = StyleSheet.create({
  date: {
    alignSelf: "flex-end",
    verticalAlign: "bottom"
  }
});