import React, { useState, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'

import {
  View,
  Image,
  Text,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  fetchChatUsersStart,
  searchChatUsersStart,
} from '@/Store/Actions/ChatAction'
import {
  selectChatUsers,
  selectSearchChatUsers,
} from '@/Store/Selectors/ChatSelector'
import { useTheme } from '@/Theme'
import TopNav from '/Components/TopNav'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import MessageView from './Components/messageView'

const MessageContainer = ({ navigation }) => {
  const { t } = useTranslation()
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchChatUsersStart())
    }, []),
  )
  const { MyColors, darkMode } = useTheme()
  const [search, setSearch] = useState(false)
  const dispatch = useDispatch()
  const chatUsers = useSelector(selectChatUsers)
  const searchUsers = useSelector(selectSearchChatUsers)

  const searchHandler = (value) => {
    if (value) {
      setSearch(true)
      dispatch(searchChatUsersStart({ search_key: value }))
    } else {
      setSearch(false)
    }
  }

  const clickHandler = (chatUser) => {
    navigation.navigate('Profile', {
      screen: 'Chat',
      params: {
        chat: chatUser,
      },
    })
  }

  return (
    <>
      <TopNav title={t('messages.header')} goBack={false} />
      <View style={styles.searchSection}>
        <Icon
          style={[MyColors.primaryColor, styles.searchIcon]}
          name="search"
          size={20}
        />
        <TextInput
          style={[MyColors.primaryColor, MyColors.primaryColor, styles.input]}
          placeholder={t('general.search')}
          underlineColorAndroid="transparent"
          placeholderTextColor={darkMode ? '#ccc' : '#333'}
          onChangeText={(value) => searchHandler(value)}
        />
      </View>
      <ScrollView style={styles.MessageCardBlock}>
        <MessageView
          clickHandler={clickHandler}
          chatUsers={search ? searchUsers : chatUsers}
        />
      </ScrollView>
    </>
  )
}

export default MessageContainer
