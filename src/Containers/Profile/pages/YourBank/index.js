import React, { useEffect } from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useTranslation } from 'react-i18next'

import TopNav from '/Components/TopNav'
import {
  deleteBankAccountStart,
  getBankAccountStart,
  makeDefaultBankAccountStart,
} from '@/Store/Actions/BankAccountAction'
import { selectBankAccount } from '@/Store/Selectors/BankAccountSelector'
import styles from './styles'
import { useTheme } from '@/Theme'
import OptionsMenu from '/Components/OptionsMenu'

const bankicon = require('/Assets/Images/bank-icon.png')

const YourBank = ({ navigation }) => {
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(getBankAccountStart())
  }, [])
  const { MyColors } = useTheme()
  const dispatch = useDispatch()
  const bankAccounts = useSelector(selectBankAccount)
  const MoreIcon = <MaterialIcon name="more-vert" size={25} color={'grey'} />

  const defaultBankHandler = (id) => {
    dispatch(
      makeDefaultBankAccountStart({
        user_billing_account_id: id,
      }),
    )
  }

  const deleteBankAccountHandler = (id) => {
    dispatch(
      deleteBankAccountStart({
        user_billing_account_id: id,
      }),
    )
  }

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.yourBanks.header')} />
      <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
        {t('profile.yourBanks.pageSubtitle')}
      </Text>
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.YourBankBlock}>
          <Text style={MyColors.grayColor}>
            {t('profile.yourBanks.crInfo')}
          </Text>
          {bankAccounts.loading ? (
            <Text>{t('general.loading')}</Text>
          ) : bankAccounts.data.billing_accounts.length > 0 ? (
            bankAccounts.data.billing_accounts.map((account, index) => (
              <View style={[MyColors.cardBg, styles.YourBank]} key={index}>
                <Image source={bankicon} style={styles.YourBankUserImg} />
                <View style={styles.YourBankContent}>
                  <Text style={[MyColors.primaryColor, styles.YourBankName]}>
                    {account.bank_name}
                  </Text>
                  <Text style={[MyColors.lightColor, styles.YourBankNo]}>
                    XXXXX
                    {account.account_number.length > 5
                      ? account.account_number.slice(
                          account.account_number.length - 5,
                        )
                      : account.account_number}
                  </Text>
                  {account.is_default == 1 ? (
                    <View style={styles.HeadRight}>
                      <OptionsMenu
                        customButton={MoreIcon}
                        destructiveIndex={1}
                        options={[t('general.delete')]}
                        actions={[
                          () =>
                            deleteBankAccountHandler(
                              account.user_billing_account_id,
                            ),
                        ]}
                      />
                    </View>
                  ) : (
                    <View style={styles.HeadRight}>
                      <OptionsMenu
                        customButton={MoreIcon}
                        destructiveIndex={1}
                        options={[
                          t('general.makeDefault'),
                          t('general.delete'),
                        ]}
                        actions={[
                          () =>
                            defaultBankHandler(account.user_billing_account_id),
                          () =>
                            deleteBankAccountHandler(
                              account.user_billing_account_id,
                            ),
                        ]}
                      />
                    </View>
                  )}
                </View>
                {account.is_default === 1 ? (
                  <Icon name="check-circle" style={styles.DefaultIcon} />
                ) : null}
              </View>
            ))
          ) : (
            <Text style={[MyColors.primaryColor, styles.NoData]}>
              {t('general.noData')}
            </Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Profile', { screen: 'AddBank' })
          }}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>{t('profile.addBank')}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

export default YourBank
