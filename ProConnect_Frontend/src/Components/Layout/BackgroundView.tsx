import { Dimensions, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

interface BackgroundViewProps {
    children: React.ReactNode
}

const BackgeoundView: React.FC<BackgroundViewProps> = (props) => {
  return <View style={styles.background} bg>{props.children}</View>;
};

export default BackgeoundView;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
});
