import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { View, Text, useWindowDimensions } from "react-native";
import { SceneMap, TabView } from "react-native-tab-view";

const TabThreeScreen = () => {
  function FeedScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>Feed!</Text>
      </View>
    );
  }

  function NotificationsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Notifications!</Text>
      </View>
    );
  }

  const Tab = createMaterialTopTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarLabelStyle: { fontSize: 12 },
        tabBarStyle: { backgroundColor: "powderblue" },
      }}
    >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ tabBarLabel: "Updates" }}
      />
    </Tab.Navigator>
  );
};

export default TabThreeScreen;
