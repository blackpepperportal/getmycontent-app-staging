import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/HomeReducer'

const selectDomain = (state) => state.home || initialState

export const selectHomePosts = createSelector(
  [selectDomain],
  (homeState) => homeState.homePost,
)

export const selectLists = createSelector(
  [selectDomain],
  (homeState) => homeState.lists,
)

export const selectPostSuggestion = createSelector(
  [selectDomain],
  (homeState) => homeState.postSug,
)

export const selectSerchResults = createSelector(
  [selectDomain],
  (homeState) => homeState.searchUser,
)