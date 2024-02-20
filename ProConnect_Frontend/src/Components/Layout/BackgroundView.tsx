import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import { getScreenHeight } from "../../Services/Redux/Slices/DimensionSlice";

interface BackgroundViewProps {
    children: React.ReactNode,
    hasScroll?: boolean
}

const BackgroundView: React.FC<BackgroundViewProps> = (props) => {
  const tabBarHeight = useBottomTabBarHeight();
  const screenHeight = useSelector(getScreenHeight);

  if(props.hasScroll) {
    return(
      <SafeAreaView style={[styles.background, {height: screenHeight - tabBarHeight}]}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.background} bg>{props.children}</View>
        </ScrollView>
    </SafeAreaView>
    );
  }

  return(
    <SafeAreaView style={[styles.background, {height: screenHeight - tabBarHeight}]}>
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
