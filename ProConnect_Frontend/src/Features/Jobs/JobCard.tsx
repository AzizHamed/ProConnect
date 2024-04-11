import React from "react";
import { StyleSheet } from "react-native";
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

interface JobCardProps {
  job: Job;
  radius?: number;
  autoAdjustWidth?: boolean;
  onPress?: () => void;
}

// TODO: User picture, like comment share buttons
function generateCardChildren(job: Job) {
  if(IS_WEB())
  return (
    <View>
      <View row>
        <View flex-1 flexG>
          <ProHeader text={job.title} marginB-30 headerType={HeaderType.H3} />
          <Text ellipsizeMode="tail" numberOfLines={3}>
            {job.description}
          </Text>
        </View>
        <View flexS>
          {job.photos && job.photos.length > 0 && <ProCarousel displayArrows data={job.photos} renderItems={({ item, index }) => {
            return <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
          }} marginT-20 />}
        </View>
      </View>
      <Text t2 textAlign="right" marginT-20 style={styles.date}>
        {formatDateString(job.datePosted)}
      </Text>
    </View>
  );
  return (
    <View>
        <View flex-1 flexG>
          <ProHeader text={job.title} marginB-30 headerType={HeaderType.H3} />
          <Text ellipsizeMode="tail" numberOfLines={3}>
            {job.description}
          </Text>
        </View>
        <View flexS>
          {job.photos && job.photos.length > 0 && <ProCarousel displayArrows data={job.photos} renderItems={({ item, index }) => {
            return <Image source={{ uri: item }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
          }} marginT-20 />}
        </View>
      <Text t2 textAlign="right" marginT-20 style={styles.date}>
        {formatDateString(job.datePosted)}
      </Text>
    </View>
  );
}

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
  const onPress = props.onPress !== undefined ? props.onPress : () => {
    dispatch(selectJob(job));
    navigation.navigate("Job");
  };

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