import { View, Text, FlatList, Image } from "react-native";
// import {ListItem} from "react-native-elements"
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox";
import EmptyState from "../../components/EmptyState";
import MapComponent from "../../components/MapComponent";
import { useLocalSearchParams } from "expo-router";
import { getProducts } from "../../api";
import ProductCard from "../../components/ProductCard";

const Search = () => {
  const { query } = useLocalSearchParams();
  // console.log(query);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      setProductList(data);
    });
  }, []);

  const filteredResults = productList.filter((product) =>
    product.description.toUpperCase().includes(query.toUpperCase())
  );

  // console.log(productList, "<---productList");

  return (
    <SafeAreaView className="bg-primary flex-1">
      <Text className="text-2xl font-psemibold text-white p-4">
        Report the price of an item
      </Text>
      <SearchBox />
      <FlatList
        // data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
        data={filteredResults}
        keyExtractor={(item) => item.$product_id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
      <MapComponent />
      {/* <Text className="text-2xl font-psemibold text-white p-4">{query}</Text> */}
    </SafeAreaView>
  );
};

export default Search;
