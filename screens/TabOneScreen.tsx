import React, { useState } from "react";
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet } from "react-native";
import CarouselBannerComponent from "../components/carousel-banner";

import EditScreenInfo from "../components/EditScreenInfo";
import HomeComponent from "../components/home-component";
import { Text, View } from "../components/Themed";
import { mainColor } from "../constants/config";
import { useGetHomeQuery } from "../services/public-api.service";
import { RootTabScreenProps } from "../types";

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  return (
    <SafeAreaView style={styles.container}>
      <HomeComponent/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor
  }
});
