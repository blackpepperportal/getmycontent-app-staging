import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/CommentsReducer'

const selectDomain = (state) => state.withDraw || initialState

export const selectWithDrawals = createSelector(
  [selectDomain],
  (withDrawalsState) => withDrawalsState.withDrawals,
)

export const selectWithDrawalRequest = createSelector(
  [selectDomain],
  (withDrawalsState) => withDrawalsState.sendWithDraw,
)
