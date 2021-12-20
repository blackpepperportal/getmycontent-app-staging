import React, { useState, Component } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Text, View, Image, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchNotificationsStart } from '@/Store/Actions/NotificationAction'
import { selectNotification } from '@/Store/Selectors/NotificationSelector'
import IconTabs from '/Components/IconTabs'
import IconTab from '/Components/IconTab'
import TopNav from '/Components/TopNav'
import styles from './styles'
import { useTheme } from '@/Theme'
import NotificationCard from './Components/NotificationCard'

const NotificationContainer = () => {
  const { t } = useTranslation()
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchNotificationsStart())
    }, []),
  )
  const { Images } = useTheme()
  const [tab, setTab] = useState('all')
  const dispatch = useDispatch()
  const notification = useSelector(selectNotification)

  return (
    <View style={styles.PageContainer}>
      <TopNav
        title={t('notifications.header')}
      />
      <View style={styles.Header}>
        <IconTabs>
          <IconTab onPress={() => setTab('all')} active={tab === 'all'}>
            <Image source={Images.allimg} style={styles.TabImg} />
          </IconTab>
          <IconTab onPress={() => setTab('comment')} active={tab === 'comment'}>
            <Image source={Images.cmdimg} style={styles.TabImg} />
          </IconTab>
          <IconTab onPress={() => setTab('like')} active={tab === 'like'}>
            <Image source={Images.likeimg} style={styles.TabImg} />
          </IconTab>
          <IconTab onPress={() => setTab('tip')} active={tab === 'tip'}>
            <Image source={Images.tipimg} style={styles.TabImg} />
          </IconTab>
        </IconTabs>
      </View>
      <ScrollView style={styles.ScrollContainer}>
        {tab === 'all' ? (
          <>
            <Text style={styles.NotificationTitle}>{t('notifications.all')}</Text>
            <NotificationCard
              notifications={notification.data.notifications}
              loading={notification.loading}
            />
          </>
        ) : tab === 'comment' ? (
          <>
            <Text style={styles.NotificationTitle}>{t('notifications.comments')}</Text>
            <NotificationCard
              notifications={notification.data.notifications}
              loading={notification.loading}
              type="You Post has received the comments"
            />
          </>
        ) : tab === 'like' ? (
          <>
            <Text style={styles.NotificationTitle}>{t('notifications.likes')}</Text>
            <NotificationCard
              notifications={notification.data.notifications}
              loading={notification.loading}
              type="Your Post has been Liked by the user"
            />
          </>
        ) : (
          <>
            <Text style={styles.NotificationTitle}>{t('notifications.tips')}</Text>
            <NotificationCard
              notifications={notification.data.notifications}
              loading={notification.loading}
              type="You have received the tips amount from the user"
            />
          </>
        
        )}
      </ScrollView>
    </View>
  )
}
export default NotificationContainer
