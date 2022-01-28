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
            item.homeSectionType === "BANNER" ? (
              <CarouselBannerComponent listBanner={item} />
            ) : (
              <FilmCategory listFilmCategory={item} />
            )
          }
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={true}
          onEndReached={getMoreHomeData}
          onEndReachedThreshold={0.1}
          scrollEventThrottle={150}
          ListFooterComponent={() => <ActivityIndicator />}

          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={5} // Reduce initial render amount
          maxToRenderPerBatch={1} // Reduce number in each render batch
          updateCellsBatchingPeriod={1000} // Increase time between renders
          windowSize={7} // Reduce the window size

        />
      ) : null}
    </View>
  );
};

export default HomeComponent;
