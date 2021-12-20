import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

import { MyProfile } from '@/Containers/Profile/pages'
import { Bookmarks } from '@/Containers/Profile/pages'
import { Lists } from '@/Containers/Profile/pages'
import { Languages } from '@/Containers/Profile/pages'
import { YourCards } from '@/Containers/Profile/pages'
import { AddCard } from '@/Containers/Profile/pages'
import { Wallet } from '@/Containers/Profile/pages'
import { Withdraw } from '@/Containers/Profile/pages'
import { WithdrawConfirm } from '@/Containers/Profile/pages'
import { Help } from '@/Containers/Profile/pages'
import { ChangePassword } from '@/Containers/Profile/pages'
import { Chat } from '@/Containers/Profile/pages'
import { AddBank } from '@/Containers/Profile/pages'
import { YourBank } from '@/Containers/Profile/pages'
import { Documents } from '@/Containers/Profile/pages'
import { Payments } from '@/Containers/Profile/pages'
import { Invoice } from '@/Containers/Profile/pages'
import { Fans } from '@/Containers/Profile/pages'
import { Following } from '@/Containers/Profile/pages'
import { Favourites } from '@/Containers/Profile/pages'
import { EditProfile } from '@/Containers/Profile/pages'
import { DeleteAccount } from '@/Containers/Profile/pages'
import { BlockedUsers } from '@/Containers/Profile/pages'

import { useTheme } from '@/Theme'
import { SafeAreaView } from 'react-native'

const Stack = createStackNavigator()

export const ProfileNavigator = () => {
  const { Layout, darkMode } = useTheme()
  return (
    <SafeAreaView
      style={[Layout.fill, { backgroundColor: darkMode ? '#000' : '#fff' }]}
    >
      <Stack.Navigator initialRouteName="MyProfile" headerMode={'none'}>
        <Stack.Screen name="MyProfile" component={MyProfile} />
        <Stack.Screen name="Bookmarks" component={Bookmarks} />
        <Stack.Screen name="Lists" component={Lists} />
        <Stack.Screen name="Settings" component={MyProfile} />
        <Stack.Screen name="YourCards" component={YourCards} />
        <Stack.Screen name="AddCard" component={AddCard} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="Withdraw" component={Withdraw} />
        <Stack.Screen name="WithdrawConfirm" component={WithdrawConfirm} />
        <Stack.Screen name="Help" component={Help} />
        <Stack.Screen name="Languages" component={Languages} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="AddBank" component={AddBank} />
        <Stack.Screen name="YourBank" component={YourBank} />
        <Stack.Screen name="Documents" component={Documents} />
        <Stack.Screen name="Payments" component={Payments} />
        <Stack.Screen name="Invoice" component={Invoice} />
        <Stack.Screen name="Fans" component={Fans} />
        <Stack.Screen name="Following" component={Following} />
        <Stack.Screen name="Favourites" component={Favourites} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="BlockedUsers" component={BlockedUsers} />
      </Stack.Navigator>
    </SafeAreaView>
  )
}
