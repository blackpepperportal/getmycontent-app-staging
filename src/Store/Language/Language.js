import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('language/setDefaultLang'),
  reducers(state, { payload }) {
    state.language = payload.language
  },
}
