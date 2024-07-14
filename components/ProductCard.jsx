import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
// import {Card, ListItem, Button, Icon} from react-native-elements
import React from "react";
import { icons } from "../constants";
import { router } from "expo-router";

function ProductCard({
  product,
  setChosenProduct,
  setSearchTerm
}) {

  function handlePress(){
    setChosenProduct(product)
    setSearchTerm("")
  }
  return (
    <TouchableOpacity
      className="flex-col items-center px-4 mb-7 mt-7"
      onPress={handlePress}
    >
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border secondary justify-center items-center p-0.5">
            <Image
              source={{uri:product.product_photo_url}}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-white font-psemibold text-sm"
              numberOfLines={1}
            >
              {product.brand}: {product.product} - {product.size}
            </Text>
            <Text className="text-gray-100 font-pregular" numberOfLines={1}>
              {product.description}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;
