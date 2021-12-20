import React, { useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchUserDetailsStart } from '@/Store/Actions/UserAction'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'

const bankicon = require('/Assets/Images/bank-icon.png')

const Invoice = ({ route, navigation }) => {
  const { t } = useTranslation()
  useEffect(() => {
    if (userDetails.loading) dispatch(fetchUserDetailsStart())
  }, [])
  const { MyColors, darkMode } = useTheme()
  const { data, selectedAccount } = route.params
  const userDetails = useSelector(selectUserDetails)
  const dispatch = useDispatch()

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.invoice')} />
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.InvoiceHead}>
          <Image
            source={{ uri: userDetails.data.picture }}
            style={styles.UserImg}
          />
          <Text style={[MyColors.primaryColor, styles.UserName]}>
            {userDetails.loading ? t('general.loading') : userDetails.data.name}
          </Text>
        </View>
        <View style={[MyColors.cardBg, styles.InvoiceCard]}>
          <View style={styles.InvoiceCardRow}>
            <Text style={[MyColors.lightColor, styles.InvoiceCardText]}>
              {t('profile.paymentsPage.date')}
            </Text>
            <Text style={[MyColors.lightColor, styles.InvoiceCardText]}>
              10-10-2022
            </Text>
          </View>
          <View style={styles.InvoiceCardRow}>
            <Text style={[MyColors.lightColor, styles.InvoiceCardText]}>
              {t('general.name')}
            </Text>
            <Text style={[MyColors.lightColor, styles.InvoiceCardText]}>
              {userDetails.loading ? t('general.loading') : userDetails.data.name}
            </Text>
          </View>
          <View
            style={[
              styles.InvoiceCardRow,
              styles.InvoiceCardRowTotal,
              styles.lightBorder,
            ]}
          >
            <Text style={[MyColors.lightColor, styles.InvoiceCardText]}>
              {t('profile.invoicePage.withdrawAmount')}
            </Text>
            <Text style={[MyColors.lightColor, styles.InvoiceCardText]}>
              ${data.requested_amount}
            </Text>
          </View>
        </View>
        <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
          {t('profile.invoicePage.paymentVia')}
        </Text>
        <View style={styles.YourCardBlock}>
          <View style={[MyColors.cardBg, styles.YourCard]}>
            <Image source={bankicon} style={styles.YourCardUserImg} />
            <View style={styles.YourCardContent}>
              <Text style={[MyColors.primaryColor, styles.YourCardName]}>
                {selectedAccount.bank_name}
              </Text>
              <Text style={[MyColors.lightColor, styles.YourCardNo]}>
                {selectedAccount.account_number}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Account')}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>{t('general.done')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default Invoice
