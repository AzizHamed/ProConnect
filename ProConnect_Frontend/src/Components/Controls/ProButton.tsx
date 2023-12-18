import React from 'react'
import { Button, ButtonProps } from 'react-native-ui-lib';
import { calculateResponsiveWidth, useViewport } from '../../Hooks/useViewPort';

interface ProButtonProps {
    text?: string
    radius?: number
    isResponsive?: boolean
    onPress?: () => void
}

const ProButton: React.FC<ProButtonProps & ButtonProps> = (props) => {
    const text = props.text || 'Submit';
    const borderRadius = props.radius || 0;
    const isResponsive = props.isResponsive || false;
    const { screenWidth } = useViewport();

    const onPress = props.onPress !== undefined ? props.onPress : () =>
    {
        alert("Pressed")
    }

    function calculateWidth() { 
      return calculateResponsiveWidth(screenWidth, false);
    }
    
    function generateStyle()
    {
      if(isResponsive)
        return { width: calculateWidth(), alignSelf: "center" };
      return {};
    }

  return (
    <Button 
        {...props} 
        style={generateStyle()}
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
