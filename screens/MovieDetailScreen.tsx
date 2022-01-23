import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/core';
import { useGetMovieDetailQuery } from '../services/public-api.service';
import { mainColor } from '../constants/config';
import VideoPlayComponent from '../components/video-play';

const MovieDetailScreen = () => {
  const route: any = useRoute();
  const movieDetailParams = {
    id: route.params.id,
    category: route.params.category,
  }
  const {data, isLoading, error} = useGetMovieDetailQuery(movieDetailParams);
  
  
  return (
    <SafeAreaView style={styles.container}>
      <VideoPlayComponent />
    </SafeAreaView>
  );
};

export default MovieDetailScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff'
  }
});
