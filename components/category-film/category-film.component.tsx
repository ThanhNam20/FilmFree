import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import FilmItem from "../film-item";
import { CategoryStyle } from "./category-film.style";

const FilmCategory = ({ listFilmCategory }: any) => {
  return (
    <View>
      <Text style={CategoryStyle.text}>
        {listFilmCategory?.homeSectionName}
      </Text>
      <FlatList
        data={listFilmCategory.recommendContentVOList}
        renderItem={({ item }: any) => <FilmItem item={item} />}
        horizontal
        // Performance settings
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
        removeClippedSubviews={true} // Unmount components when outside of window
        initialNumToRender={5} // Reduce initial render amount
        maxToRenderPerBatch={10} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={5} // Reduce the window size
      />
    </View>
  );
};

export default React.memo(FilmCategory);
