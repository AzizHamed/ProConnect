import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Colors, View, Text } from 'react-native-ui-lib';
import { IS_WEB, defaultWidthNumber } from '../../Constants/Values';
import ProIconButton from './ProIconButton';

interface ProCarouselProps {
  data: any[] | undefined;
  renderItems: ({ item, index }: { item: any, index: number }) => JSX.Element;
  onSnapToItem?: (index: number) => void;
  width?: number;
  height?: number;
  loop?: boolean;
  displayArrows?: boolean;
  displayIndex?: boolean;
}

const ProCarousel: React.FC<ProCarouselProps> = (props) => {
    const carouselRef = useRef(null);
    const loop = props.loop || false;
    const width = props.width || defaultWidthNumber - 50;
    const displayArrows = props.displayArrows || IS_WEB();
    const displayIndex = props.displayIndex || true;
    const [indexString, setIndexString] = useState<string>('0/0')
    
    const onSnapToItem = (index: number) => {
      if(props.onSnapToItem)
        props.onSnapToItem(index);
      console.log('current index:', index);
      setIndexString(generateIndexString());
      
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
    
    if(props.data ===undefined) 
    return <Text>Empty</Text>
    
    useEffect(() => {
      setIndexString(generateIndexString());
    }, [])
  return (
    <View invisible style={{alignItems: 'center', justifyContent:'center', flexDirection: 'row'}}>
        {displayArrows && <ProIconButton materialIcon materialIconName="arrow-back" onPress={handlePrev} />}
        <View style={{flexDirection: 'column'}}>

        <Carousel
          loop={loop}
          width={width}
          height={width}
          data={props.data}
          style={{borderWidth: 1, borderColor: Colors.$backgroundDark, backgroundColor: Colors.backgroundSecondary, borderRadius: 5}}
          scrollAnimationDuration={1000}
          ref={carouselRef}
          onSnapToItem={onSnapToItem}
          renderItem={props.renderItems}
          />
          {displayIndex && <Text textAlign='center' style={{alignSelf:'center'}}>{indexString}</Text>}
          </View>
          {displayArrows && <ProIconButton materialIcon materialIconName="arrow-forward" onPress={handleNext} />}
      </View>
  );

  function generateIndexString(): string {
    return `${(carouselRef.current?.getCurrentIndex() + 1)}/${(props.data.length)}`;
  }
};

export default ProCarousel;