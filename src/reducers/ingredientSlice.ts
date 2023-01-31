import { createSlice } from '@reduxjs/toolkit'

import { Ingredient } from '../interfaces/recipes'
import { RootState } from '../root/store'

const initialState = {
    ingredients: [] as Ingredient[]
}

const ingredientSlice = createSlice({
    initialState,
    name: 'ingredientReducer',
    reducers: {
        loadIngredients(state, action) {
            state.ingredients = action.payload
        },
        addIngredient(state, action) {
            state.ingredients = [
                ...state.ingredients,
                action.payload]
        },
        removeIngredient(state, action) {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload)
        }
    }
})

export const { loadIngredients, addIngredient, removeIngredient } = ingredientSlice.actions

export const ingredientsSelector = (state: RootState) => state.ingredientReducer.ingredients

export default ingredientSlice.reducer