import { View, Text } from "react-native-ui-lib";
import { ScrollView, StyleSheet } from "react-native";
import JobCard from "./JobCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, setJobs } from "../../Services/Redux/Slices/JobSlice";
import BackgroundView from "../../Components/Layout/BackgroundView";
import { useGetJobsByUserProfessionAndWorkAreaQuery, useGetJobsQuery } from "../../Services/Redux/Api";
import { useEffect, useState } from "react";
import LoadingOrError from "../../Components/Layout/LoadingOrError";
import ProRefreshControl from "../../Components/Controls/ProRefreshControl";
import ProButton from "../../Components/Controls/ProButton";
import { setChat } from "../../Services/Redux/Slices/ChatSlice";
import { auth } from "../../Services/Firebase/Firebase";
import { getUserAccount } from "../../Services/Redux/Slices/AuthSlice";

const JobsList: React.FC = () => {
  const { data, isSuccess, isError, error, refetch } = useGetJobsQuery({});//useGetJobsByUserProfessionAndWorkAreaQuery();

  const navigation = useNavigation();
  const jobs = useSelector(getJobs);
  const dispatch = useDispatch();
  const user = useSelector(getUserAccount);
  

  const userProfession = user?.userProfessions ? user?.userProfessions[0].profession?.id : undefined; 
  const [bestOfferModalVisible, setbestOfferModalVisible] = useState(false)

  useEffect(() => {
    // Update the jobs data in the Redux store every time the data changes
    dispatch(
      setJobs(
        data !== undefined && data.content !== undefined ? data.content : []
      )
    );
  }, [data, error]);

  return (
    <BackgroundView
    children={
          <ScrollView>
      <View bg style={{ width: "100%" }}>
          <ProRefreshControl onRefreshAction={refetch}
            children={
              <View bg style={{ alignItems: "center", width: "100%" }}>
                  <LoadingOrError isSuccess={isSuccess} isError={isError} errorDisplayMessage />
                  {error && <BackgroundView children={<Text>{error.error}</Text>}></BackgroundView>}
                  {isSuccess && (
                    // <View style={styles.container} bg>
                    <View bg style={{ width: "100%" }}>
                      {/* {jobs && jobs[0] && jobs[0].neededProfessions && <Text center marginV-15 h5>{jobs.length} {jobs[0].neededProfessions[0].name} Jobs in {jobs[0].owner?.workAreas}</Text>} */}
                      {jobs.map((job) => {
                        if (job.owner?.email !== auth.currentUser?.email && job.jobStatus !== "FINISHED" && (userProfession !== undefined && job?.neededProfessions[0].id === userProfession))
                          return (
                            <View bg key={job.id}>
                              <JobCard
                                autoAdjustWidth
                                job={job}
                              ></JobCard>

                              <View style={{ alignItems: "center", width: "100%" }}>
                              </View>
                            </View>
                          );
                      })}
                    </View>
                  )}
              </View>
            }
          ></ProRefreshControl>
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
  },
});
