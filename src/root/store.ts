import { configureStore } from '@reduxjs/toolkit'
import recipeReducer from '../reducers/recipeSlice'
import ingredientReducer from '../reducers/ingredientSlice'

export const store = configureStore({
    reducer: {
        recipeReducer,
        ingredientReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

