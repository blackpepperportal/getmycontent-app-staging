import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export const TabBarAdvancedButton = ({ bgColor, ...props }) => (
  <TouchableOpacity style={styles.container} onPress={props.onPress}>
    <View style={styles.button} pointerEvents="box-none">
      <Icon name="plus" style={styles.buttonIcon} />
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: -23,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 200,
    backgroundColor: '#3514A2',
    borderWidth: 2,
    borderColor: '#8163C7',
  },
  buttonIcon: {
    fontSize: 16,
    color: '#F6F7EB',
  },
})
