import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/ChangePasswordReducer'

const selectDomain = (state) => state.changePassword || initialState

export const selectChangePassword = createSelector(
  [selectDomain],
  (passState) => passState,
)
