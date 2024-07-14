import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  TextInput,
  Button,
  TouchableOpacity
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { getUsers, updateUser } from "../../api";
import CustomButton from "../../components/CustomButton";

const Account = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [user_id, setUser_id] = useState(0);

  useEffect(() => {
    try {
      setUser_id(2);
      getUsers(2).then((response) => {
        setUser(response);
        return user;
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChange = async (field, value) => {
    console.log(field, value);

    updateUser(user, user_id).then((response) => {
      console.log("updated user response---->", response);
    });
  };

  const handleButtonPress = (field) => {
    if (editing === field) {
      handleChange(field, tempValue);
      setEditing(null);
    } else {
      setTempValue(user[field]);
      setEditing(field);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View style={styles.container}>
          <Text className="text-3xl text-white text-semibold mt-10 font-psemibold">
            Profile
          </Text>

          {["username", "email"].map((field) => (
            <View key={field} style={styles.fieldContainer}>
              <Text className="text-xl text-white text-semibold mt-10 font-psemibold">
                {field.charAt(0).toUpperCase() + field.slice(1)}:
              </Text>

              {editing === field ? (
                <TextInput
                  className="text-l text-white text-semibold mt-10 font-psemibold"
                  style={styles.input}
                  value={user[field]}
                  onChangeText={(value) => setUser({ ...user, [field]: value })}
                />
              ) : (
                <Text className="text-l text-white text-semibold mt-3 font-psemibold">
                  {user[field]}
                </Text>
              )}

              <TouchableOpacity
                title={editing === field ? `Save ${field}` : `Change ${field}`}
                onPress={()=>handleButtonPress(field)}
                activeOpacity={0.7}
                className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center`}
              >
                <Text
                  className={`text-primary font-psemibold text-lg`}>
                  {editing === field ? `Save ${field}` : `Change ${field}`}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const styles = StyleSheet.create({});
