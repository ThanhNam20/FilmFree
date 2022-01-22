import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import FilmItem from "../film-item";
import { CategoryStyle } from "./category-film.style";

const FilmCategory = ({listFilmCategory}: any) => {
  return (
    <View>
      <Text style={CategoryStyle.text}>{listFilmCategory?.homeSectionName}</Text>
      <FlatList
        data={listFilmCategory.recommendContentVOList}
        renderItem={({ item }: any) => <FilmItem item={item} />}
        horizontal
      />
    </View>
  );
};

export default FilmCategory;
