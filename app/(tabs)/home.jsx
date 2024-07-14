import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox";
import EmptyState from "../../components/EmptyState";
import { useFocusEffect } from "@react-navigation/native";
import {getFavouritesByUserId, getUserById} from "../../api"
import FavouriteProductDisplay from "../../components/FavouriteProductDisplay"

const Home = () => {
  const [favouritesList, setFavouritesList] = useState([]);

  useFocusEffect(
    React.useCallback(()=>{
      getFavouritesByUserId(2)
      .then((favourites)=>{
        setFavouritesList(favourites)
      })
    },[])
  );

  return (
    <SafeAreaView className="bg-primary flex-1">
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={favouritesList}
        keyExtractor={(item) => item.fav_product_id}
        renderItem={({ item }) => (
          <FavouriteProductDisplay chosenProduct={item} setFavouritesList={setFavouritesList}/>
        )}
        ListHeaderComponent={() => (
          <View className="mt-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">jane_smiths</Text>
              </View>
              <View className="mt-1.5">
                <Image
                  source={images.shopAround}
                  className="w-20 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular">
                Your Favourite Items
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Favourites Yet"
            subtitle="Your favourite items will show up here"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
