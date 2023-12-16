import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Card, CardProps, Colors, CardSelectionOptions, TextProps, Assets } from 'react-native-ui-lib';

interface ProCardProps {
    radius?: number
    onPress?: () => void
    canBeSelected?: boolean
    children: React.ReactNode
    textContent?: CardSectionContent[]
}

export type CardSectionContent = TextProps & {
  text: string
}

const ProCard: React.FC<ProCardProps & CardProps> = (props) => {
    const canBeSelected = props.canBeSelected || false;
    const children = props.children || <></>;
    const textContent = props.textContent || []
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
        <Card
          flex margin-20
          selected={isSelected}
          selectionOptions={selectionOptions}
          onPress={() => {
            if(canBeSelected)
                setIsSelected(!isSelected)
            onPress();
          }}
          
          borderRadius={borderRadius}
          padding-20
        >
          {/* <Card.Image source={{uri: Assets.images.gradient}} height={200} cover ></Card.Image> */}
          {textContent.map((content)=> ( (<Card.Section content={[{...content}]}/> ) ))}
          <View>
            {children}
          </View>
        </Card>
  )
}

export default ProCard

const styles = StyleSheet.create({
  date: {
    alignSelf: 'flex-end'
  },
});
