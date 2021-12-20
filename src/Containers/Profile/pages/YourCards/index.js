import React, { useState, useEffect } from 'react'
import { View, Image, Text, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import stripe from 'tipsi-stripe'
import Toast from 'react-native-toast-message'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { apiConstants } from '@/Components/Constant/constants'
import TopNav from '/Components/TopNav'
import OptionsMenu from '/Components/OptionsMenu'
import {
  fetchCardDetailsStart,
  selectDefaultCardStart,
  deleteCardStart,
} from '@/Store/Actions/CardsAction'
import { selectCards } from '@/Store/Selectors/CardsSelector'
import styles from './styles'
import { useTheme } from '@/Theme'
import api from '@/Environment'

const cardicon = require('/Assets/Images/card-icon.png')


const YourCard = ({ navigation }) => {
  const { t } = useTranslation()
  stripe.setOptions({
    publishableKey: apiConstants.stripeKey, //have to change it
  })

  useEffect(() => {
    dispatch(fetchCardDetailsStart())
  }, [])

  const { MyColors } = useTheme()
  const dispatch = useDispatch()
  const cards = useSelector(selectCards)
  const [addCardLoadingContent, setAddCardLoadingContent] = useState(null)
  const MoreIcon = <MaterialIcon name="more-vert" size={25} color={'grey'} />

  const addCardHandler = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        setAddCardLoadingContent('Loading... Please wait')
        const inputData = {
          card_token: stripeTokenInfo.id,
        }
        api
          .postMethod('cards_add', inputData)
          .then((response) => {
            if (response.data.success) {
              Toast.show({
                type: 'success',
                text2: response.data.message,
              })
              dispatch(fetchCardDetailsStart())
            } else {
              console.log(response.data)
              Toast.show({
                type: 'error',
                text2: response.data.error,
              })
            }
            setAddCardLoadingContent(null)
          })
          .catch((err) => {
            Toast.show({
              type: 'error',
              text2: err.message,
            })
            setAddCardLoadingContent(null)
          })
      })
      .catch((error) => {
        //user cancel the action
      })
  }

  const defaultCardHandler = (id) => {
    dispatch(
      selectDefaultCardStart({
        user_card_id: id,
      }),
    )
  }

  const deleteCardHandler = (id) => {
    dispatch(
      deleteCardStart({
        user_card_id: id,
      }),
    )
  }

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.yourCard.header')} />
      <ScrollView style={styles.ScrollContainer}>
        <View style={styles.YourCardBlock}>
          {cards.loading ? (
            <Text>{t('general.loading')}</Text>
          ) : cards.data.cards.length > 0 ? (
            cards.data.cards.map((card, index) => (
              <View style={[MyColors.cardBg, styles.YourCard]} key={index}>
                <Image source={cardicon} style={styles.YourCardUserImg} />
                <View style={styles.YourCardContent}>
                  <Text style={[MyColors.primaryColor, styles.YourCardName]}>
                    {card.card_type}
                  </Text>
                  <Text style={[MyColors.lightColor, styles.YourCardNo]}>
                    XXXX XXXX XXXX {card.last_four}
                  </Text>
                  {card.is_default == 1 ? (
                    <View style={styles.HeadRight}>
                      <OptionsMenu
                        customButton={MoreIcon}
                        destructiveIndex={1}
                        options={[t('general.delete')]}
                        actions={[() => deleteCardHandler(card.id)]}
                      />
                    </View>
                  ) : (
                    <View style={styles.HeadRight}>
                      <OptionsMenu
                        customButton={MoreIcon}
                        destructiveIndex={1}
                        options={[t('general.makeDefault'), t('general.delete')]}
                        actions={[
                          () => defaultCardHandler(card.id),
                          () => deleteCardHandler(card.id),
                        ]}
                      />
                    </View>
                  )}
                </View>
                {card.is_default == 1 ? (
                  <Icon name="check-circle" style={styles.DefaultIcon} />
                ) : null}
              </View>
            ))
          ) : (
            <Text>{t('general.noData')}</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableOpacity
          disabled={addCardLoadingContent ? true : false}
          onPress={() => addCardHandler()}
        >
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>
              {addCardLoadingContent ? t('general.loading') : t('profile.addCard')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default YourCard
