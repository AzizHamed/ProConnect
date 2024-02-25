import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { getScreenHeight } from "../../Services/Redux/Slices/DimensionSlice";
import { IS_WEB } from "../../Constants/Values";

interface BackgroundViewProps {
    children: React.ReactNode,
    hasScroll?: boolean
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

  if(props.hasScroll) {
    return(
      <SafeAreaView style={[styles.background, {height: adjustedHeight}]}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.background} bg>{props.children}</View>
        </ScrollView>
    </SafeAreaView>
    );
  }

  return(
    <SafeAreaView style={[styles.background, {height: adjustedHeight}]}>
      <View style={styles.background} bg>{props.children}</View>
    </SafeAreaView>
    );
};

export default BackgroundView;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%"
    },
});
