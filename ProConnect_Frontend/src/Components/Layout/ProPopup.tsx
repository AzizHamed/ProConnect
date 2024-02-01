import { StyleSheet, View } from "react-native";
import React from "react";
import { Dialog, Text, PanningProvider } from "react-native-ui-lib";

interface PopupProps {
  title: string;
  text?: string;
  isVisible: boolean;
  onDismiss?: () => void;
}

const ProPopup: React.FC<PopupProps> = (props) => {
  return (
    <Dialog
      visible={props.isVisible}
      onDismiss={props.onDismiss}
      panDirection={PanningProvider.Directions.DOWN}
    >
      <Text text60>{props.title}</Text>
    </Dialog>
  );
};

export default ProPopup;

const styles = StyleSheet.create({});
