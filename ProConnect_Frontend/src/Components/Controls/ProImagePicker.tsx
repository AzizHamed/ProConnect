import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Colors, Text } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';
import { useImagePicker } from '../../Hooks/useImagePicker';
import ProIconButton from './ProIconButton';
import Carousel from 'react-native-reanimated-carousel';
import { defaultWidthNumber } from '../../Constants/Values';

interface ProImagePickerProps {
  uploadPath: string;
}

const ProImagePicker: React.FC<ProImagePickerProps> = ({ uploadPath }) => {
  const { selectPictures, uploadSelectedPictures, selectedFiles, removeSelectedPicture } = useImagePicker();
  const width = defaultWidthNumber

  const handleUpload = async () => {
    await uploadSelectedPictures(uploadPath);
  };

  return (
    <View>
        <View style={styles.buttonContainer}>
            <ProIconButton materialIcon materialIconName="photo-album" showAddIcon onPress={() => selectPictures('GALLERY')}></ProIconButton>
            <ProIconButton ionicon ioniconName="camera" showAddIcon onPress={() => selectPictures('CAMERA')}></ProIconButton>

        </View>
        <Carousel
                loop
                width={width}
                height={width / 2}
                data={Array.from(selectedFiles || [])}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                    >
                        <View key={index}
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                        >
                        <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%' }} />
                        <MaterialIcons name="close" size={24} style={{position: 'absolute', top: 5, right: 5}} color={Colors.failure} onPress={() => removeSelectedPicture(item)} />
                    </View>
                    </View>
                )}
            />
      
{/* 
        <Carousel
                width={width}
                height={200}
                mode='horizontal-stack'
                // data={selectedFiles ? Array.from(selectedFiles) : []}
                data = {[{uri: 'https://www.w3schools.com/w3images/lights.jpg'}, {uri: 'https://www.w3schools.com/w3images/lights.jpg'}, {uri: 'https://www.w3schools.com/w3images/lights.jpg'}]}
                scrollAnimationDuration={500}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index, item }) => (
                    <View key={index}
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                        }}
                        >
                        <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%' }} />
                        <MaterialIcons name="close" size={24} color={Colors.failure} onPress={() => removeSelectedPicture(item)} />
                    </View>
                )}
            /> */}
      <Button label="Upload" onPress={handleUpload} />
    </View>
  );
};

export default ProImagePicker;

const styles = StyleSheet.create({
    buttonContainer:{
        flexDirection: 'row',
    }
})