import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useGetHomeQuery } from "../../services/public-api.service";
import CarouselBannerComponent from "../carousel-banner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FilmCategory from "../category-film";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { SLIDER_HEIGHT, SLIDER_WIDTH } from "../../constants/config";




const HomeComponent = () => {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, error } = useGetHomeQuery(page);
  const homeState = useSelector((state: RootState) => state.FilmReducer);
  
  const getMoreHomeData = () => {
    console.log("Get more data");
    setPage(page + 1);
  };

  const SkeletonLoading = () => {
    return (
      <SkeletonPlaceholder highlightColor="#eee" backgroundColor="#353E4D">
        <SkeletonPlaceholder.Item
          height={SLIDER_HEIGHT / 4}
          width={SLIDER_WIDTH}
          margin={10}
          paddingLeft={10}
          paddingRight={10}
        ></SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          paddingTop={20}
          display={"flex"}
          flexDirection={"row"}
        >
          <SkeletonPlaceholder.Item
            width={SLIDER_WIDTH / 3}
            height={SLIDER_HEIGHT / 3 - 10}
            marginLeft={10}
            borderRadius={8}
          ></SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={SLIDER_WIDTH / 3}
            height={SLIDER_HEIGHT / 3 - 10}
            marginLeft={10}
            borderRadius={8}
          ></SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={SLIDER_WIDTH / 3}
            height={SLIDER_HEIGHT / 3 - 10}
            marginLeft={10}
            borderRadius={8}
          ></SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>

        <SkeletonPlaceholder.Item
          paddingTop={20}
          display={"flex"}
          flexDirection={"row"}
        >
          <SkeletonPlaceholder.Item
            width={SLIDER_WIDTH / 3}
            height={SLIDER_HEIGHT / 3 - 10}
            marginLeft={10}
            borderRadius={8}
          ></SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={SLIDER_WIDTH / 3}
            height={SLIDER_HEIGHT / 3 - 10}
            marginLeft={10}
            borderRadius={8}
          ></SkeletonPlaceholder.Item>
          <SkeletonPlaceholder.Item
            width={SLIDER_WIDTH / 3}
            height={SLIDER_HEIGHT / 3 - 10}
            marginLeft={10}
            borderRadius={8}
          ></SkeletonPlaceholder.Item>
        </SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  if (isLoading) {
    return <SkeletonLoading />;
  }

  return (
    <View>
      {homeState.listFilmData ? (
        <FlatList
          data={homeState.listFilmData}
          renderItem={({ item }: any) =>
            item.bannerProportion === null ? (
              item.homeSectionType === "BANNER" ? (
                <CarouselBannerComponent listBanner={item} />
              ) : (
                <FilmCategory listFilmCategory={item} />
              )
            ) : null
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          onEndReached={getMoreHomeData}
          onEndReachedThreshold={0.5}
          scrollEventThrottle={500}
          ListFooterComponent={() => <ActivityIndicator />}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default HomeComponent;
