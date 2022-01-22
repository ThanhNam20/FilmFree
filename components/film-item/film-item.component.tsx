import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import FilmItemStyle from "./film-item.style";
import { useNavigation } from "@react-navigation/core";

const FilmItem = ({ item }: any) => {
  const navigation = useNavigation();
  const { id, title, imageUrl, category } = item;
  const getMovieDetail = () => {
    const movieDetailParam = {
      id,
      category,
    };
    console.log(movieDetailParam);
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
