import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/KycDocumentReducer'

const selectDomain = (state) => state.kycDocument || initialState

export const selectKycDocs = createSelector(
  [selectDomain],
  (kycState) => kycState.kycDocDetails,
)

export const selectUploadDocs = createSelector(
  [selectDomain],
  (kycState) => kycState.addKycDocInput,
)
