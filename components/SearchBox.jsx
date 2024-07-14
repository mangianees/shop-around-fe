import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, usePathname } from "expo-router";
import { icons } from "../constants";
import { getProducts } from "../api";
import ProductCard from "../components/ProductCard";
import ProductDisplay from "./ProductDisplay";

const SearchBox = ({ setChosenProduct }) => {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    getProducts().then((data) => {
      // console.log(data, "<-- data within useEffect");
      setProductList(data);
      return data;
    });
  }, []);

  // console.log(productList, "<--this is productList");

  const filteredResults = productList.filter(
    (product) =>
      product.description.toUpperCase().includes(searchTerm.toUpperCase()) ||
      product.brand.toUpperCase().includes(searchTerm.toUpperCase()) ||
      product.product.toUpperCase().includes(searchTerm.toUpperCase()) ||
      product.size.toUpperCase().includes(searchTerm.toUpperCase())
  );

  // console.log(filteredResults, "<--this is filteredResults");

  const searchData = searchTerm.length ? filteredResults : [];


  return (
    <>
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
        <TextInput
          className="text-white mt-0.5 text-white flex-1 font-pregular"
          value={searchTerm}
          placeholder="Type item name here"
          placeholderTextColor="#CDCDE0"
          onChangeText={(e) => setSearchTerm(e)}
        />
      </View>
      {searchData.map((item) => (
        <ProductCard
          key={item.product_id}
          product={item}
          setChosenProduct={setChosenProduct}
          setSearchTerm={setSearchTerm}
        />
      ))}
    </>
  );
};

export default SearchBox;
