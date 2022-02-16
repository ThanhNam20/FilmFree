import { Platform, StyleSheet } from "react-native";
import { SLIDER_HEIGHT,SLIDER_WIDTH } from "../../constants/config";

const VideoPlayStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  custom_tool_bar: {
    position: 'relative',
    height: 30,
    width: 60,
    borderColor: '#F1E9E5',
    borderWidth: 2,
    borderRadius: 3,
    top: 0,
  },
  backgroundVideo: {
    aspectRatio: 16/9,
    width: '100%',
},
mediaControls: {
    width: SLIDER_HEIGHT - 100,
    height: '100%',
    flex: 1,
    alignSelf: Platform.OS === 'android' ? SLIDER_HEIGHT < 800 ? 'center' : 'flex-start' : 'center',
},
backgroundVideoFullScreen: {
    height: SLIDER_HEIGHT,
    width: SLIDER_WIDTH,
},
});

export default VideoPlayStyle;