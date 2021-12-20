import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import * as resources from './resources'
import AsyncStorage from '@react-native-async-storage/async-storage'

i18n.use(initReactI18next).init({
  resources: {
    ...Object.entries(resources).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: {
          translation: value,
        },
      }),
      {},
    ),
  },
  lng: 'en',
})

export const changeLaguage = (languageKey) => {
  i18n.changeLanguage(languageKey, async () => {
    await AsyncStorage.setItem('language',languageKey)
  })
}

export default i18n
