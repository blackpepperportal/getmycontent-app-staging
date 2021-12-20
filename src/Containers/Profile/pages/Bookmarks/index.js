import React, { useEffect, useState } from 'react'
import { View, Image, Text, Button, ScrollView, Switch } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  fetchBookmarksStart,
  fetchBookmarksVideoStart,
  fetchBookmarksPhotoStart,
} from '@/Store/Actions/BookmarkAction'
import {
  selectAllBookmark,
  selectVideoBookmark,
  selectPhotoBookmark,
} from '@/Store/Selectors/BookmarkSelector'
import TopNav from '/Components/TopNav'
import IconTabs from '/Components/IconTabs'
import IconTab from '/Components/IconTab'
import FeedCard from '@/Containers/Home/Components/FeedCard'
import styles from './styles'
import { useTheme } from '@/Theme'

const BookmarksContainer = () => {
  const { t } = useTranslation()
  useEffect(() => {
    dispatch(fetchBookmarksStart({ type: 'all', skip: allBookmarks.skip }))
  }, [])
  const { Images } = useTheme()
  const [tab, setTab] = useState('all')
  const dispatch = useDispatch()

  const loadVideoBookmarks = () => {
    if(videoBookmarks.loading)
      dispatch(
        fetchBookmarksVideoStart({ type: 'video', skip: videoBookmarks.skip }),
      )
  }

  const loadImageBookmarks = () => {
    if(photoBookmarks.loading)
      dispatch(
        fetchBookmarksPhotoStart({ type: 'image', skip: photoBookmarks.skip }),
      )
  }

  const allBookmarks = useSelector(selectAllBookmark)
  const videoBookmarks = useSelector(selectVideoBookmark)
  const photoBookmarks = useSelector(selectPhotoBookmark)

  return (
    <View style={styles.PageContainer}>
      <TopNav title={t('profile.bookmarks')} />
      <View style={styles.Header}>
        <IconTabs>
          <IconTab onPress={() => setTab('all')} active={tab === 'all'}>
            <Image source={Images.allimg} style={styles.TabImg} />
          </IconTab>
          <IconTab
            onPress={() => {
              setTab('images')
              loadImageBookmarks()
            }}
            active={tab === 'images'}
          >
            <Image source={Images.imagesimg} style={styles.TabImg} />
          </IconTab>
          <IconTab
            onPress={() => {
              setTab('videos')
              loadVideoBookmarks()
            }}
            active={tab === 'videos'}
          >
            <Image source={Images.videosimg} style={styles.TabImg} />
          </IconTab>
        </IconTabs>
      </View>
      <ScrollView style={styles.ScrollContainer}>
        {tab === 'all' ? (
          <>
            <Text style={styles.NotificationTitle}>{t('profile.bookmarksPage.all')}</Text>
            <FeedCard posts={allBookmarks} />
          </>
        ) : tab === 'images' ? (
          <>
            <Text style={styles.NotificationTitle}>{t('profile.bookmarksPage.images')}</Text>
            <FeedCard posts={photoBookmarks} />
          </>
        ) : tab === 'videos' ? (
          <>
            <Text style={styles.NotificationTitle}>{t('profile.bookmarksPage.videos')}</Text>
            <FeedCard posts={videoBookmarks} />
          </>
        ) : null 
      }
      </ScrollView>
    </View>
  )
}

export default BookmarksContainer
