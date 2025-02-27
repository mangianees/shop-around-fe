import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton"
import {Link, router} from "expo-router"

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = () =>{
    return router.replace("/home")
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">

          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to ShopAround
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton 
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
            
            />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className= "text-lg text-gray-100 font-pregular">
            Have an account already?
            <Link 
            className="text-log font-psemibold text-secondary"
            href="/sign-in">  Sign In</Link>
            </Text>
            
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
