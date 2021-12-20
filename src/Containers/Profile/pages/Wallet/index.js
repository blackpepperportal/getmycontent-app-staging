import React, { useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchPaymentsStart } from '@/Store/Actions/UserAction'
import { selectUserPayments } from '@/Store/Selectors/UserSelector'
import { fetchAllTransactionStart } from '@/Store/Actions/TransactionAction'
import { selectTransaction } from '@/Store/Selectors/TransactionSelector'
import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'

const Wallet = ({ navigation }) => {
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(fetchAllTransactionStart())
    dispatch(fetchPaymentsStart())
  }, [])
  const { MyColors, darkMode } = useTheme()
  const dispatch = useDispatch()
  const transaction = useSelector(selectTransaction)
  const payments = useSelector(selectUserPayments)

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.wallet')} />
      <ScrollView style={styles.ScrollContainer}>
        <View style={[MyColors.cardBg, styles.WalletCard]}>
          <Text style={[MyColors.grayColor, styles.CardSubtitle]}>
            {t('profile.walletPage.currentBalance')}
          </Text>
          <Text style={styles.Cardtitle}>
            {payments.loading
              ? t('general.loading')
              : payments.data.user_wallet
              ? payments.data.user_wallet.remaining_formatted
              : '$0.00'}
          </Text>
          <View style={styles.ButtonContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('Profile', { screen: 'Withdraw' })
              }}
            >
              <View style={styles.Button}>
                <Text style={styles.ButtonText}>{t('profile.withdraw')}</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
          {t('profile.walletPage.recentTrans')}
        </Text>
        <View style={[MyColors.cardBg, styles.Table]}>
          <View style={[MyColors.lightBorder, styles.TableHead]}>
            <Text style={[MyColors.primaryColor, styles.TableHeadText]}>
              {t('profile.paymentsPage.date')}
            </Text>
            <Text style={[MyColors.primaryColor, styles.TableHeadText]}>
              {t('profile.paymentsPage.card')}
            </Text>
            <Text style={[MyColors.primaryColor, styles.TableHeadText]}>
              {t('profile.paymentsPage.amount')}
            </Text>
          </View>
          {transaction.loading ? (
            <Text>{t('general.loading')}</Text>
          ) : transaction.data.history.length > 0 ? (
            transaction.data.history.map((list, index) => (
              <View
                style={[MyColors.lightBorder, styles.TableBody]}
                key={index}
              >
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  {list.paid_date}
                </Text>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  {list.payment_mode}
                </Text>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  {list.paid_amount_formatted}
                </Text>
              </View>
            ))
          ) : (
            <Text>{t('general.noData')}</Text>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default Wallet
