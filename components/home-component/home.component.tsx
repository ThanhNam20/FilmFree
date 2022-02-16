import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useGetHomeQuery } from "../../services/public-api.service";
import CarouselBannerComponent from "../carousel-banner";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import FilmCategory from "../category-film";

const HomeComponent = () => {
  const [page, setPage] = useState<number>(0);
  const { data, isLoading, error } = useGetHomeQuery(page);
  const homeState = useSelector((state: RootState) => state.FilmReducer);

  const getMoreHomeData = () => {
    console.log("Get more data");
    setPage(page + 1);
  };

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
      ) : null}
    </View>
  );
};

export default HomeComponent;
