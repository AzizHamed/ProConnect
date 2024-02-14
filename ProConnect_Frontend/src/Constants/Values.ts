import { Animated, Platform } from "react-native";

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

export const defaultWidthValues = () => {
  return IS_WEB() ? 400 : '90%';
}

export const customWidthValues = (webWidth?: WidthValues, mobileWidth?: WidthValues) => {
  return IS_WEB() ? (webWidth || 400) : (mobileWidth || '90%');
}
