import React, { useState, useEffect } from 'react'
import {
  View,
  Image,
  Text,
  Button,
  ScrollView,
  Switch,
  TouchableWithoutFeedback,
  Linking,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useTranslation } from 'react-i18next'

import { fetchUserDetailsStart } from '@/Store/Actions/UserAction'
import { fetchPostsStart } from '@/Store/Actions/PostAction'
import { selectPosts } from '@/Store/Selectors/PostSelector'
import { selectUserDetails } from '@/Store/Selectors/UserSelector'
import TopNav from '/Components/TopNav'
import Tabs from '/Components/Tabs'
import Tab from '/Components/Tab'
import FeedCard from '@/Containers/Home/Components/FeedCard'
import styles from './styles'
import { useTheme } from '@/Theme'

const ProfileContainer = ({ navigation }) => {
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(fetchPostsStart())
  }, [])
  const { MyColors } = useTheme()
  const [tab, setTab] = useState('post')
  const dispatch = useDispatch()
  const posts = useSelector(selectPosts)
  const userDetails = useSelector(selectUserDetails)

  const openLinkHandler = (link) => {
    Linking.canOpenURL(link).then((supported) => {
      if (supported) {
        return Linking.openURL(link)
      } else {
        return Linking.openURL(`https://${link}`)
      }
    })
  }

  return (
    <View style={styles.PageContainer}>
      <TopNav
        title={t('profile.header')}
        secondaryIcon="cog"
        secondaryLink={{
          screen: 'EditProfile',
          stack: 'Profile',
        }}
      />
      <ScrollView>
        <View style={styles.ProfileBanner}>
          <View style={styles.ProfileBannerOverlay}></View>
          <Image
            source={{ uri: userDetails.data.cover }}
            style={styles.BannerImg}
          />
        </View>
        <View style={styles.ProfileHead}>
          <Image
            source={{ uri: userDetails.data.picture }}
            style={styles.UserImg}
          />
          <View style={styles.ProfileRight}>
            <Text style={styles.ProfileName}>
              {userDetails.loading ? t('general.loading') : userDetails.data.name}
            </Text>
            <Text style={[MyColors.lightColor, styles.ProfileUserName]}>
              @{userDetails.loading ? t('general.loading') : userDetails.data.username}
            </Text>
            <Text style={[MyColors.lightColor, styles.ProfileUserRole]}>
              {userDetails.data.about ? userDetails.data.about : ''}
            </Text>
          </View>
        </View>
        <View style={styles.ProfileSubHead}>
          {userDetails.data.address ? (
            <View style={styles.ProfileIcoName}>
              <Icon
                name="map-marker"
                style={[MyColors.lightColor, styles.ProfileIco]}
              />
              <Text style={[MyColors.lightColor, styles.ProfileIcoText]}>
                {userDetails.data.address
                  ? userDetails.data.address
                  : t('profile.myProfilePage.notAvail')}
              </Text>
            </View>
          ) : null}
          {userDetails.data.website ? (
            <View style={styles.ProfileIcoName}>
              <Icon
                name="link"
                style={[MyColors.lightColor, styles.ProfileIco]}
              />
              <Text
                style={[MyColors.lightColor, styles.ProfileIcoTextLink]}
                onPress={() => openLinkHandler(userDetails.data.website)}
              >
                {userDetails.data.website
                  ? userDetails.data.website
                  : t('profile.myProfilePage.notAvail')}}
              </Text>
            </View>
          ) : null}
          {userDetails.data.amazon_wishlist ? (
            <View style={styles.ProfileIcoName}>
              <Icon
                name="gift"
                style={[MyColors.lightColor, styles.ProfileIco]}
              />
              <Text
                style={[MyColors.lightColor, styles.ProfileIcoTextLink]}
                onPress={() =>
                  openLinkHandler(userDetails.data.amazon_wishlist)
                }
              >
                {userDetails.data.amazon_wishlist
                  ? userDetails.data.amazon_wishlist
                  : t('profile.myProfilePage.notAvail')}}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.TabHeader}>
          <Tabs>
            <Tab onPress={() => setTab('post')} active={tab === 'post'}>
              {t('general.posts')}
            </Tab>
          </Tabs>
          {/*<View style={styles.FilterBox}>
                  <Icon
                    name="search"
                    style={[MyColors.grayColor, styles.FilterBoxIcon]}
                  />
                  <Icon
                    name="sort"
                    style={[MyColors.grayColor, styles.FilterBoxIcon]}
                  />
                </View>*/}
        </View>
        {tab === 'post' ? (
          <>
            <FeedCard posts={posts} />
          </>
        ) : (
          <>
            <Text>{t('general.noData')}</Text>
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default ProfileContainer
