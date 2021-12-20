/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import { StyleSheet } from 'react-native'

/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */
export default function ({ Colors }) {
  return StyleSheet.create({
    cardBg: {
      backgroundColor: Colors.cardBg,
    },
    primaryColor: {
      color: Colors.primary,
    },
    primaryInvColor: {
      color: Colors.primaryinv,
    },
    lightColor: {
      color: Colors.light,
    },
    grayColor: {
      color: Colors.gray,
    },
    cardLightBg: {
      backgroundColor: Colors.lightBG,
    },
    lightBorder: {
      borderColor: Colors.lightBorder,
    },
  })
}
