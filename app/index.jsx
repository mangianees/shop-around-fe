import { StatusBar } from "expo-status-bar";
import { ImageBase, ScrollView, Text, View, Image } from "react-native";
import { Link, Redirect, router} from "expo-router";
import { images } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="w-full items-center min-h-[85-ph] px-4">
          <Image
            source={images.shopAround}
            className="w-[250px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.shopLogo}
            className="max-w[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Find Bargains with{" "}
              <Text className="text-secondary-200">ShopAround</Text>
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}
