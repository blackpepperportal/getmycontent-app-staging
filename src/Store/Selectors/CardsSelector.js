import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/CardsReducer'

const selectDomain = (state) => state.cards || initialState

export const selectCards = createSelector(
  [selectDomain],
  (cardsState) => cardsState.cardDetails,
)
