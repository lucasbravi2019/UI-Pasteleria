import { configureStore } from '@reduxjs/toolkit'
import homeReducer from '../containers/home/homeSlice'
import recipeCreationFormReducer from '../containers/recipe/recipeSlice'

export const store = configureStore({
    reducer: {
        homeReducer, 
        recipeCreationFormReducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState> 

