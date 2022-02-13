import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/core";
import {
  useGetMovieDetailQuery,
  useGetMovieMediaQuery,
} from "../services/public-api.service";
import { mainColor } from "../constants/config";
import VideoPlayComponent from "../components/video-play";
import MovieDescriptionComponent from "../components/movie-description";
import EpisodesListComponent from "../components/episodes-list";
import { useDispatch } from 'react-redux'
import { removeMovieDetailData } from "../store/film/filmSlice";

const MovieDetailScreen = () => {
  const route: any = useRoute();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeMovieDetailData());
  }, [])
  
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
      <ScrollView>
        <VideoPlayComponent
          movieDetailData={{
            episodeVoList: movieDetailData.data.episodeVo[0],
            coverHorizontalUrl: movieDetailData.data.coverHorizontalUrl,
            category: route.params.category,
            contentId: route.params.id,
          }}
        />

        <MovieDescriptionComponent
          movieDescription={{
            movieName: movieDetailData?.data.name,
            yearRelease: movieDetailData?.data.year,
            introduction: movieDetailData?.data.introduction,
            score: movieDetailData?.data.score,
            tagList: movieDetailData?.data.tagList,
          }}
        />

        <EpisodesListComponent
          episodeList={{
            episodeListData: movieDetailData.data.episodeVo,
            episodeCount: movieDetailData?.data.episodeCount,
            category: route.params.category,
            contentId: route.params.id,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
});
