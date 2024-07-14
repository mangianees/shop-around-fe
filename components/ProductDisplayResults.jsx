import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
// import {Card, ListItem, Button, Icon} from react-native-elements
import React, { useState } from "react";
import { icons } from "../constants";
import { router } from "expo-router";
import { deleteFavourite, addToFavourites, getFavouritesByUserId } from "../api";
import { useFocusEffect } from "@react-navigation/native";

function FavouriteProductDisplay({ chosenProduct }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const [favProductId, setFavProductId] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      getFavouritesByUserId(2).then((favourites) => {
        const favouriteIds = favourites.map((favourite) => favourite.product);

        if (favouriteIds.includes(chosenProduct.product_id)) {
          setIsFavourite(true);
          setFavProductId(
            favourites[favourites.indexOf(chosenProduct.product_id)]
              .fav_product_id
          );
        }
      });
    }, [])
  );

  function handlePress(chosenProduct) {
    console.log(chosenProduct);
    if (isFavourite) {
      deleteFavourite(favProductId).then(() => {
        setIsFavourite(false);
      });
    } else {
      addToFavourites(chosenProduct.product_id, 2).then(
        ({ fav_product_id }) => {
          setIsFavourite(true);
          setFavProductId(fav_product_id);
        }
      );
    }
  }

  return (
    <View className="flex-col items-center px-4 mt-4">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border secondary justify-center items-center p-0.5">
            <Image
              source={{ uri: chosenProduct.product_photo_url }}
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
          <TouchableOpacity onPress={() => handlePress(chosenProduct)}>
            {isFavourite ? (
              <Text className="text-white">Remove from Favourites</Text>
            ) : (
              <Text className="text-white">Add to Favourites</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default FavouriteProductDisplay;
