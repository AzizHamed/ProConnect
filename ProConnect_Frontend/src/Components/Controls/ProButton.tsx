import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, ButtonProps } from 'react-native-ui-lib';

interface ProButtonProps {
    text?: string
    radius?: number
    color?: string
    onPress?: () => void
}

const ProButton: React.FC<ProButtonProps & ButtonProps> = (props) => {
    const text = props.text || 'Submit';
    const color = props.color || '#FFFFFF';
    const borderRadius = props.radius || 0;

    const onPress = props.onPress !== undefined ? props.onPress : () =>
    {
        alert("Pressed")
    }

  return (
    <Button 
        {...props} 
        onPress={onPress}
        borderRadius={borderRadius}
        supportRTL={true} 
        label={text} 
        color={color}>    
    </Button>
  )
}

export default ProButton