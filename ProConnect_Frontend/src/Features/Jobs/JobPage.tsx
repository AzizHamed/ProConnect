import React, { useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { Job } from "../../Services/Redux/Api";
import ProCard from "../../Components/Layout/ProCard";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedJob, selectJob } from "./JobSlice";
import { useNavigation } from "@react-navigation/native";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import { formatDateString } from "../../Utility/Formatter";
import BackgroundView from "../../Components/Layout/BackgroundView";

function generateCardChildren(job: Job | null) {
  if (job == null)
    return (
      <View>
        <ProHeader text="No job selected." />
      </View>
    );
  return (
    <View>
      <ProHeader text={job.title} marginB-30 headerType={HeaderType.H1} />
      <Text>{job.description}</Text>
      <Text t2 textAlign="right" marginT-20 style={styles.date}>
        {formatDateString(job.datePosted)}
      </Text>
    </View>
  );
}

const JobCard: React.FC = () => {
  const job = useSelector(getSelectedJob);
  const navigation = useNavigation();
  const children = generateCardChildren(job);

  const dispatch = useDispatch();
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      dispatch(selectJob(null));
    }),
      [navigation];
  });
  return (
    <BackgroundView children={(
      <ScrollView>
      <View style={styles.cardContainer} bg>
        <ProCard children={children}></ProCard>
        <ProCard children={(
          <ProHeader text="Comments" headerType={HeaderType.H2}/>
          )}></ProCard>
        {/* textContent={content} */}
      </View>
    </ScrollView>
    )}/>
    
  );
};

export default JobCard;

const styles = StyleSheet.create({
  date: {
    alignSelf: "flex-end",
    verticalAlign: "bottom",
  },
  cardContainer: {
    alignContent: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  }
});
