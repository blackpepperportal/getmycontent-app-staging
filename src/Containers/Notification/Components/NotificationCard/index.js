import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

import styles from './styles'
import { useTheme } from '@/Theme'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'

const NotiView = ({ card }) => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { MyColors } = useTheme()
  const userDetails = useSelector(selectUserDetails)
  const celebrityProfileHandler = (user_unique_id) => {
    if (user_unique_id == userDetails.data.user_unique_id) {
      navigation.navigate('Profile', { screen: 'MyProfile' })
    } else {
      navigation.navigate('Homes', {
        screen: 'CelebrityProfile',
        params: {
          user_unique_id: user_unique_id,
        },
      })
    }
  }

  const notiClickHandler = () => {
    if(card.action_url === "payments"){
      navigation.navigate('Profile', { screen: 'Payments' })
    }
    else if(card.action_url === "fans"){
      navigation.navigate('Profile', { screen: 'Fans' })
    }
    else if(card.action_url.split("/")[0] === "post"){
        navigation.navigate('Homes', {
        screen: 'SinglePost',
        params: {
          post_id: card.action_url.split("/")[1],
          notUnlock: true,
        },
      })
    }
  }

  return (
    <View style={[MyColors.cardBg, styles.NotificationCard]}>
      <TouchableWithoutFeedback
        onPress={() => celebrityProfileHandler(card.from_user.unique_id)}
      >
        <Image
          source={{ uri: card.from_userpicture }}
          style={styles.NotificationUserImg}
        />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={()=>notiClickHandler()}>
      <View style={styles.NotificationContent}>
        <Text style={[MyColors.lightColor, styles.NotificationTime]}>
          {card.updated_formatted}
        </Text>
        <Text style={[MyColors.primaryColor, styles.NotificationDetails]}>
          {card.message}
        </Text>
      </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const NotificationCard = (props) => {
  const { t } = useTranslation()
  const { MyColors } = useTheme()
  return (
    <View style={styles.NotificationCardBlock}>
      {!props.loading ? (
        props.notifications.length > 0 ? (
          props.notifications.map((card, index) =>
            props.type ? (
              props.type === card.subject ? (
                <NotiView card={card} key={index} />
              ) : null
            ) : (
              <NotiView card={card} key={index} />
            ),
          )
        ) : (
          <Text>{t('general.noData')}</Text>
        )
      ) : (
        <Text>{t('general.loading')}</Text>
      )}
    </View>
  )
}

export default NotificationCard
