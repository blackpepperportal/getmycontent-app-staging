import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import styles from './styles'
import { useTheme } from '@/Theme'

const UserView = ({ card, type }) => {
  const { MyColors } = useTheme()
  const navigation = useNavigation()
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

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        celebrityProfileHandler(
          type === 'favourites'
            ? card.fav_user
              ? card.fav_user.user_unique_id
              : card.fav_user_unique_id
            : type === 'search'
            ? card.user_unique_id
            : card.otherUser.user_unique_id,
        )
      }
    >
      <View style={[MyColors.cardBg, styles.NotificationCard]}>
        <Image
          source={{
            uri:
              type === 'fans' || type === 'search'
                ? card.picture
                : type === 'following'
                ? card.otherUser.picture
                : card.fav_user
                ? card.fav_user.picture
                : card.fav_user_picture,
          }}
          style={styles.NotificationUserImg}
        />
        <View style={styles.NotificationContent}>
          <Text style={[MyColors.lightColor, styles.NotificationTime]}>
            {type === 'fans' || type === 'search'
              ? card.name
              : type === 'following'
              ? card.otherUser.name
              : card.fav_user
              ? card.fav_user.name
              : card.fav_name}
          </Text>
          <Text style={[MyColors.primaryColor, styles.NotificationDetails]}>
            @
            {type === 'fans' || type === 'search'
              ? card.username
              : type === 'following'
              ? card.otherUser.username
              : card.fav_user
              ? card.fav_user.username
              : card.fav_username}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const UserCard = (props) => {
  const { t } = useTranslation()
  const { MyColors } = useTheme()
  return (
    <View style={styles.NotificationCardBlock}>
      {!props.loading ? (
        props.users.length > 0 ? (
          props.users.map((card, index) =>
            props.type ? (
              props.type === card.subject ? (
                <UserView card={card} type={props.listType} key={index} />
              ) : null
            ) : (
              <UserView card={card} type={props.listType} key={index} />
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

export default UserCard
