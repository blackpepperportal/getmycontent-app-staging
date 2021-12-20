import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { CelebrityProfile } from '@/Containers/Home/pages'
import { Search } from '@/Containers/Home/pages'
import { Login } from '@/Containers/Home/pages'
import { Register } from '@/Containers/Home/pages'
import { Forgot } from '@/Containers/Home/pages'
import { SinglePost } from '@/Containers/Home/pages'
import { Terms } from '@/Containers/Home/pages'
import { FullScreenPic } from '@/Containers/Home/pages'
import { useTheme } from '@/Theme'
import { SafeAreaView, View } from 'react-native'

const Stack = createStackNavigator()

export const HomeNavigator = () => {
  const { Layout, darkMode } = useTheme()
  return (
    <SafeAreaView
      style={[Layout.fill, { backgroundColor: darkMode ? '#000' : '#fff' }]}
    >
      <Stack.Navigator initialRouteName="Search" headerMode={'none'}>
        <Stack.Screen name="CelebrityProfile" component={CelebrityProfile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Forgot" component={Forgot} />
        <Stack.Screen name="SinglePost" component={SinglePost} />
        <Stack.Screen name="Terms" component={Terms} />
        <Stack.Screen name="FullScreenPic" component={FullScreenPic} />
      </Stack.Navigator>
    </SafeAreaView>
  )
}
