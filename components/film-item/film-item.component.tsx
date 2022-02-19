import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useDispatch } from 'react-redux';
import { removeMovieDetailData } from "../../store/film/filmSlice";
import FilmItemStyle from "./film-item.style";

const FilmItem = ({ item }: any) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { id, title, imageUrl, category } = item;
  const getMovieDetail = () => {
    dispatch(removeMovieDetailData());
    navigation.push('MovieDetail', {id, category});
  };
  return (
    <Pressable onPress={getMovieDetail}>
      <View>
        <Image style={FilmItemStyle.image} source={{ uri: imageUrl }} />
        <Text numberOfLines={1} style={FilmItemStyle.filmTitle}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default React.memo(FilmItem);


