import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import Video from "react-native-video";
import { useSelector } from "react-redux";
import { useGetMovieMediaQuery } from "../../services/public-api.service";
import { RootState } from "../../store/store";
import VideoPlayStyle from "./video-play.style";
import SelectDropdown from "react-native-select-dropdown";
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
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedMovieQuality, setSelectedMovieQuality] = useState("");
  const [selectedMovieQualityTitle, setSelectedMovieQualityTitle] = useState("");

  episodeVoList.definitionList.forEach((element: any) => {
    const movieUrlParam = {
      category,
      contentId,
      episodeId: episodeVoList.id,
      definition: element.code,
    };
    useGetMovieMediaQuery(movieUrlParam);
  });

  useEffect(() => {
    if(videoMediaUrlList && videoMediaUrlList.length > 0) {
      setSelectedMovieQuality(videoMediaUrlList[0].mediaUrl);
      setSelectedMovieQualityTitle(videoMediaUrlList[0].currentDefinition)
    }
  }, [videoMediaUrlList])
  

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
    videoPlayer.current?.presentFullscreenPlayer();
  };

  return (
    <View style={VideoPlayStyle.container}>
      {videoMediaUrlList && videoMediaUrlList.length > 0 ? (
        <View>
          <Video
            source={{
              uri: selectedMovieQuality,
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
            resizeMode={"contain"}
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
            containerStyle={undefined}
            showOnStart={true}
          >
            <MediaControls.Toolbar>
              <SelectDropdown
                data={videoMediaUrlList}
                defaultButtonText={'Quality'}
                buttonStyle={
                  {
                    width: 70,
                    height: 30,
                    borderRadius: 5,
                  }
                }
                buttonTextStyle={{
                  fontSize: 12,
                }}
                dropdownStyle={{
                  borderRadius: 5,
                  width: 80
                }}
                rowTextStyle={{
                  fontSize: 12
                }}
                onSelect={(selectedItem, index) => {
                  setSelectedMovieQuality(selectedItem.mediaUrl);
                  setSelectedMovieQualityTitle(selectedItem.currentDefinition);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  // text represented after item is selected
                  // if data array is an array of objects then return selectedItem.property to render after item is selected
                  return selectedItem.currentDefinition;
                }}
                rowTextForSelection={(item, index) => {
                  // text represented for each item in dropdown
                  // if data array is an array of objects then return item.property to represent item in dropdown
                  return item.currentDefinition;
                }}
              />
            </MediaControls.Toolbar>
          </MediaControls>
        </View>
      ) : null}
    </View>
  );
};

export default VideoPlayComponent;

