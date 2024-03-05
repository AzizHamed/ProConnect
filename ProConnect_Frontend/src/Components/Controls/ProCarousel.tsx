import React, { useEffect, useRef, useState } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Colors, View, Text, TouchableOpacity } from 'react-native-ui-lib';
import { IS_WEB } from '../../Constants/Values';
import ProIconButton from './ProIconButton';

interface ProCarouselProps {
  data: any[] | undefined;
  renderItems: ({ item, index }: { item: any, index: number }) => JSX.Element;
  onSnapToItem?: (index: number) => void;
  onPress?: () => void;
  width?: number;
  height?: number;
  loop?: boolean;
  displayArrows?: boolean;
  displayIndex?: boolean;
  scrollAnimationDuration?: number;
}

const ProCarousel: React.FC<ProCarouselProps> = (props) => {
  const carouselRef = useRef(null);
  const loop = props.loop || false;
  const width = props.width || 200;
  const height = props.height || width;
  const displayArrows = props.displayArrows || IS_WEB();
  const displayIndex = props.displayIndex || true;
  const scrollAnimationDuration = props.scrollAnimationDuration || 500;
  const [indexString, setIndexString] = useState<string>('0/0');
  const [isFirst, setIsFirst] = useState<boolean>(true);
  const [isLast, setIsLast] = useState<boolean>(false);

  const onSnapToItem = (index: number) => {
    if (props.onSnapToItem)
      props.onSnapToItem(index);
    console.log('current index:', index);
    setIndexString(generateIndexString());
    setIsFirst(index === 0);
    setIsLast(index === props.data.length - 1);

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
      {displayArrows && <ProIconButton materialIcon materialIconName="arrow-back" onPress={handlePrev} disabled={isFirst} />}
      <View style={{ flexDirection: 'column' }}>
        {/* Stop parent clicks from triggering when clicking on the carousel items */}
        <TouchableOpacity  onPress={() => { props.onPress?.(); }} style={{margin: 0, padding: 0}}> 

          <Carousel
            loop={loop}
            width={width}
            height={height}
            data={props.data}
            style={{ borderWidth: 1, borderColor: Colors.$backgroundDark, backgroundColor: Colors.backgroundSecondary, borderRadius: 5 }}
            scrollAnimationDuration={scrollAnimationDuration}
            ref={carouselRef}
            onSnapToItem={onSnapToItem}
            renderItem={props.renderItems}
          />
        </TouchableOpacity >
        {displayIndex && <Text textAlign='center' style={{ alignSelf: 'center' }}>{indexString}</Text>}
      </View>
      {displayArrows && <ProIconButton materialIcon materialIconName="arrow-forward" onPress={handleNext} disabled={isLast} />}
    </View>
  );

  function generateIndexString(): string {
    return `${(carouselRef.current?.getCurrentIndex() + 1)}/${(props.data.length)}`;
  }
};

export default ProCarousel;