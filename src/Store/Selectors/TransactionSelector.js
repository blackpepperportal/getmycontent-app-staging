import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/TransactionReducer'

const selectDomain = (state) => state.transaction || initialState

export const selectTransaction = createSelector(
  [selectDomain],
  (transactionState) => transactionState.allTransaction,
)

