import { createSlice } from '@reduxjs/toolkit'

import { Ingredient } from '../../interfaces/recipe'
import { RootState } from '../store/store'

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
        },
        runLoadIngredients(state) {
            return state
        },
        runAddIngredient(state) {
            return state
        },
        runDeleteIngredient(state) {
            return state
        }
    }
})

export const { loadIngredients, addIngredient, removeIngredient, runLoadIngredients, runAddIngredient, runDeleteIngredient } = ingredientSlice.actions

export const ingredientsSelector = (state: RootState) => state.ingredientReducer.ingredients

export default ingredientSlice.reducer