import { ActivityIndicator, StyleSheet } from "react-native";
import { Colors, View, Text } from "react-native-ui-lib";

export interface LoadingProps{
    small?: boolean,
    displayLoadingMessage?: boolean,
    loadingMessage?: string,
}

const ProLoading: React.FC<LoadingProps> = (props) => {
    const small = props.small || false;
    const displayMessage = props.displayLoadingMessage === undefined ? true : props.displayLoadingMessage;
    const message = props.loadingMessage || "Loading...";


  return <View margin-30 style={{...styles.loading, width: 100}} bg>
    <ActivityIndicator color={Colors.secondary} size={small ? "small" : "large"} />
    {displayMessage ? <Text marginT-20 style={styles.loading}>{message}</Text> : <></>}
    </View>;
};

export default ProLoading;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center"
  },
});
