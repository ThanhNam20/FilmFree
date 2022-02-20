import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Pressable, View } from "react-native";
import { ParallaxImage } from "react-native-snap-carousel";
import { useDispatch } from "react-redux";
import { removeMovieDetailData } from "../../store/film/filmSlice";
import { BannerItem } from "./banner-item.style";

const BannerItemComponent = ({ bannerItem }: any) => {
  const navigation = useNavigation();
  const { item, index, parallaxProps } = bannerItem;
  const dispatch = useDispatch();
  const getMovieDetail = () => {
    const movieDetailAddress = item.jumpAddress;
    if (!movieDetailAddress) return;
    const [_, bannerDetail, bannerCategoryId] = movieDetailAddress.split("=");

    const bannerId = bannerDetail.split("&")[0];
    dispatch(removeMovieDetailData());
    navigation.push("MovieDetail", {
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
