import { createSelector } from '@reduxjs/toolkit'

import { initialState } from '@/Store/Reducers/BookmarkReducer'

const selectDomain = (state) => state.bookmark || initialState

export const selectAllBookmark = createSelector(
  [selectDomain],
  (bookmarkState) => bookmarkState.bookmark,
)

export const selectVideoBookmark = createSelector(
	[selectDomain],
	(bookmarkState) => bookmarkState.bookmarkVideo
)

export const selectPhotoBookmark = createSelector(
	[selectDomain],
	(bookmarkState) => bookmarkState.bookmarkPhoto
)
