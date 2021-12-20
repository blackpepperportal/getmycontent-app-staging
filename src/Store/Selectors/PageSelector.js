import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/PageReducer'

const selectDomain = (state) => state.page || initialState

export const selectPageData = createSelector(
  [selectDomain],
  (pageState) => pageState.pageData,
)
