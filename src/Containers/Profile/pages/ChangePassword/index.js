import React from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import TopNav from '/Components/TopNav'
import { changePasswordStart } from '@/Store/Actions/UserAction'
import { selectChangePassword } from '@/Store/Selectors/ChangePasswordSelector'
import styles from './styles'
import { useTheme } from '@/Theme'

const ChangePassword = () => {
  const { t } = useTranslation()
  const { control, handleSubmit, errors } = useForm()
  const { MyColors, darkMode } = useTheme()
  const dispatch = useDispatch()

  const passData = useSelector(selectChangePassword)

  const handleChangePass = (data) => dispatch(changePasswordStart(data))

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.changePassword')} />
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.FormBox}>
          <Text style={MyColors.grayColor}>
            {t('profile.changePass.pageSubtitle')}
          </Text>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.changePass.input.label1')}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="old_password"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.old_password && <Text>{t('general.required')}</Text>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.changePass.input.label2')}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.password && <Text>{t('general.required')}</Text>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.changePass.input.label3')}
                secureTextEntry={true}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="password_confirmation"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.password_confirmation && <Text>{t('general.required')}</Text>}
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          onPress={handleSubmit(handleChangePass)}
          disabled={passData.buttonDisable}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>
              {passData.loadingButtonContent
                ? t('general.loading')
                : t('profile.changePassword')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChangePassword
