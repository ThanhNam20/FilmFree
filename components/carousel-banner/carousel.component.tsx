import React from "react";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";
import { SLIDER_HEIGHT, SLIDER_WIDTH } from "../../constants/config";
import BannerItemComponent from "../banner-item";

const CarouselBannerComponent = ({ listBanner }: any) => {
  const renderItem = ({ item, index }: any, parallaxProps: any) => {
    const bannerItem = {
      item,
      index,
      parallaxProps,
    };
    return <BannerItemComponent bannerItem={bannerItem} />;
  };

  return (
    <View style={styles.container}>
      <Carousel
        sliderWidth={SLIDER_WIDTH}
        sliderHeight={SLIDER_HEIGHT}
        itemWidth={SLIDER_WIDTH - 60}
        itemHeight={SLIDER_HEIGHT- 60}
        data={listBanner?.recommendContentVOList}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplayInterval={3000}
        autoplay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default CarouselBannerComponent;
