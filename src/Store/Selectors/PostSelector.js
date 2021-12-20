import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/PostReducer'

const selectDomain = (state) => state.post || initialState

export const selectPosts = createSelector(
  [selectDomain],
  (postsState) => postsState.posts,
)

export const selectAddPost = createSelector(
  [selectDomain],
  (addPostState) => addPostState.savePost,
)

export const selectPPVPost = createSelector(
  [selectDomain],
  (addPostState) => addPostState.ppvPayStripe,
)

export const selectSinglePost = createSelector(
  [selectDomain],
  (addPostState) => addPostState.singlePost,
)

export const selectFileUpload = createSelector(
  [selectDomain],
  (addPostState) => addPostState.fileUpload,
)

