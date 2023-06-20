import { createSlice } from '@reduxjs/toolkit'

import { IngredientMultiPackage } from '../../interfaces/recipe'
import { RootState } from '../store/store'

const initialState = {
    ingredients: [] as IngredientMultiPackage[],
    ingredientsFiltered: [] as IngredientMultiPackage[]
}

const ingredientSlice = createSlice({
    initialState,
    name: 'ingredientReducer',
    reducers: {
        loadIngredients(state, action) {
            state.ingredients = action.payload
            state.ingredientsFiltered = state.ingredients
        },
        addIngredient(state, action) {
            state.ingredients = [
                ...state.ingredients,
                action.payload]
            state.ingredientsFiltered = state.ingredients
        },
        addIngredients(state, action) {
            state.ingredients = [
                ...state.ingredients,
                ...action.payload
            ]
            state.ingredientsFiltered = state.ingredients
        },
        filterIngredients(state, action) {
            if (action.payload === '') {
                state.ingredientsFiltered = state.ingredients
            } else {
                state.ingredientsFiltered = state.ingredients.filter(ingredient => ingredient.name.toLowerCase().includes(action.payload))
            }
        },
        removeIngredient(state, action) {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload)
            state.ingredientsFiltered = state.ingredients
        },
        removeIngredients(state, action) {
            state.ingredients = state.ingredients.filter(ingredient => !action.payload.includes(ingredient.id))
            state.ingredientsFiltered = state.ingredients
        },
        runLoadIngredients(state) {
            return state
        },
        runAddIngredient(state) {
            return state
        },
        runDeleteIngredient(state) {
            return state
        },
        runAddPackageToIngredient(state) {
            return state
        },
        runUpdateIngredient(state) {
            return state
        }
    }
})

export const {
    loadIngredients,
    addIngredient,
    addIngredients,
    removeIngredient,
    removeIngredients,
    runLoadIngredients,
    runAddIngredient,
    runDeleteIngredient,
    runAddPackageToIngredient,
    filterIngredients,
    runUpdateIngredient
} = ingredientSlice.actions

export const ingredientsSelector = (state: RootState) => state.ingredientReducer.ingredients
export const ingredientsFilterSelector = (state: RootState) => state.ingredientReducer.ingredientsFiltered

export default ingredientSlice.reducer