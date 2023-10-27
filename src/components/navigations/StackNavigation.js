import React from "react";
import ImagePicker from "../Imagepicker/ImagePicker";
import { Button } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ImageFilterDetail from "../Imagepicker/ImageFilter";

const Stack = createNativeStackNavigator();

const ImageStackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ImagePicker"
        screenOptions={{
          headerStyle: {
            backgroundColor: "lightblue",
          },
          headerTintColor: "white", //header yazı rengini ve ok rengini değiştirir.
          headerTitleStyle: { fontWeight: "bold" }, //header style ını vermeye yarıyor
        }}
      >
        <Stack.Screen
          name="ImagePicker" //standart ekran üstü başlık
          component={ImagePicker}
          options={{
            title: "Image Picker", // ekran başlığını değiştirme
            headerTitle: "Resimler", //(props) => <HeaderPng {...props} />,
            //  headerRight:()=>(<Button title="Right" color="gray" onPress={()=>alert("i am a button")}/>),
            //  Home.js içerisinde  sağ button a işlev verildiğinden yoruma aldım.
            headerLeft: () => {},
            headerRight: () => (
              <Button title="Left" onPress={() => alert("i am a button")} />
            ),
          }}
        />
        <Stack.Screen
          name="ImageFilterDetail"
          component={ImageFilterDetail}
          options={{
            title: "Image Picker", // ekran başlığını değiştirme
            headerTitle: "Resimler",  }}
          // options={
          //   ({ route }) => ({
          //     // title: route.params.assetId, //ekrana route ile gönderilen veriden elde edilen bilgi ile header da değişiklik yapmak
          //     headerStyle: {
          //       backgroundColor: "darkblue",
          //     },
          //     headerTintColor: "white", //header yazı rengini ve ok rengini değiştirir.
          //     headerTitleStyle: { fontWeight: "bold" }, //header style ını vermeye yarıyor
          //   })
          //   //title: "User Detail",  ekran başlığını değiştirme
          // }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ImageStackNavigator;
