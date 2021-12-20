import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import Language from './Language'

export default buildSlice('language', [Language], {
  language: 'en',
}).reducer
