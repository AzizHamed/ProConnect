import { StyleSheet } from "react-native";
import ProLoading, { LoadingProps } from "./ProLoading";
import ProError, { ErrorProps } from "./ProError";

interface LoadingOrErrorProps{
    isError: boolean,
    isSuccess: boolean
}

const LoadingOrError: React.FC<LoadingOrErrorProps & LoadingProps & ErrorProps> = (props) => {
  const loadingProps: LoadingProps = {loadingDisplayMessage: props.loadingDisplayMessage, loadingMessage: props.loadingMessage, small: props.small};
  const errorProps: ErrorProps = {errorDisplayMessage: props.errorDisplayMessage, errorMessage: props.errorMessage};
  const isError = props.isError;
  const isSuccess = props.isSuccess;
  
  if(isSuccess)
    return <></>;
  else if(isError)
    return <ProError {...errorProps}/>;
  else
    return <ProLoading {...loadingProps}/>;
};

export default LoadingOrError;

const styles = StyleSheet.create({
  error: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    textAlign: "center"
  },
});
