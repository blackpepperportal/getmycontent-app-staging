import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/UserReducer'

const selectDomain = (state) => state.users || initialState

export const selectLogin = createSelector(
  [selectDomain],
  (userState) => userState.loginInputData,
)

export const selectRegister = createSelector(
  [selectDomain],
  (userState) => userState.registerInputData,
)

export const selectForgot = createSelector(
  [selectDomain],
  (userState) => userState.forgotPasswordInputData,
)

export const selectUserDetails = createSelector(
  [selectDomain],
  (userState) => userState.profile,
)

export const selectUserPayments = createSelector(
  [selectDomain],
  (userState) => userState.payments,
)

export const selectEditProfile = createSelector(
  [selectDomain],
  (userState) => userState.profileInputData,
)

export const selectDelProfile = createSelector(
  [selectDomain],
  (userState) => userState.deleteAccount,
)

export const selectBlockedUsers = createSelector(
  [selectDomain],
  (userState) => userState.blockUsers,
)
