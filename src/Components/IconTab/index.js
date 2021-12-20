import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

const IconTab = ({ active, children, onPress, style }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={[style, active ? styles.active : styles.default]}>
          {children}
        </Text>
        <View
          style={[
            style,
            active ? styles.activeindicator : styles.defaultindicator,
          ]}
        ></View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    color: '#B8B8B8',
    marginRight: 15,
  },
  default: {
    display: 'flex',
    lineHeight: 40,
    color: '#B8B8B8',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.5,
  },
  active: {
    display: 'flex',
    lineHeight: 40,
    color: '#8163C7',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    fontSize: 16,
    textAlign: 'center',
    opacity: 1,
  },
  defaultindicator: {
    display: 'flex',
    height: 2,
    backgroundColor: 'transparent',
  },
  activeindicator: {
    display: 'flex',
    height: 2,
    backgroundColor: '#8163C7',
  },
})

export default IconTab
