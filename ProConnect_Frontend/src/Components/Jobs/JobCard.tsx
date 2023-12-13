import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  View,
  Text,
  Card,
  CardProps,
  Colors,
  CardSelectionOptions,
  Constants,
} from "react-native-ui-lib";
import { Job } from "../../Models/Job";
import ProCard from "../Layout/ProCard";

interface JobCardProps {
  job: Job;
  radius?: number;
  onPress?: () => void;
}

function generateCardChildren(job: Job) {
  return (
    <View>
      <View>
        <Card.Section
          marginB-30
          content={[{ text: job.title, h3: true, textPrimary: true }]}
        />
      </View>
      <Card.Section
        content={[{ text: job.description, body: true, textPrimary: true }]}
      />
      <View style={styles.date}>
        <Text body textPrimary textAlign="right" marginT-20>
          {job.datePosted}
        </Text>
      </View>
    </View>
  );
}

const JobCard: React.FC<JobCardProps & CardProps> = (props) => {
  const job = props.job;
  const children = generateCardChildren(job);
  const onPress =
    props.onPress !== undefined
      ? props.onPress
      : () => {
          console.log("Pressed");
        };

  return (
  <View margin-10 style={styles.card} >
    <ProCard children={children} radius={props.radius} onPress={onPress}></ProCard>
    </View>);
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
