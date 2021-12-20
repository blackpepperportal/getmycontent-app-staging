import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'
import { deleteAccountStart } from '@/Store/Actions/UserAction'
import { selectDelProfile } from '@/Store/Selectors/UserSelector'

const DeleteAccount = () => {
  const { t } = useTranslation()
  const [password, setPassword] = useState('')
  const { MyColors, darkMode } = useTheme()
  const dispatch = useDispatch()
  const deleteAcc = useSelector(selectDelProfile)

  const handleDelete = () => {
    dispatch(deleteAccountStart({ password: password }))
  }

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.deleteAccount')} />
      <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
        {t('profile.deleteAcc.pageSubtitle')}
      </Text>
      <Text style={[MyColors.grayColor, styles.PageNote]}>
        ({t('profile.deleteAcc.note')})
      </Text>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.FormBox}>
          <TextInput
            style={[MyColors.lightBorder, MyColors.primaryColor, styles.input]}
            placeholder={t('profile.deleteAcc.passInput.label')}
            underlineColorAndroid="transparent"
            secureTextEntry={true}
            placeholderTextColor={darkMode ? '#ccc' : '#333'}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          disabled={deleteAcc.buttonDisable}
          onPress={() => handleDelete()}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>
              {deleteAcc.loadingButtonContent !== null
                ? t('general.loading')
                : t('profile.deleteAccount')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default DeleteAccount
