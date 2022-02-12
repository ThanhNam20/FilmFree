import { forcusColor, mainColor, SLIDER_WIDTH } from './../../constants/config';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    paddingTop: 10,
    marginRight: 10,    
  },
  movie_recommend_item: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    alignItems: 'center'
  },
  movie_image: {
    height: 60,
    width: 100
  },
  film_title: {
    color: '#eee',
    textAlign: 'left',
    marginLeft: 10,
    maxWidth: SLIDER_WIDTH - 80,
    fontSize: 14
  }
})

export const recommendListStyle = styles;