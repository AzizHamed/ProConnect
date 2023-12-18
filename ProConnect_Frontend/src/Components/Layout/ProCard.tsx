import React, { useState } from "react";
import {
  View,
  Card,
  CardProps,
  CardSelectionOptions,
  TextProps,
} from "react-native-ui-lib";
import { calculateResponsiveWidth, useViewport } from "../../Hooks/useViewPort";

interface ProCardProps {
  radius?: number;
  onPress?: () => void;
  canBeSelected?: boolean;
  autoAdjustWidth?: boolean;
  children: React.ReactNode;
  textContent?: CardSectionContent[];
}

export type CardSectionContent = TextProps & {
  text: string;
};

const ProCard: React.FC<ProCardProps & CardProps> = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const { screenWidth } = useViewport();
  const canBeSelected = props.canBeSelected || false;
  const children = props.children || <></>;
  const textContent = props.textContent || [];
  const borderRadius = props.radius || 5;
  const autoAdjustWidth = props.autoAdjustWidth || false;

  const selectionOptions: CardSelectionOptions = {
    icon: 0,
    borderWidth: 3,
    hideIndicator: !canBeSelected,
    indicatorSize: canBeSelected ? 5 : 0,
  };

  const onPress = props.onPress !== undefined ? props.onPress
      : () => { console.log("Pressed"); };

  function calculateWidth() { 
    return calculateResponsiveWidth(screenWidth, autoAdjustWidth);
  }

  return (
    <Card
      style={{ width: calculateWidth() }}
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