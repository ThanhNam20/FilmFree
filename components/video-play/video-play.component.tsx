import React from "react";
import { StyleSheet, View } from "react-native";
const VideoPlayComponent = () => {
  const video = React.useRef<any>(null);
  const [status, setStatus] = React.useState<any>({});
  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default VideoPlayComponent;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    top: 100
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
});

