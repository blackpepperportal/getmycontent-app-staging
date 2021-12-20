import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/FollowReducer'

const selectDomain = (state) => state.follow || initialState

export const selectActiveFollowers = createSelector(
  [selectDomain],
  (followState) => followState.activeFollowers,
)
export const selectActiveFollowings = createSelector(
  [selectDomain],
  (followState) => followState.activeFollowing,
)

