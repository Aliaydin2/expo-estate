import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import useScreen from "../../store/screenStore";
const ImageBrightness = ({ route }) => {
  const [shadow,setShadow]=useState(0.5)
  const windowWidth = useScreen((state) => state.windowWidth);
  const uri = route.params.uri;
  const filterArray = [
    { bright: 0.8, con: -1 },
    { bright: 0.8, con: 0 },
    { bright: 0.8, con: 1 },
    { bright: 0.9, con: -1 },
    { bright: 0.9, con: 0 },
    { bright: 0.9, con: 1 },
    { bright: 1, con: -1 },
    { bright: 1, con: 0, origin: true },
    { bright: 1, con: 1 },
  ];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 0.5 }}>
        <FlatList
          data={filterArray}
          numColumns={3}
          horizontal={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{ borderColor: "white", borderWidth: 1 }}
              // onLongPress={() => handleImageLongPress({ item, index })}
            >
              <View
                style={{
                  width: windowWidth / 3,
                  height: windowWidth / 4,
                  ...(item.origin
                    ?{}// { borderWidth: 3, borderColor: "blue" }
                    : {}),
                }}
              >
                <Image
                  source={{ uri: uri }}
                  style={{
                    flex: 1,
                    resizeMode: "contain",
                    opacity: item.bright, //brightness (values between 0 and 1)
                    overlayColor: `rgba(128, 128, 128, ${item.con})`, //contrast (values between -1 and 1)

                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <View
        style={{
          flex: 0.4,
          justifyContent:"center",
         backgroundColor:"red"
        }}
      >
        <Image
          source={{ uri: uri }}
          style={{
            flex: 1,
            resizeMode: "contain",
            shadowColor: `rgba(0, 0, 0, 0)`, //0-1
            shadowOffset: { width: 5, height: 5 },
          }}
        />
      </View>
      {/* <View style={{flexDirection:"row",justifyContent:"space-around"}}>
        <Button title="shadow:0" onPress={()=>setShadow(0)}/>
        <Button title="shadow:0.5" onPress={()=>setShadow(0.5)}/>
        <Button title="shadow:1" onPress={()=>setShadow(1)}/>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ImageBrightness;
