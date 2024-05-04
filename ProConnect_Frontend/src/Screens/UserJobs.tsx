import React, { useEffect, useState } from 'react'
import BackgroundView from '../Components/Layout/BackgroundView';
import { View, Text } from 'react-native-ui-lib';
import ProRefreshControl from '../Components/Controls/ProRefreshControl';
import LoadingOrError from '../Components/Layout/LoadingOrError';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs, setJobs } from '../Services/Redux/Slices/JobSlice';
import JobCard from '../Features/Jobs/JobCard';
import ProButton from '../Components/Controls/ProButton';
import { setChat } from '../Services/Redux/Slices/ChatSlice';
import { FindJobByOwnerApiArg, Job, useFindJobByOwnerQuery } from '../Services/Redux/Api';
import { getUserAccount } from '../Services/Redux/Slices/AuthSlice';

const UserJobs = () => {

  const senderUser = useSelector(getUserAccount)
  console.log(senderUser)
  const { data, isSuccess, isError, error, refetch } = useFindJobByOwnerQuery({owner : senderUser})

  const navigation = useNavigation();
  const jobs = useSelector(getJobs);
  const dispatch = useDispatch();

const [job, setjob] = useState<Job | undefined> (undefined)
  



 

  useEffect(() => {
    // Update the jobs data in the Redux store every time the data changes
    dispatch(
      setJobs(
        data !== undefined && data !== undefined ? data : []
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

                          {/* <ProButton text={"Send Offer"} onPress={()=>{
                          
                            dispatch(setChat({receiverUserName: job.owner.name.firstName + " " + job.owner?.name.lastName, ReceiverEmail: job.owner?.email, openModal: true, receiverUser: job.owner, job: job}))
                            navigation.navigate("Chats")
                          }}/> */}
                          <ProButton text={"Get best Offer"} onPress={()=>{
                           
                           setjob(job)
                            
                          }}/>
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
  )
}

export default UserJobs
