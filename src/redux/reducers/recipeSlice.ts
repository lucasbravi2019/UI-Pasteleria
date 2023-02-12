import { createSlice } from '@reduxjs/toolkit'

import { Recipe } from '../../interfaces/recipe'
import { RootState } from '../store/store'

const initialState = {
    recipes: [] as Recipe[],
    recipe: {} as Recipe
}

const recipeSlice = createSlice({
    initialState,
    name: 'recipeReducer',
    reducers: {
        loadRecipes(state, action) {
            state.recipes = action.payload
        },
        loadRecipe(state, action) {
            state.recipe = action.payload
        },
        addRecipe(state, action) {
            state.recipes = [
                ...state.recipes,
                action.payload
            ]
        },
        removeRecipe(state, action) {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload)
        },
        runLoadRecipes(state) {
            return state
        },
        runLoadRecipe(state) {
            return state
        },
        runAddRecipe(state) {
            return state
        },
        runDeleteRecipe(state) {
            return state
        }
    }
})

export const { loadRecipes, loadRecipe, addRecipe, removeRecipe, runLoadRecipes, runLoadRecipe, runAddRecipe, runDeleteRecipe } = recipeSlice.actions

export const recipesSelector = (state: RootState) => state.recipeReducer.recipes
export const recipeSelector = (state: RootState) => state.recipeReducer.recipe

export default recipeSlice.reducer