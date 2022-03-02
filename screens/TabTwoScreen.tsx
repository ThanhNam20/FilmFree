import { StyleSheet } from 'react-native';
import SearchAutoComplete from '../components/autocomplete';
import RecommendListComponent from '../components/recommend-list';
import { Text, View } from '../components/Themed';
import { mainColor } from '../constants/config';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <SearchAutoComplete />
      <RecommendListComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: mainColor,
    zIndex: 3
  }

});
