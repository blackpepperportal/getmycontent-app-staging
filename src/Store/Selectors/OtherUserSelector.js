import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/OtherUserReducer'

const selectDomain = (state) => state.otherUser || initialState

export const selectOtherUser = createSelector(
  [selectDomain],
  (otherUserState) => otherUserState.userDetails,
)

export const selectOtherPosts = createSelector(
  [selectDomain],
  (otherUserState) => otherUserState.userPosts,
)
