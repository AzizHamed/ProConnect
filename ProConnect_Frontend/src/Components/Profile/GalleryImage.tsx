import {StyleSheet,View,Image, ImageSourcePropType} from 'react-native'
import React from 'react';
import getColors from '../../Constants/Colors';

interface GalleryImageProps {
  source: ImageSourcePropType;
}

const GalleryImage: React.FC<GalleryImageProps> = ({source}) => {
  return (
    <View>
      <Image 
           source={source}
           style={styles.img}
           />
    </View>
  );
}

const styles = StyleSheet.create({
  img:{
    height:80,
    width:80,
    borderColor: getColors().highlight,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  }
})

export default GalleryImage
