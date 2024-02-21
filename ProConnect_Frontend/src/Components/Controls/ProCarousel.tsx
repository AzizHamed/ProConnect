import React, { useRef } from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Colors, View } from 'react-native-ui-lib';
import { IS_WEB, defaultWidthNumber } from '../../Constants/Values';
import ProIconButton from './ProIconButton';

interface ProCarouselProps {
  data: any[];
  renderItems: ({ item, index }: { item: any, index: number }) => JSX.Element;
  onSnapToItem?: (index: number) => void;
  width?: number;
  height?: number;
  loop?: boolean;
  displayArrows?: boolean;
}

const ProCarousel: React.FC<ProCarouselProps> = (props) => {
    const carouselRef = useRef(null);
    const loop = props.loop || false;
    const width = props.width || defaultWidthNumber - 50;
    const displayArrows = props.displayArrows || IS_WEB();
    const onSnapToItem = props.onSnapToItem || ((index) => {console.log('current index:', index)})
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

  return (
    <View invisible style={{alignItems: 'center', justifyContent:'center', flexDirection: 'row'}}>
        {displayArrows && <ProIconButton materialIcon materialIconName="arrow-back" onPress={handlePrev} />}
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
          {displayArrows && <ProIconButton materialIcon materialIconName="arrow-forward" onPress={handleNext} />}
      </View>
  );
};

export default ProCarousel;