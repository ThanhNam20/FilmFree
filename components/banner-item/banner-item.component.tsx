import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable, View } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import { BannerItem } from "./banner-item.style";

const BannerItemComponent = ({ bannerItem }: any) => {
  const navigation = useNavigation();
  const { item, index, parallaxProps } = bannerItem;
  const getMovieDetail = () => {
    const movieDetailAddress = item.jumpAddress;
    if (!movieDetailAddress) return;
    const [_, bannerDetail, bannerCategoryId] = movieDetailAddress.split("=");

    const bannerId = bannerDetail.split("&")[0];
    const movieDetailParams = {
      id: bannerId,
      category: bannerCategoryId,
    };
    navigation.navigate("MovieDetail", {
      id: bannerId,
      category: bannerCategoryId,
    });
  };
  return (
    <Pressable onPress={getMovieDetail}>
      <View style={BannerItem.item}>
        <ParallaxImage
          source={{ uri: item?.imageUrl }}
          containerStyle={BannerItem.imageContainer}
          showSpinner={true}
          style={BannerItem.image}
          parallaxFactor={0.5}
          {...parallaxProps}
        />
      </View>
    </Pressable>
  );
};

export default React.memo(BannerItemComponent);
