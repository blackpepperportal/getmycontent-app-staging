import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import {
  fetchActiveFollowersStart,
  fetchExpiredFollowersStart,
  fetchFollowersStart,
} from '@/Store/Actions/FollowAction'
import { selectActiveFollowers } from '@/Store/Selectors/FollowSelector'
import TopNav from '/Components/TopNav'
import FansUsers from '/Components/UsersList'

const Fans = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchActiveFollowersStart())
  }, [])

  const activeFollowers = useSelector(selectActiveFollowers)
  console.log(activeFollowers)

  return (
    <ScrollView>
    <TopNav title={t('profile.fans')} />
      <FansUsers
        users={activeFollowers.data.followers}
        loading={activeFollowers.loading}
        listType={"fans"}
      />
    </ScrollView>
  )
}

export default Fans
