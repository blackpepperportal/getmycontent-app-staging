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
import DropDownPicker from 'react-native-dropdown-picker'
import { useTranslation } from 'react-i18next'

import { addBankAccountStart } from '@/Store/Actions/BankAccountAction'
import { selectAddAccount } from '@/Store/Selectors/BankAccountSelector'
import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'

//TODO: have to fix style of bottom button

const AddBank = () => {
  const { t } = useTranslation()
  const { MyColors, darkMode } = useTheme()
  const { control, handleSubmit, errors } = useForm()
  const dispatch = useDispatch()
  const addedAccount = useSelector(selectAddAccount)
  const handleAddAccount = (data) => {
    let inputData = {}
    inputData.account_holder_name = data.account_holder_name
    inputData.account_number = data.account_number
    inputData.bank_name = data.bank_name ? data.bank_name : ' '
    inputData.iban_number = data.iban_number ? data.iban_number : undefined
    inputData.ifsc_code = data.ifsc_code ? data.ifsc_code : undefined
    inputData.nickname = data.nickname
    inputData.route_number = data.route_number ? data.route_number : undefined
    inputData.swift_code = data.swift_code ? data.swift_code : undefined
    dispatch(addBankAccountStart(inputData))
  }


  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.addBank')} />
      <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
        {t('profile.addBankPage.pageSubtitle')}
      </Text>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.FormBox}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelName')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="nickname"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.nickname && <Text>{t('general.required')}</Text>}
          
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelACName')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="account_holder_name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.account_holder_name && <Text>{t('general.required')}</Text>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelACNum')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                keyboardType="numeric"
              />
            )}
            name="account_number"
            rules={{
              required: { value: true, message: t('general.required') },
              pattern: {
                value: /^[0-9]*[1-9][0-9]*$/,
                message: t('general.invalid'),
              },
            }}
            defaultValue=""
          />
          {errors.account_number && (
            <Text>{errors.account_number.message}</Text>
          )}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelBankName')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="bank_name"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelIFSC')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="ifsc_code"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelSwift')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="swift_code"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelRouteNum')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="route_number"
            defaultValue=""
          />

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder={t('profile.addBankPage.input.labelIBANNum')}
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="iban_number"
            defaultValue=""
          />

        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          onPress={handleSubmit(handleAddAccount)}
          disabled={addedAccount.buttonDisable}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>
              {addedAccount.loadingButtonContent
                ? t('general.loading')
                : t('general.save')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddBank
