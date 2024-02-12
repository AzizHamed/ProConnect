import React, { useState } from 'react'
import { Switch, SwitchProps, View, Text } from 'react-native-ui-lib';
import { Animated, Platform } from 'react-native';

interface ProSwitchProps {
    rightLabel?: string,
    leftLabel?: string,
    value: boolean,
    onValueChange?: (val: boolean) => void
    webWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
    mobileWidth?: number | 'auto' | `${number}%` | Animated.AnimatedNode;
  }

const ProSwitch: React.FC<ProSwitchProps & SwitchProps> = (props) => {
    const width = (Platform.OS === 'web') ? (props.webWidth || 80) : (props.mobileWidth || '10%')
    const initialValue = props.value || false;
    const [currentValue, setCurrentValue] = useState<boolean>(initialValue)

    const onValueChange = (val: boolean) =>
    {
        setCurrentValue(val);
        if(props.onValueChange) {
            setTimeout(() => {
                if(props.onValueChange)
                    props.onValueChange(val);
            }, 500);
        }
        else alert("Switch Value: " + val);
    }


  return (
    <View center bg style={{flexDirection: 'row'}}>
        <Text>{props.rightLabel ? props.rightLabel : ''}</Text>   
        <Switch value={currentValue} onValueChange={onValueChange}/>
        <Text>{props.leftLabel ? props.leftLabel : ''}</Text>   
    </View>
  )
}

export default ProSwitch
