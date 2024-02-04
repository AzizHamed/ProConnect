import { useEffect, useState } from "react";
import { Dimensions, ScaledSize, Animated, Platform } from "react-native";
import { setDimensions, getWindow } from "../Services/Redux/Slices/DimensionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../Services/Redux/Store";
interface UpdateDimensionsData{
  window: ScaledSize,
  screen: ScaledSize
}
export function useViewport() {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  
    const dispatch = useDispatch<AppDispatch>();
    const currentWindow = useSelector(getWindow);

    function updateDimensions({ window, screen } : UpdateDimensionsData)  {
    if (window.width !== currentWindow.width || window.height !== currentWindow.height)
      dispatch(setDimensions({ sceen: screen, window: window }));
    setScreenWidth(window.width);
    }

    useEffect(() => {
      
      const subscription = Dimensions.addEventListener("change", updateDimensions);
      return () => subscription?.remove();
    }, []);
  
    // Return the width so we can use it in our components
    return { screenWidth };
  }

  export function calculateResponsiveWidth(screenWidth: number, autoAdjustWidth: boolean = true, div: number = 2.25,
    smallScreenWebMargin: number = 40, smallScreenWidth = 720){
      if(screenWidth == undefined) screenWidth = Dimensions.get("window").width;
      let tempWidth: number | 'auto' | `${number}%` | Animated.AnimatedNode| null = "90%";
      if(autoAdjustWidth){
        if(Platform.OS === "web"){
          tempWidth = screenWidth > smallScreenWidth ? screenWidth / div : screenWidth - smallScreenWebMargin;
        }
      }        
      else{
        tempWidth = screenWidth - smallScreenWebMargin;
      }              
      return tempWidth;
  }