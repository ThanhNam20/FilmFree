import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useGetListRecommendMovieQuery } from "../../services/public-api.service";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { recommendListStyle } from "./recommend-list.style";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useNavigation } from "@react-navigation/native";

const RecommendListComponent = () => {
  const [skeletonArray, setSkeletonArray] = useState(new Array(10));
  const navigation = useNavigation();
  const { data, isLoading, error } = useGetListRecommendMovieQuery(null);
  const recommendListMovie = useSelector(
    (state: RootState) => state.SearchReducer
  );

  const getMovieDetail = (item: any) => {
    navigation.navigate("MovieDetail", {
      id: item.id,
      category: item.domainType,
    });
  };

  if (isLoading) {
    return (
      <FlatList
        data={skeletonArray}
        renderItem={(item) => (
          <SkeletonPlaceholder highlightColor="#eee" backgroundColor="#353E4D">
            <SkeletonPlaceholder.Item
              marginBottom={10}
              marginLeft={10}
              flexDirection="row"
              alignItems="center"
            >
              <SkeletonPlaceholder.Item width={100} height={60} />
              <SkeletonPlaceholder.Item marginLeft={20}>
                <SkeletonPlaceholder.Item
                  width={120}
                  height={20}
                  borderRadius={4}
                />
                <SkeletonPlaceholder.Item
                  marginTop={6}
                  width={80}
                  height={20}
                  borderRadius={4}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }

  return (
    <View style={recommendListStyle.container}>
      {recommendListMovie.recommendMovieList ? (
        <FlatList
          data={recommendListMovie?.recommendMovieList}
          renderItem={({ item }: any) => (
            <Pressable
              onPress={() => getMovieDetail(item)}
              style={recommendListStyle.movie_recommend_item}
            >
              <Image
                source={{ uri: item.cover }}
                style={recommendListStyle.movie_image}
              />
              <Text style={recommendListStyle.film_title}>{item.title}</Text>
            </Pressable>
          )}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 120 }} />}
          
          removeClippedSubviews={true} // Unmount components when outside of window
          initialNumToRender={2} // Reduce initial render amount
          updateCellsBatchingPeriod={100} // Increase time between renders
          windowSize={7} // Reduce the window size
        />
      ) : null}
    </View>
  );
};

export default RecommendListComponent;
