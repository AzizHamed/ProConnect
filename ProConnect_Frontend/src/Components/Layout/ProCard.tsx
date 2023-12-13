import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { View, Card, CardProps, Colors, CardSelectionOptions } from 'react-native-ui-lib';

interface ProCardProps {
    radius?: number
    onPress?: () => void
    canBeSelected?: boolean
    children: object
}

const ProCard: React.FC<ProCardProps & CardProps> = (props) => {
    const canBeSelected = props.canBeSelected || false;
    const children = props.children || <></>;
    const borderRadius = props.radius || 5;
    const selectionOptions: CardSelectionOptions = {
      icon: 0,
      borderWidth: 3,
      hideIndicator: true,
      indicatorSize: 0
  }
    const [isSelected, setIsSelected] = useState(false)
    const onPress = props.onPress !== undefined ? props.onPress : () =>
    {
        console.log("Pressed")
    }

  return (
    <View  margin-20>
        <Card
          flex
          selected={isSelected}
          selectionOptions={selectionOptions}
          onPress={() => {
            if(canBeSelected)
                setIsSelected(!isSelected)
            onPress();
          }}
          backgroundColor={Colors.backgroundSecondary}
          activeBackgroundColor={Colors.highlight}
          borderRadius={borderRadius}
          padding-20
        >
          <View>
            {children}
          </View>
        </Card>

      </View>
  )
}

export default ProCard

const styles = StyleSheet.create({
  date: {
    alignSelf: 'flex-end'
  },
});
