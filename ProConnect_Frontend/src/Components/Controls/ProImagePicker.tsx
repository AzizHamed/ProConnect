import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Carousel, Button, Assets, Text, Colors } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';
import { useImagePicker } from '../../Hooks/useImagePicker';
import ProIconButton from './ProIconButton';

interface ProImagePickerProps {
  uploadPath: string;
}

const ProImagePicker: React.FC<ProImagePickerProps> = ({ uploadPath }) => {
  const { selectPictures, uploadSelectedPictures, selectedFiles, removeSelectedPicture } = useImagePicker();

  const handleUpload = async () => {
    await uploadSelectedPictures(uploadPath);
  };

  return (
    <View>
        <View style={styles.buttonContainer}>
            <ProIconButton materialIcon materialIconName="photo-album" showAddIcon onPress={() => selectPictures('GALLERY')}></ProIconButton>
            <ProIconButton ionicon ioniconName="camera" showAddIcon onPress={() => selectPictures('CAMERA')}></ProIconButton>

        </View>

      <Carousel containerStyle={{ height: 50 }}>
        {Array.from(selectedFiles).map((file, index) => (
          <View key={index}>
            <Image source={{ uri: file.uri }} style={{ width: '100%', height: '100%' }} />
            <MaterialIcons name="close" size={24} color={Colors.failure} onPress={() => removeSelectedPicture(file)} />
          </View>
        ))}
      </Carousel>
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