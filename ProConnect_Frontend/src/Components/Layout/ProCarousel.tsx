import React from 'react'
import { Button, ButtonProps, Carousel, Colors, View } from 'react-native-ui-lib';
import { Animated, Platform } from 'react-native';
import { customWidthValues } from '../../Constants/Values';

interface ProCarouselProps {
   
    onPress?: () => void
    webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
    mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
  }

const ProCarousel: React.FC<ProCarouselProps & ButtonProps> = (props) => {
   
    const width = customWidthValues(props.webWidth, props.mobileWidth);

    const onPress = props.onPress !== undefined ? props.onPress : () =>
    {
        alert("Pressed")
    }


  const widthStyle = { width: width };
  return (
    <View center backgroundColor={props.backgroundColor} style={widthStyle}>      
      <Carousel data={articles} >    
      </Carousel>
    </View>
  )
}

export default ProCarousel
