import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/FavReducer'

const selectDomain = (state) => state.fav || initialState

export const selectFav = createSelector(
  [selectDomain],
  (favState) => favState.fav,
)
