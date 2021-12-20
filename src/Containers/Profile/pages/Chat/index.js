import React, { useState, useEffect } from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native'
const io = require('socket.io-client')
import { useTranslation } from 'react-i18next'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import {
  fetchChatMessageStart,
  addMessageContent,
} from '@/Store/Actions/ChatAction'
import { apiConstants } from "@/Components/Constant/constants";
import { selectChatMessages } from '@/Store/Selectors/ChatSelector'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Chat = ({ route }) => {
  const { t } = useTranslation()
  const { chat, fromProfile } = route.params
  const [chatMsg, setChatMsg] = useState('')
  const { MyColors, darkMode } = useTheme()
  const dispatch = useDispatch()
  const chatMessages = useSelector(selectChatMessages)
  const userDetails = useSelector(selectUserDetails)
  const [socket, setSocket] = useState(null)
  const scrollViewRef = React.useRef()
  const chatSocketUrl = apiConstants.SOCKET_URL

  useEffect(() => {
    dispatch(
      fetchChatMessageStart({
        to_user_id: fromProfile ? chat.user_id : chat.to_user_id,
        from_user_id: fromProfile
          ? userDetails.data.user_id
          : chat.from_user_id,
      }),
    )
    chatSocketConnect(chat)
    return () => {
      chatSocket.disconnect()
      console.log('chat socket connection terminated')
    }
  }, [])

  let chatSocket

  const chatSocketConnect = (chatDetails) => {
    // check the socket url is configured
    chatSocket = io.connect(chatSocketUrl, {
      query:
        `commonid:'user_id_` + fromProfile
          ? userDetails.data.user_id
          : chatDetails.from_user_id + `_to_user_id_` + fromProfile
          ? chatDetails.user_id
          : chatDetails.to_user_id + `',myid:` + fromProfile
          ? userDetails.data.user_id
          : chatDetails.from_user_id,
      jsonp: false,
      transports: ['websocket'],
    })
    console.log('chatSocket', chatSocket)
    chatSocket.on('connect', () => {
      console.log('socket connected')
      chatSocket.emit('update sender', {
        commonid:
          'user_id_' + fromProfile
            ? userDetails.data.user_id
            : chatDetails.from_user_id + '_to_user_id_' + fromProfile
            ? chatDetails.user_id
            : chatDetails.to_user_id,
        myid: fromProfile ? userDetails.data.user_id : chatDetails.from_user_id,
      })
    })
    chatSocket.on('message', (newData) => {
      console.log('recieved a new message', newData)
      dispatch(addMessageContent([newData]))
    })
    setSocket(chatSocket)
  }

  const submitMsgHandler = () => {
    console.log('submitMsgHandler', socket)
    const now = new Date()
    const newMoment = moment(now)
    if (socket && chatMsg) {
      let chatData = {
        from_user_id: userDetails.data.user_id,
        to_user_id: fromProfile ? chat.user_id : chat.to_user_id,
        message: chatMsg,
        type: 'uu',
        user_picture: userDetails.data.picture,
        loggedin_user_id: userDetails.data.user_id,
        created: newMoment.from(moment(new Date())),
        from_username: userDetails.data.username,
        from_displayname: userDetails.data.name,
        from_userpicture: userDetails.data.picture,
        from_user_unique_id: '',
        to_username: '',
        to_displayname: '',
        to_userpicture: '',
        to_user_unique_id: '',
      }

      console.log('emitting message', chatData)

      socket.emit('message', chatData)

      setChatMsg('')
      dispatch(addMessageContent([chatData]))
    }
  }

  return (
    <View style={styles.PageWrapper}>
      <TopNav
        title={
          chatMessages.loading ? t('general.loading') : chatMessages.data.user.name
        }
      />
      <KeyboardAwareScrollView style={styles.keyboardStyle}>
        <View style={styles.ChatWrapper}>
          <ScrollView
            style={styles.ScrollContainer}
            ref={scrollViewRef}
            contentContainerStyle={{ paddingBottom: 14 }}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {chatMessages.loading ? (
              <Text>{t('general.loading')}</Text>
            ) : (
              chatMessages.data.messages.map((chatMessage, index) => (
                <React.Fragment key={index}>
                  {chatMessage.from_user_id != userDetails.data.user_id ? (
                    <View style={styles.RightCard}>
                      <Image
                        source={{ uri: chatMessages.data.user.picture }}
                        style={styles.RightUserImg}
                      />
                      <View style={[MyColors.cardLightBg, styles.RightContent]}>
                        <Text style={[MyColors.lightColor, styles.RightName]}>
                          {chatMessages.data.user.name}
                        </Text>
                        <Text style={[MyColors.primaryColor, styles.RightMsg]}>
                          {chatMessage.message}
                        </Text>
                        <Text style={[MyColors.lightColor, styles.RightTime]}>
                          {chatMessage.created}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.LeftCard}>
                      <View style={[MyColors.cardBg, styles.LeftContent]}>
                        <Text style={[MyColors.primaryColor, styles.LeftMsg]}>
                          {chatMessage.message}
                        </Text>
                        <Text style={[MyColors.lightColor, styles.LeftTime]}>
                          {chatMessage.created}
                        </Text>
                      </View>
                    </View>
                  )}
                </React.Fragment>
              ))
            )}
          </ScrollView>
          <View style={styles.BottomContainer}>
            <TextInput
              style={[MyColors.cardBg, MyColors.primaryColor, styles.input]}
              placeholder={t('profile.chatPage.label')}
              underlineColorAndroid="transparent"
              placeholderTextColor={darkMode ? '#ccc' : '#333'}
              onChangeText={(value) => setChatMsg(value)}
              value={chatMsg}
            />
            <TouchableWithoutFeedback onPress={() => submitMsgHandler()}>
              <View style={styles.SendButton}>
                <Icon name="paper-plane" style={styles.SendIco} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default Chat
