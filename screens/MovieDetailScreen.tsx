import { useRoute } from "@react-navigation/core";
import React from "react";
import {
  ListViewBase,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EpisodesListComponent from "../components/episodes-list";
import MovieDescriptionComponent from "../components/movie-description";
import TabNavigationMovieDetail from "../components/tab-navigation";
import VideoPlayComponent from "../components/video-play";
import { mainColor } from "../constants/config";
import { useGetMovieDetailQuery } from "../services/public-api.service";

const MovieDetailScreen = () => {
  const route: any = useRoute();
  const movieDetailParams = {
    id: route.params.id,
    category: route.params.category,
  };
  const {
    data: movieDetailData,
    isLoading,
    error,
  } = useGetMovieDetailQuery(movieDetailParams);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }
  if (error) {
    return <Text>Error...</Text>;
  }
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayComponent
        movieDetailData={{
          episodeVoList: movieDetailData.data.episodeVo[0],
          coverHorizontalUrl: movieDetailData.data.coverHorizontalUrl,
          category: route.params.category,
          contentId: route.params.id,
        }}
      />

      <TabNavigationMovieDetail movieData={[movieDetailData, movieDetailParams]} />
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
  },
});
