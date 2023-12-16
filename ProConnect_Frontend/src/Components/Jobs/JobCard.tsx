import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  View,
  Text,
  Card,
  CardProps,
  TextProps,
} from "react-native-ui-lib";
import { Job } from "../../Models/Job";
import ProCard, { CardSectionContent } from "../Layout/ProCard";
import ProHeader, { HeaderType } from "../Layout/ProHeader";
import { useNavigation } from "@react-navigation/native";

interface JobCardProps {
  job: Job;
  radius?: number;
  onPress?: () => void;
}
// TODO: User picture, like comment share buttons
function generateCardChildren(job: Job) {
  return (
    <View>
        <ProHeader text={job.title} marginB-30 headerType={HeaderType.H3}/>
        <Text >
          {job.description}
        </Text>
        <Text t2 textAlign="right" marginT-20 style={styles.date}>
          {job.datePosted}
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
  const content = generateCardContent(job);
  const navigation = useNavigation();
  const onPress =
  props.onPress !== undefined
  ? props.onPress
  : () => {
    navigation.navigate("Job")
  };
  
  return (
    <View style={styles.card} bg>
    <ProCard children={children} radius={props.radius} onPress={onPress}></ProCard>
    {/* textContent={content} */}
    </View>);
};

export default JobCard;

const styles = StyleSheet.create({
  date: {
    alignSelf: "flex-end",
    verticalAlign: "bottom"
  },
  card:{
    width: '100%',
    marginHorizontal: 10
  }
});
