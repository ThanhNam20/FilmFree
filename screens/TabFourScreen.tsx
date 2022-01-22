import React from 'react'
import { View, Text, Image } from 'react-native'

const TabFourScreen = () => {
  return (
    <View>
      <Text>Hello</Text>
      <Image style={{
        width: 50,
        height: 50
      }} source={{uri: "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/netflix/movie1.jpg"}} />
    </View>
  )
}

export default TabFourScreen
