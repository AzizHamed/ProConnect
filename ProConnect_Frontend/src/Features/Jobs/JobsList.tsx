import { View } from "react-native-ui-lib";
import { ScrollView, StyleSheet } from "react-native";
import JobCard from "./JobCard";
import ProButton from "../../Components/Controls/ProButton";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, setJobs } from "./JobSlice";
import BackgroundView from "../../Components/Layout/BackgroundView";
import { useGetJobsQuery } from "../../Services/Redux/Api";
import { useEffect } from "react";
import LoadingOrError from "../../Components/Layout/LoadingOrError";

// TODO: Filter by budget, job status, JobDateSearch

const JobsList: React.FC = () => {
  const { data, isSuccess, isError } = useGetJobsQuery({});
  const navigation = useNavigation();
  const jobs = useSelector(getJobs);
  const dispatch = useDispatch();

  useEffect(() => {
    // Update the jobs data in the Redux store every time the data changes
    dispatch(setJobs((data !== undefined && data.content !== undefined) ? data.content : []))
  }, [data])

  return (
    <BackgroundView
      children={
        <ScrollView>
          <ProButton isResponsive onPress={() => {
              navigation.navigate("Testing");
            }}/>

            <LoadingOrError isSuccess={isSuccess} isError={isError} errorDisplayMessage/>

            {isSuccess &&  <View style={styles.container} bg>
            {jobs.map((job) => {
              return <JobCard autoAdjustWidth key={job.id} job={job}></JobCard>;
            })}
            </View>
            }
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