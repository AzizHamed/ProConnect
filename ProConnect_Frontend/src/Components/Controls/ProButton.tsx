import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, ButtonProps } from 'react-native-ui-lib';

interface ProButtonProps {
    text?: string
    radius?: number
    onPress?: () => void
}

const ProButton: React.FC<ProButtonProps & ButtonProps> = (props) => {
    const text = props.text || 'Submit';
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
        // outlineColor='black'
        label={text} 
        >    
    </Button>
  )
}

export default ProButton