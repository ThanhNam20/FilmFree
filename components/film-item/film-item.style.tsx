import { StyleSheet } from "react-native";
import { SLIDER_HEIGHT,SLIDER_WIDTH } from "../../constants/config";

const FilmItemStyle = StyleSheet.create({
  image: {
    width: SLIDER_WIDTH / 4,
    height: SLIDER_HEIGHT/ 3,
    marginLeft: 10,
    aspectRatio: .7, 
    resizeMode: 'contain',
    borderRadius : 8,
  },
  filmTitle: {
    color: '#eee',
    textAlign: 'left',
    marginLeft: 10,    
    maxWidth: 100,
    fontSize: 12
  },
});

export default FilmItemStyle;
