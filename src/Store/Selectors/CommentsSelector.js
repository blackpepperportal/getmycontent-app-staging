import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/CommentsReducer'

const selectDomain = (state) => state.comment || initialState

export const selectSaveComment = createSelector(
  [selectDomain],
  (commentState) => commentState.saveComment,
)
