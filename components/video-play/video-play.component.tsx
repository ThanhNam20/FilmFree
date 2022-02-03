import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Image, Platform } from "react-native";
import Video from "react-native-video";
import { useSelector } from "react-redux";
import { SLIDER_WIDTH } from "../../constants/config";
import { useGetMovieMediaQuery } from "../../services/public-api.service";
import { RootState } from "../../store/store";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
const VideoPlayComponent = ({ movieDetailData }: any) => {
  const { episodeVoList, category, contentId, coverHorizontalUrl } =
    movieDetailData;

  const videoMediaUrlList = useSelector(
    (state: RootState) => state.FilmReducer.filmDetailMediaList
  );
  let videoPlayer = React.useRef<any>(null);
  const [duration, setDuration] = useState(0);
  const [paused, setPaused] = useState(true);

  const [currentTime, setCurrentTime] = useState(0);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

  episodeVoList.definitionList.forEach((element: any) => {
    const movieUrlParam = {
      category,
      contentId,
      episodeId: episodeVoList.id,
      definition: element.code,
    };
    useGetMovieMediaQuery(movieUrlParam);
  });

  const onSeek = (seek: any) => {
    videoPlayer?.current.seek(seek);
  };

  const onSeeking = (currentVideoTime: React.SetStateAction<number>) =>
    setCurrentTime(currentVideoTime);

  const onPaused = (newState: React.SetStateAction<PLAYER_STATES>) => {
    setPaused(!paused);
    setPlayerState(newState);
  };

  const onReplay = () => {
    videoPlayer?.current.seek(0);
    setCurrentTime(0);
    if (Platform.OS === "android") {
      setPlayerState(PLAYER_STATES.PAUSED);
      setPaused(true);
    } else {
      setPlayerState(PLAYER_STATES.PLAYING);
      setPaused(false);
    }
  };

  const onProgress = (data: { currentTime: React.SetStateAction<number> }) => {
    if (!isLoading) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data: { duration: number }) => {
    setDuration(Math.round(data.duration));
    setIsLoading(false);
  };

  const onLoadStart = () => setIsLoading(true);

  const onEnd = () => {
    setPlayerState(PLAYER_STATES.ENDED);
    setCurrentTime(duration);
  };

  const onFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <View style={styles.container}>
      {videoMediaUrlList && videoMediaUrlList.length > 0 ? (
        <View>
          <Video
            source={{
              uri: videoMediaUrlList[0].mediaUrl,
              type: "m3u8",
            }}
            style={{ aspectRatio: 16 / 9 }}
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            posterResizeMode={"cover"}
            onProgress={onProgress}
            paused={paused}
            ref={(ref) => (videoPlayer.current = ref)}
            resizeMode={"cover"}
            poster={coverHorizontalUrl}
          />

          <MediaControls
            isFullScreen={isFullScreen}
            duration={duration}
            isLoading={isLoading}
            progress={currentTime}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            mainColor={"#1572A1"}
            onFullScreen={onFullScreen}
            fadeOutDelay={5000}
            playerState={playerState}
            sliderStyle={{ containerStyle: {}, thumbStyle: {}, trackStyle: {} }}
            children={undefined}
            containerStyle={undefined}
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
