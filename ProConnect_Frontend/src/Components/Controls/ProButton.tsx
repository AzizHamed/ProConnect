import React from 'react'
import { Button, ButtonProps, View } from 'react-native-ui-lib';
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
    const width = (Platform.OS === 'web') ? (props.webWidth || 400) : (props.mobileWidth || '90%')

    const onPress = props.onPress !== undefined ? props.onPress : () =>
    {
        alert("Pressed")
    }


  return (
    <View center bg>      
      <Button 
          {...props} style={{width: width}}
          onPress={onPress}
          center
          borderRadius={borderRadius}
          supportRTL={true} 
          label={text} 
          >    
      </Button>
    </View>
  )
}

export default ProButton
