import React from "react";
import {
  SafeAreaView,
  StyleSheet
} from "react-native";
import HomeComponent from "../components/home-component";
import { mainColor } from "../constants/config";
import { withAuth } from "../HOC/withAuth";

const TabOneScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeComponent />
    </SafeAreaView>
  );
};

export default withAuth(TabOneScreen);
const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
  },
});
