import { mainColor, SLIDER_WIDTH } from './../../constants/config';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    paddingLeft: 10
  },
  descriptionText: {
    color: "#fff",
  },
  movieName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: "bold",
  },
  evaluateField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems :'flex-start'
  },
  starPoint: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  releaseDate: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10
  }
});

export const MovieDescriptionStyle = styles;