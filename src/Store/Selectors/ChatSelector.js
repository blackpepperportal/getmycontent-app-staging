import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/ChatReducer'

const selectDomain = (state) => state.chat || initialState

export const selectChatUsers = createSelector(
  [selectDomain],
  (chatState) => chatState.chatUsers,
)

export const selectSearchChatUsers = createSelector(
  [selectDomain],
  (chatState) => chatState.searchUsers,
)

export const selectChatMessages = createSelector(
  [selectDomain],
  (chatState) => chatState.messages,
)
