import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
// import {Card, ListItem, Button, Icon} from react-native-elements
import React from "react";
import { icons } from "../constants";
import { router } from "expo-router";
import {deleteFavourite} from "../api"




function FavouriteProductDisplay({ chosenProduct, setFavouritesList }) {

  function handlePress(chosenProduct){
    console.log(chosenProduct)
    deleteFavourite(chosenProduct.fav_product_id)
    .then(()=>{
      setFavouritesList((currentFavouritesList)=>{
        return currentFavouritesList.filter((favourite)=>favourite.fav_product_id!==chosenProduct.fav_product_id)
      })
    })

  }

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
          <TouchableOpacity
            onPress={()=>handlePress(chosenProduct)}>
            <Text className="text-white">Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default FavouriteProductDisplay;
