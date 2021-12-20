import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/BankAccountReducer'

const selectDomain = (state) => state.bankAccount || initialState

export const selectBankAccount = createSelector(
  [selectDomain],
  (bankAccountState) => bankAccountState.bankAccount,
)

export const selectAddAccount = createSelector(
  [selectDomain],
  (bankAccountState) => bankAccountState.addBankAccountInput,
)
