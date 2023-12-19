import { StyleSheet } from "react-native";
import { Colors, View, Text } from "react-native-ui-lib";
import { MaterialIcons } from '@expo/vector-icons';

export interface ErrorProps{
    errorDisplayMessage?: boolean,
    errorMessage?: string,
}

const ProError: React.FC<ErrorProps> = (props) => {
  const displayMessage = props.errorDisplayMessage || true;
  const message = props.errorMessage || "An error has occured.";

  return <View margin-30 style={{...styles.error}} bg>
    <MaterialIcons name="error" size={30} color={Colors.failure} />
  {displayMessage ? <Text marginT-20 style={styles.error}>{message}</Text> : <></>}
  </View>;
  
};

export default ProError;

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center"
  },
});
