import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { useRoute } from '@react-navigation/core';
import { useGetMovieDetailQuery, useGetMovieMediaQuery } from '../services/public-api.service';
import { mainColor } from '../constants/config';
import VideoPlayComponent from '../components/video-play';
import MovieDescriptionComponent from '../components/movie-description';
import EpisodesListComponent from '../components/episodes-list';

const MovieDetailScreen = () => {
  const route: any = useRoute();
  const movieDetailParams = {
    id: route.params.id,
    category: route.params.category,
  }
  const {data: movieDetailData, isLoading, error} = useGetMovieDetailQuery(movieDetailParams);
  // console.log(movieDetailData);

  if(isLoading) {
    return <Text>Loading...</Text>
  } 
  if(error) {
    return <Text>Error...</Text>
  }
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayComponent movieDetailData={{
        episodeVoList: movieDetailData.data.episodeVo[0],
        category: route.params.category,
        contentId: route.params.id,
      }}/>
      <MovieDescriptionComponent movieDescription={{
        movieName: movieDetailData?.data.name,
        yearRelease: movieDetailData?.data.year,
        introduction: movieDetailData?.data.introduction,
        score: movieDetailData?.data.score,
        tagList: movieDetailData?.data.tagList,
      }}/>

      {/* <EpisodesListComponent episodeList={{
        episodeListData: movieDetailData?.data.episodeVo,
        episodeCount: movieDetailData?.data.episodeCount,
      }}/> */}
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
});
