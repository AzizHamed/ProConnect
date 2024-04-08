import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { getScreenHeight } from "../../Services/Redux/Slices/DimensionSlice";
import { IS_WEB } from "../../Constants/Values";
import React from "react";

interface BackgroundViewProps {
  children: React.ReactNode,
  hasScroll?: boolean,
  hasSafeAreaView?: boolean
}

const BackgroundView: React.FC<BackgroundViewProps> = (props) => {
  const tabBarHeight = getTabBarHeight();
  const screenHeight = useSelector(getScreenHeight);
  const adjustedHeight = IS_WEB() ? screenHeight : screenHeight - tabBarHeight;
  
  function getTabBarHeight() {
    try {
      const tabBarHeight = useBottomTabBarHeight();
      return tabBarHeight;
    } catch (error) {
      return 0;
    }
  }
  
  const InternalView = <View style={styles.background} bg>{props.children}</View>;
  const ScrollWithChildren = props.hasScroll ? <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>{InternalView}</ScrollView> : InternalView;
  const BackgroundViewWithChildren = props.hasSafeAreaView ? <SafeAreaView style={[styles.background, { height: adjustedHeight }]}>{ScrollWithChildren}</SafeAreaView> : ScrollWithChildren;

  return BackgroundViewWithChildren;
}

export default BackgroundView;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%"
  },
});
