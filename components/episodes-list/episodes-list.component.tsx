import { View, Text, FlatList, Button, Pressable } from "react-native";
import React from "react";
import { episodesListStyle } from "./episodes-list.style";
import {
  useGetMovieMediaByEpisodeMutation,
  useGetMovieMediaQuery,
} from "../../services/public-api.service";

const EpisodesListComponent = ({ episodeList }: any) => {
  const { episodeListData, category, contentId } = episodeList;
  const [getMovieByEpisode, { data, isLoading, error }] =
    useGetMovieMediaByEpisodeMutation();
  const episodeListDataWithIndex = episodeListData.map(
    (element: any, index: number) => ({ ...element, index })
  );

  const chooseEpisode = (episode_item: any, index: any) => {
    console.log(episode_item);
    if (!episode_item) return;
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
      />
    </View>
  );
};

export default EpisodesListComponent;
