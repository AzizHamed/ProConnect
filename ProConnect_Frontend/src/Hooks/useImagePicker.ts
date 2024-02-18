import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../Services/Firebase/Firebase";
import { useSelector } from "react-redux";
import { getUserAccount } from "../Services/Redux/Slices/AuthSlice";

interface SelectedPicture {
  uri: string;
  fileName: string;
}
export function useImagePicker() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [selectedFiles, setSelectedFiles] = useState<Set<SelectedPicture>>(new Set());
  const [downloadUrls, setDownloadUrls] = useState<Set<string>>(new Set());
  const user = useSelector(getUserAccount);

  useEffect(() => {
    console.log(downloadUrls)
  });

  const selectPictures = async (type: "CAMERA" | "GALLERY", allowsMultipleSelection: boolean = false) => {
    const imagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: allowsMultipleSelection,
      quality: 1,
    };

    try {
      const cameraResp =
        type === "CAMERA"
          ? await ImagePicker.launchCameraAsync(imagePickerOptions)
          : await ImagePicker.launchImageLibraryAsync(imagePickerOptions);

      if (!cameraResp.canceled) {
        const photos: Set<SelectedPicture> = new Set();
        cameraResp.assets.forEach(async (asset) => {
          const { uri } = asset;
          const fileName = uri.split("/").pop() || "photo";
          photos.add({ uri: uri, fileName: fileName });
        });
        setSelectedFiles(previousFiles => new Set([...previousFiles, ...photos]));
        console.log(selectedFiles);
      }
    } catch (e) {
      console.error("Error Uploading Image " + e.message);
    }
  };

  const uploadSelectedPictures = async (uploadPath: string) => {
    const promises = Array.from(selectedFiles).map(async (file) => {
      const uploadResp = await uploadToFirebase(
        file.uri,
        uploadPath + '/' + user?.id,
        file.fileName,
        (onProgress) => console.log(onProgress)
      );
  
      console.log(uploadResp, uploadResp.downloadUrl);
      return uploadResp.downloadUrl;
    });
  
    const urls: string[] = await Promise.all(promises);
    setSelectedFiles(new Set());
    setDownloadUrls(new Set(urls));
  };

  const removeSelectedPicture = (picture: SelectedPicture) => {
    selectedFiles.delete(picture);
    setSelectedFiles(new Set(selectedFiles));
  }

  const clear = () => {
    setSelectedFiles(new Set());
    setDownloadUrls(new Set());
  }

  return { selectPictures, uploadSelectedPictures, selectedFiles, downloadUrls, removeSelectedPicture, clear, permission, requestPermission };
}