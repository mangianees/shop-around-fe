import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
// import {Card, ListItem, Button, Icon} from react-native-elements
import React from "react";
import { icons } from "../constants";
import { router } from "expo-router";

function ProductDisplay({ chosenProduct, setChosenProduct }) {
  return (
    <View className="flex-col items-center px-4 mb-4">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border secondary justify-center items-center p-0.5">
            <Image
              source={{uri:chosenProduct.product_photo_url}}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {chosenProduct.brand}: {chosenProduct.product} -{" "}
              {chosenProduct.size}
            </Text>
            <Text className="text-gray-100 font-pregular" numberOfLines={1}>
              {chosenProduct.description}
            </Text>
          </View>
        </View>
        <View className="pt-2 flex-row">
          <TouchableOpacity onPress={() => setChosenProduct({})}>
            <Text className="text-white">Change</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default ProductDisplay;
