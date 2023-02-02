import createSagaMiddleware from '@redux-saga/core'
import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'

import { rootSaga } from '../../saga/rootSaga'
import ingredientReducer from '../reducers/ingredientSlice'
import messageReducer from '../reducers/messageSlice'
import recipeReducer from '../reducers/recipeSlice'

const sagaMiddleware = createSagaMiddleware()

const storeConfig = () => {
  const config = configureStore({
    reducer: {
      recipeReducer,
      ingredientReducer,
      messageReducer
    },
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
  })

  sagaMiddleware.run(rootSaga)

  return { store: config, dispatch: config.dispatch, state: config.getState }
}

export const { store, dispatch, state } = storeConfig()

export type AppDispatch = typeof dispatch
export type RootState = ReturnType<typeof state>

