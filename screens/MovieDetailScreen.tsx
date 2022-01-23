import { View, Text } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/core';
import { useGetMovieDetailQuery } from '../services/public-api.service';

const MovieDetailScreen = () => {
  const route: any = useRoute();
  const movieDetailParams = {
    id: route.params.id,
    category: route.params.category,
  }
  const {data, isLoading, error} = useGetMovieDetailQuery(movieDetailParams);
  console.log(data);
  
  return (
    <View>
      
    </View>
  );
};

export default MovieDetailScreen;
