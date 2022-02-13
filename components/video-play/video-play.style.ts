import { StyleSheet } from "react-native";
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
  }
});

export default VideoPlayStyle;