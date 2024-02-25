import { Animated } from "react-native";

export interface SelectedFile {
    uri: string;
    fileName: string;
}

export type WidthValues =  number | 'auto' | `${number}%` | Animated.AnimatedNode;
