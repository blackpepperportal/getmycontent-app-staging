import React, { useEffect } from 'react'
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import stripe from 'tipsi-stripe'
import { useTranslation } from 'react-i18next'

import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'
import api from '@/Environment'

//TODO: delete/change default card to be added, add publish key

const AddCard = () => {
  const { t } = useTranslation()

  stripe.setOptions({
    publishableKey: 'have to add it',
  })

  const { MyColors, darkMode } = useTheme()
  const { control, handleSubmit, errors } = useForm()

  const addCardHandler = () => {
    return stripe
      .paymentRequestWithCardForm()
      .then((stripeTokenInfo) => {
        console.log('Token created', stripeTokenInfo )
      })
      .catch((error) => {
        console.log('Payment failed', error )
      })
  }

  useEffect(()=>{
    addCardHandler()
  },[])

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.addCar')} />
      <Text style={[MyColors.grayColor, styles.PageSubtitle]}>
        ADD NEW CARD
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
                placeholder="Name"
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.name && <Text>Required!</Text>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder="Card Number"
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="card_no"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.card_no && <Text>Required!</Text>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder="CVV"
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="cvv"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.cvv && <Text>Required!</Text>}

          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={[
                  MyColors.lightBorder,
                  MyColors.primaryColor,
                  styles.input,
                ]}
                placeholder="MM/YY"
                underlineColorAndroid="transparent"
                placeholderTextColor={darkMode ? '#ccc' : '#333'}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="date"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.date && <Text>Required!</Text>}
        </View>
      </ScrollView>
      <View style={styles.BottomContainer}>
        <TouchableOpacity onPress={handleSubmit(addCardHandler)}>
          <View style={styles.BottomButton}>
            <Text style={styles.BottomButtonText}>Save</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddCard
