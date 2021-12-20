import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import reducers from './Reducers'
import sagas from './Sagas'

const sagaMiddleware = createSagaMiddleware()

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme','language'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      const createDebugger = require('redux-flipper').default
      middlewares.push(createDebugger())
    }

    middlewares.push(sagaMiddleware)

    return middlewares
  },
})

sagaMiddleware.run(sagas)

const persistor = persistStore(store)

export { store, persistor }
