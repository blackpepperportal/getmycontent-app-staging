import React from 'react'
import {
  View,
  Image,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'
import { useTranslation } from 'react-i18next'

import styles from '../styles'
import { useTheme } from '@/Theme'

const MessageView = ({ clickHandler, chatUsers }) => {
  const { t } = useTranslation()
  const { MyColors, darkMode } = useTheme()

  return chatUsers.loading ? (
    <Text>{t('general.loading')}</Text>
  ) : chatUsers.data.users.length > 0 ? (
    chatUsers.data.users.map((chatUser, index) => (
      <TouchableWithoutFeedback
        onPress={() => clickHandler(chatUser)}
        key={index}
      >
        <View style={styles.MessageCard}>
          <View style={styles.MessageCardLeft}>
            <View style={styles.MessageUserImgBox}>
              <Image
                source={{ uri: chatUser.to_userpicture }}
                style={styles.MessageUserImg}
              />
              <View style={chatUser.is_online ? styles.Online : null} />
            </View>
            <View style={styles.MessageContent}>
              <Text style={[MyColors.primaryColor, styles.MessageName]}>
                {chatUser.to_displayname}
              </Text>
              <Text style={[MyColors.primaryColor, styles.MessageDetails]}>
                {/*chatUser.message*/}
                {/*TODO: uncomment lastest message*/}
              </Text>
            </View>
          </View>
          <View style={styles.MessageCardRight}>
            <Text style={[MyColors.lightColor, styles.MessageTime]}>
              {chatUser.time_formatted}
            </Text>
            {/*<Text style={styles.MessageCount}>{list.unread}</Text>*/}
          </View>
        </View>
      </TouchableWithoutFeedback>
    ))
  ) : (
    <Text>{t('general.noData')}</Text>
  )
}

export default MessageView