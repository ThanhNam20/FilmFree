import React, { useState } from "react";
import {
  View
} from "react-native";
import { useSelector } from "react-redux";
import UserProfileComponent from "../components/user-profile";
import { RootState } from "../store/store";

const TabFourScreen = () => {
  const [userData, setUserData] = useState(null);
  const userReducer = useSelector((state: RootState) => state.UserReducer);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <UserProfileComponent userInfo={userReducer.userInfo} />
    </View>
  );
};

export default TabFourScreen;
