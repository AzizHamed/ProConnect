import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSelector } from "react-redux";
import { getUserAccount } from "../Services/Redux/Slices/AuthSlice";
import { SelectedFile } from "../Constants/Types";

export function useImagePicker() {
  const [permission, requestPermission] = ImagePicker.useCameraPermissions();
  const [selectedFiles, setSelectedFiles] = useState<Set<SelectedFile>>(new Set());
  const [downloadUrls, setDownloadUrls] = useState<Set<string>>(new Set());

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
        const photos: Set<SelectedFile> = new Set();
        cameraResp.assets.forEach(async (asset) => {
          const { uri } = asset;
          const fileName = uri.split("/").pop() || "photo";
          photos.add({ uri: uri, fileName: fileName });
        });
        setSelectedFiles(previousFiles => new Set([...previousFiles, ...photos]));
      }
    } catch (e) {
      console.error("Error Uploading Image " + (e as Error).message);
    }
  };


  const removeSelectedPicture = (picture: SelectedFile) => {
    selectedFiles.delete(picture);
    setSelectedFiles(new Set(selectedFiles));
  }

  const clear = () => {
    setSelectedFiles(new Set());
    setDownloadUrls(new Set());
  }

  return { selectPictures, selectedFiles, downloadUrls, removeSelectedPicture, clear, permission, requestPermission };
}
