import createSagaMiddleware from '@redux-saga/core'
import {
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit'

import homeReducer from '../../pages/home/slice'
import recipeReducer from '../../pages/recipes/slice'
import loadingReducer from '../../redux/slice'
import showRecipeReducer from '../../pages/recipe/slice'
import packagesReducer from '../../pages/packages/slice'

import { rootSaga } from '../../saga/rootSaga'

const sagaMiddleware = createSagaMiddleware()

const storeConfig = () => {
  const config = configureStore({
    reducer: {
      homeReducer,
      recipeReducer,
      loadingReducer,
      showRecipeReducer,
      packagesReducer
    },
    middleware: [...getDefaultMiddleware({ thunk: false }), sagaMiddleware]
  })

  sagaMiddleware.run(rootSaga)

  return { store: config, dispatch: config.dispatch, state: config.getState }
}

export const { store, dispatch, state } = storeConfig()

