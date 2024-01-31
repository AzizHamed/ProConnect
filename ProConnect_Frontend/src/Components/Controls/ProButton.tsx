import React from 'react'
import { Button, ButtonProps } from 'react-native-ui-lib';
import { calculateResponsiveWidth, useViewport } from '../../Hooks/useViewPort';
import { Animated, Platform } from 'react-native';

interface ProButtonProps {
    text?: string
    radius?: number
    isResponsive?: boolean
    onPress?: () => void
    webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
    mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
  }

const ProButton: React.FC<ProButtonProps & ButtonProps> = (props) => {
    const text = props.text || 'Submit';
    const borderRadius = props.radius || 0;
    const isResponsive = props.isResponsive || false;
    const width = (Platform.OS === 'web') ? (props.webWidth || 400) : (props.mobileWidth || '90%')
    const { screenWidth } = useViewport();

    const onPress = props.onPress !== undefined ? props.onPress : () =>
    {
        alert("Pressed")
    }


  return (
    <Button 
        {...props} style={{width: width}}
        // style={generateStyle()}
        onPress={onPress}
        borderRadius={borderRadius}
        supportRTL={true} 
        // outlineColor='black'
        label={text} 
        >    
    </Button>
  )
}

export default ProButton
