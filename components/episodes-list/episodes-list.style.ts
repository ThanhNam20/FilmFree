import { forcusColor, mainColor, SLIDER_WIDTH } from './../../constants/config';
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    backgroundColor: mainColor,
  },
  episode_item: {
    marginLeft: 10,
    width: SLIDER_WIDTH / 7,
    padding: 10,
    borderWidth: 2,
    borderColor: forcusColor
  },
  textColor: {
    color: '#fff',
    textAlign:'center'
  }
})

export const episodesListStyle = styles;