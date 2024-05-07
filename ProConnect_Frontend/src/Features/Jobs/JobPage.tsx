import React, { useEffect } from "react";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { View, Text } from "react-native-ui-lib";
import { Job, useUpdateJobStatusMutation } from "../../Services/Redux/Api";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, getSelectedJob, selectJob, setJobs } from "../../Services/Redux/Slices/JobSlice";
import { useNavigation } from "@react-navigation/native";
import ProHeader, { HeaderType } from "../../Components/Layout/ProHeader";
import { formatDateString } from "../../Utility/Formatter";
import BackgroundView from "../../Components/Layout/BackgroundView";
import JobCard from "./JobCard";
import { getUserAccount } from "../../Services/Redux/Slices/AuthSlice";

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

const JobPage: React.FC = () => {
  const job = useSelector(getSelectedJob);
  const allJobs = useSelector(getJobs);
  const user = useSelector(getUserAccount);
  const navigation = useNavigation();
  const [updateJobStatus] = useUpdateJobStatusMutation();
  const children = generateCardChildren(job);
  const defaultJob: Job = { title: "", description: "" };
  const dispatch = useDispatch();
 
  useEffect(() => {
    navigation.addListener("beforeRemove", (e) => {
      dispatch(selectJob(null));
    }),
      [navigation];      
  });

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    console.log('UseEffect', user?.id, job?.owner?.id);
    if (user?.id === job?.owner?.id) {
      navigation.setOptions({
        headerRight: () => (

          <TouchableOpacity onPress={() => {
            if(job === undefined || job?.id == undefined) return;
            updateJobStatus({jobId: job?.id, jobStatus: "Finished"}).unwrap()
            .then((job) => {
              dispatch(selectJob(null));
              dispatch(setJobs(allJobs.map((j) => j.id === job.id ? job : j)));
              navigation.goBack();
            })
            .catch((error) => {console.log(error); navigation.reset({index: 0, routes: [{name: "Main"}]});});
          }}>
            <Text marginR-20>Mark Job as Done</Text>
          </TouchableOpacity>
        ),
      });
    } else {
      navigation.setOptions({
        headerRight: () => (<></>),
      });

    }
  }, [navigation, job, user]);

  return (
    <BackgroundView children={(
      <ScrollView>
        <View style={styles.cardContainer} bg>
          <JobCard job={job}></JobCard>
          {/* <ProCard children={children}></ProCard>
        <ProCard children={(
          <ProHeader text="Comments" headerType={HeaderType.H2}/>
          )}></ProCard> */}
        </View>
      </ScrollView>
    )} />

  );
};

export default JobPage;

const styles = StyleSheet.create({
  date: {
    alignSelf: "flex-end",
    verticalAlign: "bottom",
  },
  cardContainer: {
    alignContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
    width: "100%",
    height: "100%",
  }
});
