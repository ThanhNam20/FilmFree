import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import FilmItemStyle from "./film-item.style";
import { useNavigation } from "@react-navigation/core";
import { useGetMovieDetailQuery } from "../../services/public-api.service";

const FilmItem = ({ item }: any) => {
  const navigation = useNavigation();
  const { id, title, imageUrl, category } = item;
  const getMovieDetail = () => {
    navigation.navigate('MovieDetail', {id, category});
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

export default FilmItem;
