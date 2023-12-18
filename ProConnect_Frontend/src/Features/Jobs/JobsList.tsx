import { View } from "react-native-ui-lib";
import { ScrollView, StyleSheet } from "react-native";
import JobCard from "./JobCard";
import { useGetJobs } from "./Hooks/useGetJobs";
import ProButton from "../../Components/Controls/ProButton";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { getJobs } from "./JobSlice";
import BackgroundView from "../../Components/Layout/BackgroundView";

// TODO: Filter by budget, job status, JobDateSearch

const JobsList: React.FC = () => {
  useGetJobs();
  const navigation = useNavigation();
  const jobs = useSelector(getJobs);
  return (
    // <View style={styles.background} bg>
    <BackgroundView
      children={
        <ScrollView>
          <ProButton isResponsive onPress={() => {
              navigation.navigate("Testing");
            }}/>
          <View style={styles.container} bg>
            {jobs.map((job) => {
              return <JobCard autoAdjustWidth key={job.id} job={job}></JobCard>;
            })}
            {/* {jobs.map((job) => { return <JobCard key={job.id} job={job}></JobCard> })}         */}
            {/* {jobs.map((job) => { return <JobCard key={job.id} job={job}></JobCard> })}         */}
          </View>
        </ScrollView>
      }
    />

  );
};

export default JobsList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignSelf: "center",
    flex: 1,
  }
});
