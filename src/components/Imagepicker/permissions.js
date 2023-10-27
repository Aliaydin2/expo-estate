import * as ImagePicker from "expo-image-picker";
export const permisionFunction = async () => {
  const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
  const imagePermission =
    await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!imagePermission.granted) {
    alert("Permission for media access needed.");
  }
  if (!cameraPermission.granted) {
    alert("Permission for camera access needed.");
  }
};
