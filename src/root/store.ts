import { configureStore } from '@reduxjs/toolkit'

import ingredientReducer from '../reducers/ingredientSlice'
import recipeReducer from '../reducers/recipeSlice'

export const store = configureStore({
    reducer: {
        recipeReducer,
        ingredientReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

