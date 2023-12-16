import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Card,
  CardProps
} from "react-native-ui-lib";
import { Job } from "../../Models/Job";
import ProCard from "../../Components/Layout/ProCard";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedJob, selectJob } from "./JobSlice";
import { useNavigation } from "@react-navigation/native";

interface JobPageProps {
  job?: Job;
}

const JobCard: React.FC<JobPageProps> = (props) => {
  const job = useSelector(getSelectedJob);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(
    ()=>{
      navigation.addListener("beforeRemove", e=>{
        dispatch(selectJob(null))
      }), [navigation]
    }
  )
  return (<View><Text>{job?.title}</Text></View>)
};

export default JobCard;

const styles = StyleSheet.create({
  date: {
    alignSelf: "flex-end",
    verticalAlign: "bottom"
  },
  card:{
    width: '100%',
  }
});
