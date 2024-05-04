import React from 'react'
import { Button, ButtonProps, Colors, View } from 'react-native-ui-lib';
import { Animated, Platform } from 'react-native';
import { customWidthValues } from '../../Constants/Values';

interface ProButtonProps {
    text?: string
    radius?: number
    isResponsive?: boolean
    onPress?: () => void
    webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
    mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
    width?:number
  }

const ProButton: React.FC<ProButtonProps & ButtonProps> = (props) => {
    const text = props.text || 'Submit';
    const borderRadius = props.radius || 5;
    const width = customWidthValues(props.webWidth, props.mobileWidth);

    const onPress = props.onPress !== undefined ? props.onPress : () =>
    {
        alert("Pressed")
    }

    let widthStyle
  if(props.width!==undefined)
    widthStyle = { width: props.width };

  else 
  widthStyle = { width: width };
  return (
    <View center backgroundColor={props.backgroundColor} style={widthStyle}>      
      <Button 
          {...props} style={widthStyle}
          backgroundColor={Colors.controlBackground}
          color={Colors.controlText}
          onPress={onPress}
          
          borderRadius={borderRadius}
          supportRTL={true} 
          label={text} 
          labelStyle={[{textAlign: 'center', fontWeight: 'bold'}, widthStyle]}
          >    
      </Button>
    </View>
  )
}

export default ProButton
