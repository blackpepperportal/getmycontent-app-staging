import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchAllTransactionStart } from '@/Store/Actions/TransactionAction'
import { selectTransaction } from '@/Store/Selectors/TransactionSelector'
import { fetchWithDrawalsStart } from '@/Store/Actions/WithDrawAction'
import { selectWithDrawals } from '@/Store/Selectors/WithDrawSelector'
import Tabs from '/Components/Tabs'
import Tab from '/Components/Tab'
import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'

const Payments = () => {
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(fetchAllTransactionStart())
    dispatch(fetchWithDrawalsStart())
  }, [])
  const { MyColors } = useTheme()
  const [tab, setTab] = useState('earnings')
  const dispatch = useDispatch()
  const transaction = useSelector(selectTransaction)
  const withDrawals = useSelector(selectWithDrawals)

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.payments')} />
      <View style={styles.TabHeader}>
        <Tabs>
          <Tab onPress={() => setTab('earnings')} active={tab === 'earnings'}>
            {t('profile.paymentsPage.earnings')}
          </Tab>
          <Tab onPress={() => setTab('withdraws')} active={tab === 'withdraws'}>
            {t('profile.paymentsPage.withdraws')}
          </Tab>
        </Tabs>
      </View>
      <ScrollView style={styles.ScrollContainer}>
        {tab === 'earnings' ? (
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
              <View style={[MyColors.lightBorder, styles.TableBody]}>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  N/A
                </Text>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  N/A
                </Text>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  N/A
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={[MyColors.cardBg, styles.Table]}>
            <View style={[MyColors.lightBorder, styles.TableHead]}>
              <Text style={[MyColors.primaryColor, styles.TableHeadText]}>
                {t('profile.paymentsPage.date')}
              </Text>
              <Text style={[MyColors.primaryColor, styles.TableHeadText]}>
                {t('profile.paymentsPage.card')}
              </Text>
              <Text style={[MyColors.primaryColor, styles.TableHeadText]}>
                {t('profile.paymentsPage.status')}
              </Text>
              <Text style={[MyColors.primaryColor, styles.TableHeadText]}>
                {t('profile.paymentsPage.amount')}
              </Text>
            </View>
            {withDrawals.loading ? (
              <Text>{t('general.loading')}</Text>
            ) : withDrawals.data.history.length > 0 ? (
              withDrawals.data.history.map((withDrawal, index) => (
                <View
                  style={[MyColors.lightBorder, styles.TableBody]}
                  key={index}
                >
                  <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                    {withDrawal.created}
                  </Text>
                  <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                    {withDrawal.payment_mode}
                  </Text>
                  <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                    {withDrawal.status_formatted}
                  </Text>
                  <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                    {withDrawal.paid_amount_formatted}
                  </Text>
                </View>
              ))
            ) : (
              <View style={[MyColors.lightBorder, styles.TableBody]}>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  N/A
                </Text>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  N/A
                </Text>
                <Text style={[MyColors.primaryColor, styles.TableBodyText]}>
                  N/A
                </Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default Payments
