import { View, Text, FlatList, Button, Pressable, ActivityIndicator } from "react-native";
import React from "react";
import { episodesListStyle } from "./episodes-list.style";
import {
  useGetMovieMediaByEpisodeMutation,
  useGetMovieMediaQuery,
} from "../../services/public-api.service";
import { useDispatch } from "react-redux";
import { removeMovieDetailData } from "../../store/film/filmSlice";

const EpisodesListComponent = ({ episodeList }: any) => {
  const { episodeListData, category, contentId } = episodeList;
  const [getMovieByEpisode, { data, isLoading, error }] =
    useGetMovieMediaByEpisodeMutation();
  const dispatch = useDispatch();  
  const episodeListDataWithIndex = episodeListData.map(
    (element: any, index: number) => ({ ...element, index })
  );

  const chooseEpisode = (episode_item: any, index: any) => {
    if (!episode_item) return;
    dispatch(removeMovieDetailData());
    episode_item.item.definitionList.forEach((element: any) => {
      const movieUrlParam = {
        category,
        contentId,
        episodeId: episodeListDataWithIndex[index].id,
        definition: element.code,
      };
      getMovieByEpisode(movieUrlParam);
    });
  };
  return (
    <View style={episodesListStyle.container}>
      <FlatList
        data={episodeListDataWithIndex}
        renderItem={(episode_item: any) => (
          <Pressable
            key={episode_item.index}
            onPress={() => chooseEpisode(episode_item, episode_item.index)}
          >
            <View style={episodesListStyle.episode_item}>
              <Text style={episodesListStyle.textColor}>
                {episode_item.index + 1}
              </Text>
            </View>
          </Pressable>
        )}
        horizontal
        showsVerticalScrollIndicator={true}
        scrollEventThrottle={1000}
        ListFooterComponent={() => <ActivityIndicator />}
        removeClippedSubviews={true} // Unmount components when outside of window
        maxToRenderPerBatch={1} // Reduce number in each render batch
        updateCellsBatchingPeriod={100} // Increase time between renders
        windowSize={7}
      />
    </View>
  );
};

export default EpisodesListComponent;
