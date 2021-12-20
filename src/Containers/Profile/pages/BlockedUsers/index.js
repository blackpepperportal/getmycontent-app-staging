import React, { useEffect } from 'react'
import { ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlockUsersStart } from '@/Store/Actions/UserAction'
import { selectBlockedUsers } from '@/Store/Selectors/UserSelector'
import TopNav from '/Components/TopNav'
import UserCard from './Components/BlockedUsers'

const BlockedUsers = () => {

  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchBlockUsersStart())
  },[])

  const blockedUsers = useSelector(selectBlockedUsers)

  return (
    <ScrollView>
      <TopNav title="Blocked Users" />
      <UserCard
        // users={activeFollowers.data.followers}
        loading={true}
      />
    </ScrollView>
  )
}

export default BlockedUsers
