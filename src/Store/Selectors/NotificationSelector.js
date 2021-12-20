import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/NotificationReducer'

const selectDomain = (state) => state.notification || initialState

export const selectNotification = createSelector(
  [selectDomain],
  (notificationState) => notificationState.notification,
)
