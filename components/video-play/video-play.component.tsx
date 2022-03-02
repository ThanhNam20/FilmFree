import React, { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import Orientation from "react-native-orientation-locker";
import SelectDropdown from "react-native-select-dropdown";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import Video from "react-native-video";
import { useSelector } from "react-redux";
import { SLIDER_HEIGHT, SLIDER_WIDTH } from "../../constants/config";
import { useGetMovieMediaQuery } from "../../services/public-api.service";
import { RootState } from "../../store/store";
import VideoPlayStyle from "./video-play.style";

const VideoPlayComponent = ({ movieDetailData }: any) => {
  const { episodeVoList, category, contentId, coverHorizontalUrl } =
    movieDetailData;

  const videoMediaUrlList = useSelector(
    (state: RootState) => state.FilmReducer.filmDetailMediaList
  );

  const loadingMovieUrl = useSelector(
    (state: RootState) => state.FilmReducer.isLoading
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
  const [selectedMovieQualityTitle, setSelectedMovieQualityTitle] =
    useState("");
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
    if (loadingMovieUrl === false && videoMediaUrlList.length > 0) {
      setSelectedMovieQuality(videoMediaUrlList[0].mediaUrl || "");
      setSelectedMovieQualityTitle(
        videoMediaUrlList[0].currentDefinition || ""
      );
    }
  }, [loadingMovieUrl]);

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
    if (!isFullScreen) {
      Orientation.lockToLandscape();
      videoPlayer.current?.presentFullscreenPlayer();
    } else {
      videoPlayer.current?.dismissFullscreenPlayer();
      if (Platform.OS === "ios") {
        Orientation.lockToPortrait();
      }
      Orientation.lockToPortrait();
    }
    setIsFullScreen(!isFullScreen);
  };

  const SkeletonLoading = () => {
    return (
      <SkeletonPlaceholder highlightColor="#eee" backgroundColor="#353E4D">
        <SkeletonPlaceholder.Item
          height={SLIDER_HEIGHT / 3}
          width={SLIDER_WIDTH}
        ></SkeletonPlaceholder.Item>
      </SkeletonPlaceholder>
    );
  };

  return (
    <View style={[VideoPlayStyle.container, { marginHorizontal: 0 }]}>
      {!loadingMovieUrl ? (
        <View>
          <Video
            source={{
              uri: selectedMovieQuality,
              type: "m3u8",
            }}
            style={VideoPlayStyle.backgroundVideo}
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
            style={
              isFullScreen
                ? VideoPlayStyle.backgroundVideoFullScreen
                : VideoPlayStyle.backgroundVideo
            }
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
            sliderStyle={
              isFullScreen
                ? {
                    containerStyle: VideoPlayStyle.mediaControls,
                    thumbStyle: {},
                    trackStyle: {},
                  }
                : { containerStyle: {}, thumbStyle: {}, trackStyle: {} }
            }
            containerStyle={undefined}
            showOnStart={true}
          >
            <MediaControls.Toolbar>
              <SelectDropdown
                data={videoMediaUrlList}
                defaultButtonText={"Quality"}
                buttonStyle={{
                  width: 70,
                  height: 30,
                  borderRadius: 5,
                  backgroundColor: "transparent",
                  borderColor: "#eee",
                  borderWidth: 1,
                }}
                buttonTextStyle={{
                  fontSize: 11,
                  color: "#eee",
                }}
                dropdownStyle={{
                  borderRadius: 5,
                  width: 80,
                }}
                rowTextStyle={{
                  fontSize: 12,
                }}
                onSelect={(selectedItem, index) => {
                  setSelectedMovieQuality(selectedItem.mediaUrl);
                  setSelectedMovieQualityTitle(selectedItem.currentDefinition);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem.currentDefinition;
                }}
                rowTextForSelection={(item, index) => {
                  return item.currentDefinition;
                }}
              />
            </MediaControls.Toolbar>
          </MediaControls>
        </View>
      ) : (
        <SkeletonLoading />
      )}
    </View>
  );
};

export default VideoPlayComponent;
