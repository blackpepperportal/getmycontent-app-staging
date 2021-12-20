import React, { Component } from 'react'
import { TouchableWithoutFeedback, Text, Image, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'

// const marginTop = Platform.select({
//     ios: 0,
//     android: 0,
//     web: "0",
// })

const TopNav = ({ goBack = true, title, secondaryIcon, secondaryLink }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {goBack && (
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={styles.leftButton}>
            <Icon style={styles.buttonIcon} name="arrow-left" />
          </View>
        </TouchableWithoutFeedback>
      )}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      {secondaryIcon && secondaryLink && (
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate(secondaryLink.stack, {
              screen: secondaryLink.screen,
            })
          }}
        >
          <View style={styles.rightButton}>
            <Icon style={styles.buttonIcon} name={secondaryIcon} />
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  )
}

export default TopNav
