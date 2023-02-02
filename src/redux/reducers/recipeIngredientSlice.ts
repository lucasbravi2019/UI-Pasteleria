import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

const recipeIngredientSlice = createSlice({
    initialState,
    name: 'recipeIngredientReducer',
    reducers: {
        runAddIngredientToRecipe(state) {
            return state
        }
    }
})

export const { runAddIngredientToRecipe } = recipeIngredientSlice.actions

export default recipeIngredientSlice.reducer