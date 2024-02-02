import { Dimensions, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native-ui-lib";

interface BackgroundViewProps {
    children: React.ReactNode
}

const BackgroundView: React.FC<BackgroundViewProps> = (props) => {
  return(
    <SafeAreaView style={styles.background}>
      <View style={styles.background} bg>{props.children}</View>
    </SafeAreaView>
    );
};

export default BackgroundView;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
});
