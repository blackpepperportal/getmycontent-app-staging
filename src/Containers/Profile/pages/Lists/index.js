import React, { useEffect } from 'react'
import {
  View,
  Image,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchListsDetailsStart } from '@/Store/Actions/HomeAction'
import { selectLists } from '@/Store/Selectors/HomeSelector'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'

const ListsContainer = () => {
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(fetchListsDetailsStart())
  }, [])
  const { MyColors, darkMode } = useTheme()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const lists = useSelector(selectLists)
  const userDetails = useSelector(selectUserDetails)

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.lists')} />
      <ScrollView style={styles.ListsCardBlock}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Profile', { screen: 'Fans' })}
        >
          <View style={styles.ListsCard}>
            <View style={styles.ListsCardLeft}>
              <View style={styles.ListsContent}>
                <Text style={[MyColors.primaryColor, styles.ListsName]}>
                  {t('profile.fans')}
                </Text>
                <Text style={[MyColors.primaryColor, styles.ListsDetails]}>
                  {lists.loading ? t('general.loading') : lists.data.total_followers}{' '}
                  {t('general.people')}
                </Text>
              </View>
            </View>
            {/* <View style={styles.ListsCardRight}>
            <View style={styles.ListsUserImgBox}>
              <Image
                source={{ uri: userDetails.data.picture }}
                style={styles.ListsUserImg}
              />
            </View>
          </View> */}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Profile', { screen: 'Following' })
          }}
        >
          <View style={styles.ListsCard}>
            <View style={styles.ListsCardLeft}>
              <View style={styles.ListsContent}>
                <Text style={[MyColors.primaryColor, styles.ListsName]}>
                  {t('profile.following')}
                </Text>
                <Text style={[MyColors.primaryColor, styles.ListsDetails]}>
                  {lists.loading ? t('general.loading') : lists.data.total_followings}{' '}
                  {t('general.people')}
                </Text>
              </View>
            </View>
            {/* <View style={styles.ListsCardRight}>
            <View style={styles.ListsUserImgBox}>
              <Image
                source={{ uri: userDetails.data.picture }}
                style={styles.ListsUserImg}
              />
            </View>
          </View> */}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Profile', { screen: 'Favourites' })
          }}
        >
          <View style={styles.ListsCard}>
            <View style={styles.ListsCardLeft}>
              <View style={styles.ListsContent}>
                <Text style={[MyColors.primaryColor, styles.ListsName]}>
                  {t('profile.favorites')}
                </Text>
                <Text style={[MyColors.primaryColor, styles.ListsDetails]}>
                  {lists.loading ? t('general.loading') : lists.data.total_fav_users}{' '}
                  {t('general.people')}
                </Text>
              </View>
            </View>
            {/* <View style={styles.ListsCardRight}>
            <View style={styles.ListsUserImgBox}>
              <Image
                source={{ uri: userDetails.data.picture }}
                style={styles.ListsUserImg}
              />
            </View>
          </View> */}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Profile', { screen: 'Bookmarks' })
          }}
        >
          <View style={styles.ListsCard}>
            <View style={styles.ListsCardLeft}>
              <View style={styles.ListsContent}>
                <Text style={[MyColors.primaryColor, styles.ListsName]}>
                  {t('profile.bookmarks')}
                </Text>
                <Text style={[MyColors.primaryColor, styles.ListsDetails]}>
                  {lists.loading ? t('general.loading') : lists.data.total_bookmarks}
                </Text>
              </View>
            </View>
            {/* <View style={styles.ListsCardRight}>
            <View style={styles.ListsUserImgBox}>
              <Image
                source={{ uri: userDetails.data.picture }}
                style={styles.ListsUserImg}
              />
            </View>
          </View> */}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation.navigate('Profile', { screen: 'MyProfile' })
          }}
        >
          <View style={styles.ListsCard}>
            <View style={styles.ListsCardLeft}>
              <View style={styles.ListsContent}>
                <Text style={[MyColors.primaryColor, styles.ListsName]}>
                  {t('general.totalPosts')}
                </Text>
                <Text style={[MyColors.primaryColor, styles.ListsDetails]}>
                  {lists.loading ? t('general.loading') : lists.data.total_posts}
                </Text>
              </View>
            </View>
            {/* <View style={styles.ListsCardRight}>
            <View style={styles.ListsUserImgBox}>
              <Image
                source={{ uri: userDetails.data.picture }}
                style={styles.ListsUserImg}
              />
            </View>
          </View> */}
          </View>
        </TouchableWithoutFeedback>
        {/*lists.map((list) => (
          <View style={styles.ListsCard}>
            <View style={styles.ListsCardLeft}>
              <View style={styles.ListsContent}>
                <Text style={[MyColors.primaryColor, styles.ListsName]}>
                  {list.title}
                </Text>
                <Text style={[MyColors.primaryColor, styles.ListsDetails]}>
                  {list.listcount} Peoples
                </Text>
              </View>
            </View>
            <View style={styles.ListsCardRight}>
              {list.listcount != 0 ? (
                <>
                  <View style={styles.ListsUserImgBox}>
                    <Image source={list.userimg} style={styles.ListsUserImg} />
                  </View>
                  <Text style={[MyColors.grayColor, styles.ListsUserCount]}>
                    + {list.listcount - 1}
                  </Text>
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        ))*/}
      </ScrollView>
    </View>
  )
}

export default ListsContainer
