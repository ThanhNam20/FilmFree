import { View, Text } from 'react-native'
import React from 'react'

const UserProfileComponent = ({userInfo}: any) => {
  console.log(userInfo);
  return (
    <View>
      <Text style={{color: '#eee'}}>UserProfileComponent</Text>
    </View>
  )
}

export default UserProfileComponent