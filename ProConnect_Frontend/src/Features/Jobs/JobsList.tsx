import { View } from "react-native-ui-lib";
import { StyleSheet, Text } from "react-native";
import JobCard from "./JobCard";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getJobs, setJobs } from "../../Services/Redux/Slices/JobSlice";
import BackgroundView from "../../Components/Layout/BackgroundView";
import { GetBestOfferApiArg, Job, JobOffer, useGetBestOfferQuery, useGetJobsQuery } from "../../Services/Redux/Api";
import { useEffect, useState } from "react";
import LoadingOrError from "../../Components/Layout/LoadingOrError";
import ProRefreshControl from "../../Components/Controls/ProRefreshControl";
import ProButton from "../../Components/Controls/ProButton";
import { setChat } from "../../Services/Redux/Slices/ChatSlice";

// TODO: Filter by budget, job status, JobDateSearch

const JobsList: React.FC = () => {
  const { data, isSuccess, isError, error, refetch } = useGetJobsQuery({});

  const navigation = useNavigation();
  const jobs = useSelector(getJobs);
  const dispatch = useDispatch();

const [job, setjob] = useState<Job | undefined> (undefined)
   console.log("Job = " + job)
  // const bestOffer  = useGetBestOfferQuery(job)
  // if(bestOffer !==undefined){
    
  //   dispatch(setChat({ReceiverEmail : bestOffer.data?.senderUser?.email , openModal : false, receiverUserName : bestOffer.data?.senderUser?.name.firstName + " " + bestOffer.data?.senderUser?.name.lastName}))
            
  //   navigation.navigate("Chats")
  // }



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
    <BackgroundView hasScroll
      children={
        <View bg style={{width:"100%"}}>
          <ProRefreshControl onRefreshAction={refetch}
            children={
              <View bg style={{alignItems:"center", width:"100%"}}>
                <LoadingOrError isSuccess={isSuccess} isError={isError} errorDisplayMessage 
                />
                {error && <BackgroundView children={<Text>{error.error}</Text>}></BackgroundView>}
                {isSuccess && (
                  // <View style={styles.container} bg>
                  <View bg style={{width:"100%"}}>
                    {jobs.map((job) => { 
                      return (
                        <View>
                          <JobCard
                            autoAdjustWidth
                            key={job.id}
                            job={job}
                          ></JobCard>

                          <View style={{alignItems : "center", width : "100%"}}>

                          <ProButton text={"Send Offer"} onPress={()=>{
                          
                            dispatch(setChat({receiverUserName: job.owner.name.firstName + " " + job.owner?.name.lastName, ReceiverEmail: job.owner?.email, openModal: true, receiverUser: job.owner, job: job, receiverPhotoUrl: job.owner?.photoUrl}))
                            navigation.navigate("Chats")
                          }}/>
                          <ProButton text={"Get best Offer"} onPress={()=>{
                           
                           setjob(job)
                            
                          }}/>
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
