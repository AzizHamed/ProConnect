import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Colors } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';
import { useImagePicker } from '../../Hooks/useImagePicker';
import ProIconButton from './ProIconButton';
import { IS_WEB } from '../../Constants/Values';
import ProCarousel from './ProCarousel';
import { SelectedFile } from '../../Constants/Types';

interface ProImagePickerProps {
  uploadPath: string;
  setSelectedFiles: (files: SelectedFile[]) => void;
}

const ProImagePicker: React.FC<ProImagePickerProps> = (props) => {
  const { selectPictures, selectedFiles, removeSelectedPicture } = useImagePicker();
  const isWeb = IS_WEB();

  useEffect(() => {
    props.setSelectedFiles(Array.from(selectedFiles || []));
    // console.log('Set selected files: ', selectedFiles)
  },[selectedFiles])

  return (
    <View>
      <View style={styles.buttonContainer}>
        {!isWeb && <ProIconButton displayBackground materialIcon materialIconName="photo-album" showAddIcon onPress={() => selectPictures('GALLERY')}></ProIconButton>}
        <ProIconButton ionicon displayBackground ioniconName="camera" showAddIcon onPress={() => selectPictures('CAMERA', true)}></ProIconButton>

      </View>
      <ProCarousel data={Array.from(selectedFiles || [])}  mode='parallax' width={isWeb ? 300 : undefined}
        renderItems={({ item, index }) => (
          <View key={index}  style={{ flex: 1, borderWidth: 1, justifyContent: 'center' }} >
            <Image source={{ uri: item.uri }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            <MaterialIcons name="close" size={24} style={{ position: 'absolute', top: 5, right: 5 }} color={Colors.failure} onPress={() => removeSelectedPicture(item)} />
          </View>
      )} />


      {/* <Button label="Upload" onPress={handleUpload} /> */}
    </View>
  );
};

export default ProImagePicker;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
})