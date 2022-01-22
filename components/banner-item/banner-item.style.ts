import { mainColor } from './../../constants/config';
import { Platform, StyleSheet } from "react-native";
import { SLIDER_WIDTH } from "../../constants/config";

const styles = StyleSheet.create({
  item: {
    width: SLIDER_WIDTH - 60,
    height: SLIDER_WIDTH / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ios: 0, android: 10}), // Prevent a random Android rendering issue
    backgroundColor: 'black',

  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
    borderRadius : 8,
  },
});

export const BannerItem = styles;