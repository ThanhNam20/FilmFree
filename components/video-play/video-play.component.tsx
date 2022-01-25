import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Video from "react-native-video";
import { useSelector } from "react-redux";
import { SLIDER_WIDTH } from "../../constants/config";
import { useGetMovieMediaQuery } from "../../services/public-api.service";
import { RootState } from "../../store/store";
const VideoPlayComponent = ({ movieDetailData }: any) => {
  const { episodeVoList, category, contentId } = movieDetailData;
  const videoMediaUrlList = useSelector(
    (state: RootState) => state.FilmReducer.filmDetailMediaList
  );
  let video = React.useRef<any>(null);
  const [movieUrl, setMovieUrl] = useState<any>([]);
  const [episode, setEpisode] = useState<any>(null);
  const [status, setStatus] = React.useState({});
  episodeVoList.definitionList.forEach((element: any) => {
    const movieUrlParam = {
      category,
      contentId,
      episodeId: episodeVoList.id,
      definition: element.code,
    };
    useGetMovieMediaQuery(movieUrlParam);
  });

  return (
    <View style={styles.container}>
      {videoMediaUrlList && videoMediaUrlList.length > 0 ? (
        <View>
          <Video
            source={{
              uri: videoMediaUrlList[0].mediaUrl,
              type: "m3u8",
            }}
            resizeMode="cover"
            style={{ width: SLIDER_WIDTH, height: 300 }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default VideoPlayComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  video: {
    alignSelf: "center",
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
