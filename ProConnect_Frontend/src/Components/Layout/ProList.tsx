import React from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { getScreenWidth } from '../../Services/Redux/Slices/DimensionSlice';
import { ScrollView } from 'react-native';

interface ProListProps {
  data: any[] | undefined;
  renderItems: ({ item, index, onPress }: { item: any, index: number, onPress?: () => void }) => JSX.Element;
  onPress?: () => void;
  width?: number;
  itemScale?: number;
  margin?: number;
  overflow?: "visible" | "hidden" | "scroll" | undefined;
}

const ProList: React.FC<ProListProps> = (props) => {
  const screenWidth = useSelector(getScreenWidth);
  const width = props.width !== undefined ? Math.min(props.width, screenWidth * 0.85) : screenWidth * 0.85;
  const scale = props.itemScale !== undefined ? props.itemScale : 1;
  const margin = props.margin !== undefined ? props.margin : 0;
  const onPress = props.onPress;
  if (props.data === undefined)
    return <Text>Empty</Text>


  return (
    <View invisible style={{ alignItems: 'center', justifyContent: 'center', overflow: "hidden" }} center flex>

      {/* <FlashList renderItem={props.renderItems} data={props.data} indicatorStyle='black' estimatedItemSize={250} horizontal scrollEnabled zoomScale={0.8} showsHorizontalScrollIndicator></FlashList> */}
    <ScrollView
      style={{ width: width }}
        horizontal
        indicatorStyle={'white'}
        scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }}
        >
        {props.data.map((item, index) => (
           <View style={{transform: [{scale: scale}], marginHorizontal: margin}} key={index}>
            {props.renderItems({ item, index, onPress })}
           </View>
        ))}
      </ScrollView>
      </View>
  );

};

export default ProList;