import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {
  View,
  Text,
  Card,
  CardProps
} from "react-native-ui-lib";
import { Job } from "../../Models/Job";
import ProCard from "../Layout/ProCard";

interface JobPageProps {
  job: Job;
  onPress?: () => void;
}

const JobCard: React.FC<JobPageProps> = (props) => {
  const job = props.job;
  const onPress =
    props.onPress !== undefined
      ? props.onPress
      : () => {
          console.log("Pressed");
        };

  return (<View><Text>{job.title}</Text></View>)
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
