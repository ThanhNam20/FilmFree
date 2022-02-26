import React, { useEffect, useReducer, useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import LoginComponent from "../components/login";
import UserProfileComponent from "../components/user-profile";
import { LOCAL_STORAGE } from "../constants/config";
import { withAuth } from "../HOC/withAuth";
import { AsyncStorageService } from "../services/storage.service";
import { RootState } from "../store/store";

const TabFourScreen = () => {
  const [userData, setUserData] = useState(null);
  const userReducer = useSelector((state: RootState) => state.UserReducer);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user_data = await AsyncStorageService.getItem(
      LOCAL_STORAGE.USER_INFO
    );
    if (user_data) {
      setUserData(user_data);
    } else {
      setUserData(null);
    }
    return user_data ? user_data : null;
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserProfileComponent userInfo={userData} />
    </View>
  );
};

export default withAuth(TabFourScreen);
