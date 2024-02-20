import { ImageStyle, StyleProp, ViewStyle,Animated, Platform } from "react-native";
import { Colors } from "react-native-ui-lib";

export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const PHONE_REGEX =
/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

let isWeb: boolean | undefined = undefined;
export const IS_WEB = () => {
  if(isWeb === undefined){ 
    isWeb = Platform.OS === 'web';
  }
  return isWeb;
}

type WidthValues =  number | 'auto' | `${number}%` | Animated.AnimatedNode;

export const defaultWidthNumber = 400;
export const defaultWidthPercent = '90%';
export const defaultWidthValues = () => {
  return IS_WEB() ? defaultWidthNumber : defaultWidthPercent;
}

export const customWidthValues = (webWidth?: WidthValues, mobileWidth?: WidthValues) => {
  return IS_WEB() ? (webWidth || defaultWidthNumber) : (mobileWidth || defaultWidthPercent);
}


interface PersonsPageProps {
  setButtons : boolean
  imageStyle : ImageStyle
  CardContainerStyle : StyleProp<ViewStyle>
  ComponentType : "ProButton" | "Rating" 

}


const CardContainer1 : StyleProp<ViewStyle> = {
  backgroundColor:Colors.$backgroundDark,
  width:180,
  height:180,
  alignItems:"center",
  justifyContent:"center",
  
}
const CardContainer2 : StyleProp<ViewStyle> = {
  backgroundColor:Colors.$backgroundDark,
  width:190,
  height:220,
  alignItems:"center",
  justifyContent:"center",
  
}



const photoStyle1 : ImageStyle = {
  height: 100,
  width: 100,
  borderRadius:70,
  marginBottom:8,
}
const photoStyle2 : ImageStyle = {
  height: 120,
  width: 120,
  borderRadius:70,
}

export const PersonPage1 : PersonsPageProps = {
  setButtons: true,
  imageStyle: photoStyle1,
  CardContainerStyle: CardContainer1,
  ComponentType : "Rating"
}

export const PersonPage2 : PersonsPageProps = {
  setButtons: false,
  imageStyle: photoStyle2,
  CardContainerStyle: CardContainer2,
  ComponentType : "ProButton"
}







