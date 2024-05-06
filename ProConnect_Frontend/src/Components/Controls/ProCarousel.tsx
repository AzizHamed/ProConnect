import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Colors, View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { IS_WEB } from '../../Constants/Values';
import ProIconButton from './ProIconButton';
import { useSelector } from 'react-redux';
import { getScreenWidth } from '../../Services/Redux/Slices/DimensionSlice';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleProp, ViewStyle } from 'react-native';

interface ProCarouselProps {
  data: any[] | undefined;
  renderItems: ({ item, index }: { item: any, index: number }) => JSX.Element;
  onSnapToItem?: (index: number) => void;
  onPress?: () => void;
  width?: number;
  height?: number;
  loop?: boolean;
  displayArrows?: boolean;
  arrowOffset?:  number;
  displayIndex?: boolean;
  scrollAnimationDuration?: number;
  blockClicks?: boolean;
  mode: "parallax" | "horizontal-stack" | "vertical-stack";
  overflow?: "visible" | "hidden" | "scroll" | undefined;
  parallaxScrollingOffset?: number;
}

const ProCarousel: React.FC<ProCarouselProps> = (props) => {
  const screenWidth = useSelector(getScreenWidth);
  const carouselRef = useRef(null);
  const loop = props.loop || false;
  const width = props.width !== undefined ? Math.min(props.width, screenWidth * 0.95) : screenWidth * 0.85;
  const height = props.height || width;
  const displayArrows = props.displayArrows || IS_WEB();
  const displayIndex = props.displayIndex || true;
  const scrollAnimationDuration = props.scrollAnimationDuration || 500;
  const mode = props.mode || 'parallax';
  const [indexString, setIndexString] = useState<string>('0/0');
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);
  const parallaxScrollingOffset = props.parallaxScrollingOffset || 50;
  const leftArrowStyle  : StyleProp<ViewStyle> = props.arrowOffset  !== undefined ? {position: "absolute", left: -props.arrowOffset} : {};
  const rightArrowStyle : StyleProp<ViewStyle>  = props.arrowOffset !== undefined ? {position: "absolute", right: -props.arrowOffset} : {};

  const onSnapToItem = (index: number) => {
    if (props.onSnapToItem)
      props.onSnapToItem(index);
    setIndexString(generateIndexString());
    setIsFirst(index === 0);
    setIsLast((index === props.data.length - 1 || props.data.length === 0));

  }
  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handlePrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  if (props.data === undefined)
    return <Text>Empty</Text>

  useEffect(() => {
    setIndexString(generateIndexString());
  }, [])
  
  return (
    <View invisible style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
      {displayArrows && <ProIconButton materialIcon materialIconName="arrow-back" onPress={handlePrev} disabled={isFirst} displayBackground style={leftArrowStyle}/>}
      <GestureHandlerRootView style={{ flexDirection: 'column' }}>
        {/* Stop parent clicks from triggering when clicking on the carousel items */}
        {/* <WrapperElement style={{margin: 0, padding: 0}} onPress={props.blockClicks ? ()=>{} : ()=>{if (props.onPress) props.onPress();}}>  */}

          <Carousel
            loop={loop}
            width={width}
            height={height}
            data={props.data}
            style={{ overflow: props.overflow, backgroundColor: Colors.backgroundSecondary, borderRadius: 5 }}
            scrollAnimationDuration={scrollAnimationDuration}
            ref={carouselRef}
            onSnapToItem={onSnapToItem}
            renderItem={props.renderItems}
            // snapEnabled={true}
            mode={mode}
            modeConfig={mode === 'parallax' ? {parallaxScrollingOffset: parallaxScrollingOffset, parallaxAdjacentItemScale: 0.6} : 
                        mode === 'horizontal-stack' ? { stackInterval: 10, moveSize: 3} :
                        mode === 'vertical-stack' ? { stackInterval: 10, moveSize: 3 } : undefined}

          />
        {/* </WrapperElement > */}
        {displayIndex && <Text textAlign='center' style={{ alignSelf: 'center' }}>{indexString}</Text>}
      </GestureHandlerRootView>
      {displayArrows && <ProIconButton materialIcon materialIconName="arrow-forward" onPress={handleNext} disabled={isLast} displayBackground style={rightArrowStyle}/>}
    </View>
  );

  function generateIndexString(): string {
    return (props.data && props.data?.length > 0) ? `${(carouselRef.current?.getCurrentIndex() + 1)}/${(props.data?.length)}` : ``;
  }
};

export default ProCarousel;