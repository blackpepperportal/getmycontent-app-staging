import React, { useState, useEffect } from 'react'
import { SafeAreaView, Image } from 'react-native'
import { useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
const io = require('socket.io-client')
import { apiConstants } from "@/Components/Constant/constants";
import { HomeContainer } from '@/Containers'
import { NotificationContainer } from '@/Containers'
import { MessageContainer } from '@/Containers'
import { ProfileContainer } from '@/Containers'
import { AddPostContainer } from '@/Containers'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import { TabBarAdvancedButton } from './components/TabBarAdvancedButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import { useTheme } from '@/Theme'
import Toast from 'react-native-toast-message'

const navbg = require('/Assets/Images/nav-bg.png')
const navbgdark = require('/Assets/Images/nav-bg-dark.png')

const Tab = createBottomTabNavigator()

// @refresh reset
const MainNavigator = ({ navigation }) => {
  const [chatCount, setChatCount] = useState(0)
  const [bellCount, setBellCount] = useState(0)
  const chatSocketUrl = apiConstants.SOCKET_URL

  useEffect(() => {
    if (!userDetails.loading) chatSocketConnect(chatSocketUrl)
  }, [])
  const { Layout, darkMode } = useTheme()
  const userDetails = useSelector(selectUserDetails)

  const chatSocketConnect = (chatSocketUrl) => {
    // check the socket url is configured
    if (userDetails.data) {
      let chatSocket = io.connect(chatSocketUrl, {
        query:
          `commonid:'user_id_` +
          userDetails.data.user_id +
          `',myid:` +
          userDetails.data.user_id,
        jsonp: false,
        transports: ['websocket'],
      })
      console.log('chatSocket', chatSocket)
      chatSocket.on('connect', () => {
        console.log('socket connected')
        chatSocket.emit('notification update', {
          commonid: 'user_id_' + userDetails.data.user_id,
          myid: userDetails.data.user_id,
        })
      })
      chatSocket.on('notification', (newData) => {
        console.log('newData', newData)
        setChatCount(newData.chat_notification)
        setBellCount(newData.bell_notification)
      })
    }
    // chatSocket.disconnect()
  }

  if (!userDetails.loading) chatSocketConnect(chatSocketUrl)

  return (
    <SafeAreaView
      style={[
        Layout.fill,
        {
          backgroundColor: darkMode ? '#000' : '#fff',
          flex: 1,
        },
      ]}
    >
      {/* {darkMode ? (
        <Image source={navbgdark} style={styles.navBgCurve} />
      ) : (
        <Image source={navbg} style={styles.navBgCurve} />
      )} */}
      <Tab.Navigator
        style={styles.navbg}
        initialRouteName="Home"
        tabBarOptions={{
          inactiveTintColor: '#646464',
          activeTintColor: darkMode ? '#fff' : '#3514A2',
          showLabel: false,
          style: {
            height: 60,
            position: 'relative',
            // bottom: Platform.OS === 'ios' ? 0 : 20,
            // top: Platform.OS === 'ios' ? 20 : 0,
            paddingBottom: 0,
            borderTopWidth: 0,
            backgroundColor: darkMode ? '#333' : '#fff',
            borderTopColor: 'transparent',
            elevation: 0,
            shadowColor: '#5bc4ff',
            shadowOpacity: 0,
            shadowOffset: {
              height: 0,
            },
            shadowRadius: 0,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeContainer}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={NotificationContainer}
          options={{
            tabBarBadge: bellCount > 0 ? bellCount : null,
            tabBarLabel: 'Notification',
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="New"
          component={AddPostContainer}
          options={{
            tabBarButton: (props) => <TabBarAdvancedButton {...props} />,
          }}
        />
        <Tab.Screen
          name="Message"
          component={MessageContainer}
          options={{
            tabBarBadge: chatCount > 0 ? chatCount : null,
            tabBarLabel: 'Message',
            tabBarIcon: ({ color, size }) => (
              <Icon name="envelope" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={ProfileContainer}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: () => (
              <Image
                source={{
                  uri: userDetails.data ? userDetails.data.picture : null,
                }}
                style={styles.navuser}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

export default MainNavigator
