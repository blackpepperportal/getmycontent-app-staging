import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { SplashContainer } from '@/Containers'
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef } from '@/Navigators/Root'
import { ProfileNavigator } from '@/Navigators/Profile'
import { HomeNavigator } from '@/Navigators/Home'
import { SafeAreaView, StatusBar } from 'react-native'
import { useTheme } from '@/Theme'
import { AppearanceProvider } from 'react-native-appearance'
import Toast from 'react-native-toast-message'

const Stack = createStackNavigator()

let MainNavigator

// @refresh reset
const ApplicationNavigator = () => {
  const { Layout, darkMode, NavigationTheme } = useTheme()
  const [isApplicationLoaded, setIsApplicationLoaded] = useState(false)
  const applicationIsLoading = useSelector((state) => state.startup.loading)

  useEffect(() => {
    if (MainNavigator == null && !applicationIsLoading) {
      MainNavigator = require('@/Navigators/Main').default
      setIsApplicationLoaded(true)
    }
  }, [applicationIsLoading])

  return (
    <AppearanceProvider>
      <Toast style={{ zIndex: 10 }} ref={(ref) => Toast.setRef(ref)} />
      <NavigationContainer theme={NavigationTheme} ref={navigationRef}>
        <StatusBar barStyle={darkMode ? 'light-content' : 'dark-content'} />
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="Splash" component={SplashContainer} />
          {isApplicationLoaded && (
            <Stack.Screen
              name="Main"
              component={MainNavigator}
              options={{
                animationEnabled: false,
              }}
            />
          )}
          <Stack.Screen
            name="Profile"
            component={ProfileNavigator}
            options={{
              animationEnabled: false,
            }}
          />
          <Stack.Screen
            name="Homes"
            component={HomeNavigator}
            options={{
              animationEnabled: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  )
}

export default ApplicationNavigator
