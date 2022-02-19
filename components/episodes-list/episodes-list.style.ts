import { forcusColor, mainColor, SLIDER_WIDTH } from './../../constants/config';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: mainColor,
    paddingEnd: 10
  },
  episode_item: {
    marginLeft: 10,
    width: SLIDER_WIDTH / 7,
    padding: 10,
    borderWidth: 2,
    borderColor: '#eee',
    borderRadius: 3
  },
  textColor: {
    color: '#fff',
    textAlign:'center'
  }
})

export const episodesListStyle = styles;