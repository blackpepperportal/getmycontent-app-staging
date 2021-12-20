import React from 'react'
import { View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import styles from './styles'
import { useTheme } from '@/Theme'

const UserView = ({ card }) => {
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
      onPress={() => celebrityProfileHandler(card.otherUser.user_unique_id)}
    >
      <View style={[MyColors.cardBg, styles.NotificationCard]}>
        <Image
          source={{ uri: card.picture }}
          style={styles.NotificationUserImg}
        />
        <View style={styles.NotificationContent}>
          <Text style={[MyColors.lightColor, styles.NotificationTime]}>
            {card.name}
          </Text>
          <Text style={[MyColors.primaryColor, styles.NotificationDetails]}>
            @{card.username}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const UserCard = (props) => {
  const { MyColors } = useTheme()
  return (
    <View style={styles.NotificationCardBlock}>
      {!props.loading ? (
        props.users.length > 0 ? (
          props.users.map((card, index) =>
            props.type ? (
              props.type === card.subject ? (
                <UserView card={card} key={index} />
              ) : null
            ) : (
              <UserView card={card} key={index} />
            ),
          )
        ) : (
          <Text>No users found</Text>
        )
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  )
}

export default UserCard
