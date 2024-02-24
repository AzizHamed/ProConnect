import React from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  CardProps,
} from "react-native-ui-lib";
import ProCard, { CardSectionContent } from "../../Components/Layout/ProCard";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import { useNavigation } from "@react-navigation/native";
import { formatDateString } from "../../Utility/Formatter";
import { useDispatch } from "react-redux";
import { selectJob } from "../../Services/Redux/Slices/JobSlice"
import { Job } from "../../Services/Redux/Api";

interface JobCardProps {
  job: Job;
  radius?: number;
  autoAdjustWidth?: boolean;
  onPress?: () => void;
}

// TODO: User picture, like comment share buttons
function generateCardChildren(job: Job) {
  return (
    <View>
        <ProHeader text={job.title} marginB-30 headerType={HeaderType.H3}/>
        <Text ellipsizeMode="tail" numberOfLines={3}>
          {job.description}
        </Text>
        <Text t2 textAlign="right" marginT-20 style={styles.date}>
          {formatDateString(job.datePosted)}
        </Text>
    </View>
  );
}

function generateCardContent(job: Job): CardSectionContent[] {
  const content: CardSectionContent[] = [];
  
  content.push({text: job.title, "marginB-30":true, h3: true})
  content.push({text: job.description})
  // content.push({text: job.datePosted, "marginT-20":true, textAlign:"right", flex:true})
  return content;
}

const JobCard: React.FC<JobCardProps & CardProps> = (props) => {
  const job = props.job;
  const children = generateCardChildren(job);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const onPress = props.onPress !== undefined ? props.onPress : () => {
    dispatch(selectJob(job));
    navigation.navigate("Job");
  };
  
  return (
      <ProCard style={{minWidth: 10, width:"95%"}} webWidth={"95%"}  children={children} radius={props.radius} onPress={onPress}/>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  date: {
    alignSelf: "flex-end",
    verticalAlign: "bottom"
  }
});