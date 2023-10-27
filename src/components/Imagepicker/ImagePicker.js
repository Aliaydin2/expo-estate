import React, { useEffect } from "react";
import {
  Button,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { permisionFunction } from "./permissions";
import { idMaker } from "./idMaker";
import useImage from "../../store/imageStrore";
import useScreen from "../../store/screenStore";

export default function ImagePickerExample({ navigation }) {
  const image = useImage((state) => state.image);
  const setImage = useImage((state) => state.setImage);
  const windowWidth = useScreen((state) => state.windowWidth);
  //const  windowHeight  = useScreen((state) => state.windowHeight);
  const maxImage = 5;
  useEffect(() => {
    permisionFunction();
  }, []);

  const handleImageUpload = async (result) => {
    try {
      const updatedAssets = result.assets;
      const newImageArray = [...image, ...updatedAssets];
      const updatedImageArray = await idMaker(newImageArray);
      await setImage(updatedImageArray);
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };

  const pickImage = async () => {
    const imagePermission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (imagePermission.granted === false) {
      alert("You've refused to allow this app to access your Library!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      aspect: [4, 3],
      quality: 0.5,
      selectionLimit: maxImage,
    });
    if (!result.canceled) {
      handleImageUpload(result);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.getCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      handleImageUpload(result);
    }
  };
  const deleteAll = () => {
    Alert.alert("Confirmation", "Tüm fotoğraflar silinsin mi?", [
      {
        text: "Hayır",
        onPress: () => {
          return;
        },
      },
      {
        text: "Evet",
        onPress: () => {
          setImage([]);
        },
      },
    ]);
  };
  
  const handleImageLongPress = ({ item, index }) => {
    Alert.alert("Confirmation", "Are you sure you want to select this image?", [
      {
        text: "delete",
        onPress: () => {
          const updatedImage = [...image];
          updatedImage.splice(index, 1);
          setImage(updatedImage);
        },
      },
      {
        text: "edit",
        onPress: () => {
          console.log(item, index),
            navigation.navigate("ImageFilterDetail", {
              uri: item.uri,
              index,
              item,
            });
        },
      },
      {
        text: "order",
        onPress: 
          orderImage(item, index)
      },
    ]);
  };
  const orderImage=(item, index)=>{console.log(item)}
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 0.2,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: "white",
            flexDirection: "row",
          }}
        >
          <Button title="Sil" onPress={deleteAll} />
          <Button title="Kamera" onPress={takePhoto} />
          <Button title="Galeri" onPress={pickImage} />
        </View>
        <View>
          <Text
            style={
              image.length > maxImage ? { color: "red" } : { color: "black" }
            }
          >
            {image.length}/{maxImage}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 0.8,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "gray",
        }}
      >
        <FlatList
          data={image}
          numColumns={3}
          horizontal={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ borderColor: "white", borderWidth: 1 }}
              onLongPress={() => handleImageLongPress({ item, index })}
            >
              <View style={{ width: windowWidth / 3, height: windowWidth / 4 }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{ flex: 1, resizeMode: "contain" }}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.assetId.toString()}
        />
      </View>
    </View>
  );
}
