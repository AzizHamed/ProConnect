import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native-ui-lib';
import { useSelector } from 'react-redux';
import { getScreenWidth } from '../../Services/Redux/Slices/DimensionSlice';
import { ScrollView, StyleProp, ViewStyle } from 'react-native';
import { IS_WEB } from '../../Constants/Values';
import ProIconButton from '../Controls/ProIconButton';

interface ProListProps {
  data: any[] | undefined;
  renderItems: ({ item, index, onPress }: { item: any, index: number, onPress?: () => void }) => JSX.Element;
  onPress?: () => void;
  width?: number;
  itemScale?: number;
  margin?: number;
  overflow?: "visible" | "hidden" | "scroll" | undefined;
  displayArrows?: boolean;
  arrowOffset?:  number;
  scrollSteps?: number;
}

const ProList: React.FC<ProListProps> = (props) => {
  const screenWidth = useSelector(getScreenWidth);
  const width = props.width !== undefined ? Math.min(props.width, screenWidth * 0.85) : screenWidth * 0.85;
  const scale = props.itemScale !== undefined ? props.itemScale : 1;
  const margin = props.margin !== undefined ? props.margin : 0;
  const leftArrowStyle  : StyleProp<ViewStyle> = props.arrowOffset  !== undefined ? {position: "absolute", left: -props.arrowOffset} : {};
  const rightArrowStyle : StyleProp<ViewStyle>  = props.arrowOffset !== undefined ? {position: "absolute", right: -props.arrowOffset} : {};
  const displayArrows = props.displayArrows || IS_WEB();
  const [scrollOffset, setScrollOffset] = useState(0);
  const scrollViewRef = useRef(null);
  // const scrollSteps = props.scrollSteps || (props.data !== undefined ? props.data.length : 1);
  const scrollStepSize = width * 0.7;

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      updateScrollPosition(Math.max(scrollOffset - scrollStepSize, 0));
    }
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      updateScrollPosition(Math.min(scrollOffset + scrollStepSize, scrollViewRef.current.scrollWidth));
    }
  };

  const updateScrollPosition = (offset: number) => {
    setTimeout(() => {
      console.log('scrollOffset:', scrollOffset)
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: offset, y: 0, animated: true });
      }      
    }, 100);
  }

  const handleScroll = (event) => {
    setScrollOffset(event.nativeEvent.contentOffset.x);
  };

  const onPress = props.onPress;
  if (props.data === undefined)
    return <Text>Empty</Text>


  return (
    <View invisible style={{ alignItems: 'center', justifyContent: 'center', overflow: "hidden" }} row center flex>
      {displayArrows && <ProIconButton materialIcon materialIconName="arrow-back" onPress={scrollToTop} displayBackground style={leftArrowStyle}/>}

      {/* <FlashList renderItem={props.renderItems} data={props.data} indicatorStyle='black' estimatedItemSize={250} horizontal scrollEnabled zoomScale={0.8} showsHorizontalScrollIndicator></FlashList> */}
    <ScrollView
    onScroll={handleScroll}
      style={{ width: (width - 100) , alignSelf: 'center' }}
      ref={scrollViewRef}
        horizontal
        scrollEnabled
        indicatorStyle={'white'}
        scrollIndicatorInsets={{ top: 10, left: 10, bottom: 10, right: 10 }}
        >
        {props.data.map((item, index) => (
           <View style={{transform: [{scale: scale}], marginHorizontal: margin}} key={index}>
            {props.renderItems({ item, index, onPress })}
           </View>
        ))}
      </ScrollView>
      {displayArrows && <ProIconButton materialIcon materialIconName="arrow-forward" onPress={scrollToBottom} displayBackground style={rightArrowStyle}/>}

      </View>
  );

};

export default ProList;