import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from "react-native-maps";
import { getCoordinatesFromPostCode, getStores, getLocalPrices} from "../api";
import CustomButton from "../components/CustomButton";
import icons from "../constants/icons"

const MapComponent = ({location, chosenProduct, sliderValue}) => {
  let mapRef = useRef(null);
  const [pricesList, setPricesList] = useState([]);
  const [markersList, setMarkersList] = useState([]);
  const [error, setError] = useState(null);
  const [displayedMarker, setDisplayedMarker] = useState(null);


  useEffect(() => {
    console.log(typeof location.lat === "number");
    if (typeof location.lat === "number") {
      getLocalPrices(
        chosenProduct.product_id,
        location.lat,
        location.lng,
        sliderValue)
        .then((prices) => {
          console.log(prices, "<--prices from API");
          setError(null);
          setPricesList(prices);
          return prices;
        })
        .then((prices) => {
          const markers = prices.map((shop, index) => ({
            store_id: shop.store_id,
            locationName: shop.store_name,
            lat: Number(shop.latitude),
            lng: Number(shop.longitude),
            monday: shop.monday,
            tuesday: shop.tuesday,
            wednesday: shop.wednesday,
            thursday: shop.thursday,
            friday: shop.friday,
            saturday: shop.saturday,
            sunday: shop.sunday,
            price: shop.price,
            distanceFromCentre: chosenProduct.distance
          }));
          if (mapRef.current) {
            mapRef.current.fitToCoordinates(
              markers.map((marker) => ({
                latitude: marker.lat,
                longitude: marker.lng,
              })),
              {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
              }
            );
          }
          setMarkersList(markers);
          return markersList;
        })
        .catch((err) => {
          setError(err);
          console.error("An error occurred:", err);
          console.error(
            "Error details:",
            err.response ? err.response.data : err.message
          );
        });
    }
  }, [location]);


  console.log(displayedMarker, "<--displayedMarker");
  console.log(location)
  console.log(markersList, "<--markersList")

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: 53.7908895,
          longitude: -1.555376,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {markersList.map((marker, index) => (
          <Marker
            key={marker.store_id}
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
            // title={marker.locationName}
            onPress={() => {
              setDisplayedMarker(marker.store_id);
            }}
            image={index===0?icons.greenmarker:undefined}
          >
            {/* {marker.store_id == displayedMarker ?  */}
              <Callout
                value={marker.store_id}
                onPress={() => {
                  setDisplayedMarker(null);
                }}
                style={{ flex: 1, position: 'relative' }}
              >
                <View  >
                  <Text style={styles.calloutTitle}>{marker.locationName}</Text>
                  <Text>£{marker.price}</Text>
                  <Text>{marker.monday}</Text>
                  <Text>{marker.tuesday}</Text>
                  <Text>{marker.wednesday}</Text>
                  <Text>{marker.thursday}</Text>
                  <Text>{marker.friday}</Text>
                  <Text>{marker.saturday}</Text>
                  <Text>{marker.sunday} </Text>
                </View>
              </Callout>
              {/* : null}  */}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  calloutTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  calloutContainer:{
    height:300,
    width: 100000,
    justifyContent: "flex-start",
    alignItems: "left",
  }
});

export default MapComponent;
