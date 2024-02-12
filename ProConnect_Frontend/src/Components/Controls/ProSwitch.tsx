import React, { useState } from "react";
import { Switch, SwitchProps, View, Text, Colors } from "react-native-ui-lib";
import { Animated, Platform, StyleSheet } from "react-native";

interface ProSwitchProps {
  rightLabel?: string;
  leftLabel?: string;
  value: boolean;
  delayChange?: boolean;
  onValueChange?: (val: boolean) => void;
  webWidth?: number;
  mobileWidth?: number;
}

const ProSwitch: React.FC<ProSwitchProps & SwitchProps> = (props) => {
  const width =
    Platform.OS === "web" ? props.webWidth || 100 : props.mobileWidth || 30;
  const initialValue = props.value || false;
  const [currentValue, setCurrentValue] = useState<boolean>(initialValue);

  const onValueChange = (val: boolean) => {
    setCurrentValue(val);
    if (props.onValueChange) {
      if (props.delayChange) {
        setTimeout(() => {
          if (props.onValueChange) props.onValueChange(val);
        }, 500);
      } else {
        props.onValueChange(val);
      }
    } else alert("Switch Value: " + val);
  };

  return (
    <View
      center
      backgroundColor={props.backgroundColor}
      style={{
        flexDirection: "row",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <Text style={styles.labels}>
        {props.rightLabel ? props.rightLabel : ""}
      </Text>
      <Switch value={currentValue} onValueChange={onValueChange} style={{borderColor:Colors.controlBackground, borderWidth:1}} width={60}/>
      <Text style={styles.labels}>
        {props.leftLabel ? props.leftLabel : ""}
      </Text>
    </View>
  );
};

export default ProSwitch;
const styles = StyleSheet.create({
  labels: {
    transform: [{ translateY: 8 }],
  },
});
