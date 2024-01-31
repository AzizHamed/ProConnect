import { Dimensions, StyleSheet } from "react-native";
import { View } from "react-native-ui-lib";

interface BackgroundViewProps {
    children: React.ReactNode
}

const BackgroundView: React.FC<BackgroundViewProps> = (props) => {
  return <View style={styles.background} bg>{props.children}</View>;
};

export default BackgroundView;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    height: Dimensions.get("window").height,
  },
});
