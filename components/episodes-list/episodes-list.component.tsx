import {
  View,
  Text,
  FlatList,
  Button,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { episodesListStyle } from "./episodes-list.style";
import {
  useGetMovieMediaByEpisodeMutation,
  useGetMovieMediaQuery,
} from "../../services/public-api.service";
import { useDispatch } from "react-redux";
import { removeMovieDetailData } from "../../store/film/filmSlice";
import { forcusColor, mainColor } from "../../constants/config";

const EpisodesListComponent = ({ episodeList }: any) => {
  const { episodeListData, category, contentId } = episodeList;
  const [selectedEpisode, setSelectedEpisode] = useState<Number>(0);

  const [getMovieByEpisode, { data, isLoading, error }] =
    useGetMovieMediaByEpisodeMutation();
  const dispatch = useDispatch();
  const episodeListDataWithIndex = episodeListData.map(
    (element: any, index: number, selected: boolean) => ({
      ...element,
      index,
      selected: false,
    })
  );

  const chooseEpisode = (episode_item: any, index: any) => {
    if (!episode_item) return;
    dispatch(removeMovieDetailData());
    setSelectedEpisode(index);
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
            <View
              style={[
                episodesListStyle.episode_item,
                episode_item.index == selectedEpisode
                  ? { borderColor: forcusColor }
                  : { borderColor: "#eee" },
              ]}
            >
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
