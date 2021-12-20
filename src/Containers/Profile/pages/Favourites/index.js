import React, { useEffect } from 'react'
import { Text, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { fetchFavStart } from '@/Store/Actions/FavAction'
import { selectFav } from '@/Store/Selectors/FavSelector'
import TopNav from '/Components/TopNav'
import FansUsers from '/Components/UsersList'

const Favourites = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFavStart())
  }, [])

  const favs = useSelector(selectFav)

  return (
    <ScrollView>
    <TopNav title={t('profile.favorites')} />
      <FansUsers
        users={favs.data.fav_users}
        loading={favs.loading}
        listType={'favourites'}
      />
    </ScrollView>
  )
}

export default Favourites
