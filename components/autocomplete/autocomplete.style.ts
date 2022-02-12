import { forcusColor, mainColor, SLIDER_WIDTH, SLIDER_HEIGHT } from './../../constants/config';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    zIndex: 10
  },
  list_movie_container: {
    borderColor: 'white',
    paddingLeft: 10,
    zIndex: 10,
  },
  film_title: {
    color: 'white',
    paddingBottom: 10,
  }
})

export const autoCompleteSearchStyle = styles;