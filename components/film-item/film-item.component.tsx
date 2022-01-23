import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import FilmItemStyle from "./film-item.style";

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

export default React.memo(FilmItem);
