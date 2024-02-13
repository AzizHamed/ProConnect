import React, { useState } from "react";
import {
  View,
  Card,
  CardProps,
  CardSelectionOptions,
  TextProps,
} from "react-native-ui-lib";
import { Animated, Platform } from "react-native";
import { useSelector } from "react-redux";
import { getWindowWidth } from "../../Services/Redux/Slices/DimensionSlice";

interface ProCardProps {
  radius?: number;
  onPress?: () => void;
  canBeSelected?: boolean;
  autoAdjustWidth?: boolean;
  children: React.ReactNode;
  textContent?: CardSectionContent[];
  webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
  mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
}

export type CardSectionContent = TextProps & {
  text: string;
};

const ProCard: React.FC<ProCardProps & CardProps> = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  // const { screenWidth } = useViewport();
  const windowWidth = useSelector(getWindowWidth);
  const canBeSelected = props.canBeSelected || false;
  const children = props.children || <></>;
  const textContent = props.textContent || [];
  const borderRadius = props.radius || 5;
  // const autoAdjustWidth = props.autoAdjustWidth || false;
  const width = (Platform.OS === 'web') ? (props.webWidth || (windowWidth < 450 ? (windowWidth - 20) :"90%")) : (props.mobileWidth || "90%")


  const selectionOptions: CardSelectionOptions = {
    icon: 0,
    borderWidth: 3,
    hideIndicator: !canBeSelected,
    indicatorSize: canBeSelected ? 5 : 0,
  };

  const onPress = props.onPress !== undefined ? props.onPress
      : () => { console.log("Pressed"); };

  // function calculateWidth() { // TODO: Change this to behave like the ProButton
  //   return calculateResponsiveWidth(screenWidth, autoAdjustWidth);
  // }

  return (
    <Card
      style={{ width: width, minWidth: 10, alignSelf: "center"}}
      selected={isSelected}
      selectionOptions={selectionOptions}
      onPress={() => {
        if (canBeSelected) setIsSelected(!isSelected);
        onPress();
      }}
      borderRadius={borderRadius}
      padding-20
    >
      {/* <Card.Image source={{uri: Assets.images.gradient}} height={200} cover ></Card.Image> */}
      {textContent.map((content) => (
        <Card.Section content={[{ ...content }]} />
      ))}
      <View>{children}</View>
    </Card>
  );
};

export default ProCard;