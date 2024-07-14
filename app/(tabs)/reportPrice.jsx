import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
// import {ScrollView} from "react-native-virtualized-view"
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "../../constants/images";
import SearchBox from "../../components/SearchBox";
import EmptyState from "../../components/EmptyState";
import MapComponent from "../../components/MapComponent";
import ProductDisplay from "../../components/ProductDisplay";
import CustomButton from "../../components/CustomButton";
import { getProducts, postPrice, getStoresById } from "../../api";
import { Link, router } from "expo-router";
import * as Location from "expo-location";

const ReportPrice = () => {
  const [chosenProduct, setChosenProduct] = useState({});
  const [chosenStore, setChosenStore] = useState("");
  const [chosenStoreName, setChosenStoreName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [postcodeInput, setPostcodeInput] = useState("")
  const [priceInput, setPriceInput] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(chosenProduct, "<--this is chosenProduct");
  console.log(priceInput, "<--this is priceInput");
  console.log(postcode, "<-- this is postcode");
  console.log(chosenStore, "<--this is chosenStore");
  console.log(chosenStoreName, "<-- this is chosenStoreName");

  console.log(
    chosenStore !== 0 && postcode.length && priceInput !== 0,
    "<--ternery logic"
  );

  const regex =
    /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/;

  const submit = () => {
    setIsSubmitted(true);
    postPrice({
      price: priceInput,
      store: chosenStore,
      product: chosenProduct.product_id,
    }).then((data) => {
      console.log(data, "<--postedPrice");
    });
  };

  const reportAnother = () => {
    setIsSubmitted(false);
    setChosenProduct({});
    setPriceInput(0);
  };

  // const handleGPSPress = async() =>{
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status !== "granted") {
  //     setErrorMsg("Permission to access location was denied");
  //     return;
  //   }

  //   let gpsLocation = await Location.getCurrentPositionAsync({});

  //   setLocation({
  //     lat:gpsLocation.coords.latitude,
  //     lng:gpsLocation.coords.longitude,
  //   });
  //   setUsingGPS(true)
  //   setPostcodeInput("")

  //   // console.log("device GPS location--->", gpsLocation);
  // };

  if (!isSubmitted) {
    return (
      <SafeAreaView className="bg-primary">
        <ScrollView>
          <Text className="text-2xl font-psemibold text-white p-4">
            Report the price of an item
          </Text>

          <Text className="text-l font-psemibold text-white p-4">
            Search for items
          </Text>

          {chosenProduct.product_id ? null : (
            <SearchBox setChosenProduct={setChosenProduct} />
          )}

          {chosenProduct.product_id ? (
            <>
              <Text className="text-l font-psemibold text-white p-4">
                Reporting the price of:
              </Text>
              <ProductDisplay
                chosenProduct={chosenProduct}
                setChosenProduct={setChosenProduct}
              />
            </>
          ) : null}

          <Text className="text-l font-psemibold text-white p-4">
            How much did you pay?
          </Text>

          <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4 mb-4">
            <TextInput
              className="text-white mt-0.5  text-white flex-1 font-pregular"
              value={priceInput}
              placeholder="Enter price here in £"
              placeholderTextColor="#CDCDE0"
              keyboardType="numeric"
              onChangeText={(e) => setPriceInput(Number(e))}
            />
          </View>
          <Text className="text-l font-psemibold text-white p-4">
            Where did you buy it?
          </Text>
          <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4 mb-4">
            <TextInput
              className="text-white mt-0.5 text-white flex-1 font-pregular"
              value={postcodeInput}
              placeholder="Enter postcode here"
              placeholderTextColor="#CDCDE0"
              onChangeText={(e) => {
                setPostcodeInput(e)
                if (regex.test(e)) {
                  setPostcode(e);
                }
              }}
            />
          </View>

          <View className="flex-column p-2">
            {chosenStoreName && chosenProduct.product_id && priceInput !== 0 ? (
              <>
                <Text className="text-l font-psemibold text-white p-4">
                  Bought at {chosenStoreName}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  className="bg-secondary rounded-xl min-h-[62px] justify-center items-center"
                  onPress={submit}
                >
                  <Text className={`text-primary font-psemibold text-lg`}>
                    Report this price
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Text className="text-l font-psemibold text-white pb-2 px-2">
                Select shop below:
              </Text>
            )}
          </View>

          <MapComponent
            postcode={postcode}
            setChosenStore={setChosenStore}
            setChosenStoreName={setChosenStoreName}
            chosenStore={chosenStore}
          />
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView className="bg-primary h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[85vh] px-4 my-6">
            <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
              Thank you for submitting
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            className="bg-secondary rounded-xl min-h-[62px] justify-center items-center"
            onPress={reportAnother}
          >
            <Text className={`text-primary font-psemibold text-lg`}>
              Report another price
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default ReportPrice;
