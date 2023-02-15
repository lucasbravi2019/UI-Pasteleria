import { createSlice } from '@reduxjs/toolkit'

import { Recipe } from '../../interfaces/recipe'
import { RootState } from '../store/store'

const initialState = {
    recipes: [] as Recipe[],
    recipe: {} as Recipe,
    recipesFiltered: [] as Recipe[]
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
        filterRecipesByName(state, action) {
            if (action.payload === '') {
                state.recipesFiltered = []
            } else {
                state.recipesFiltered = state.recipes.filter(recipe => recipe.name.toLowerCase().includes(action.payload))
            }
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
        },
        runUpdateRecipe(state) {
            return state
        }
    }
})

export const {
    loadRecipes,
    loadRecipe,
    addRecipe,
    filterRecipesByName,
    removeRecipe,
    runLoadRecipes,
    runLoadRecipe,
    runAddRecipe,
    runDeleteRecipe,
    runUpdateRecipe
} = recipeSlice.actions

export const recipesSelector = (state: RootState) => state.recipeReducer.recipes
export const recipeSelector = (state: RootState) => state.recipeReducer.recipe
export const recipeFilterSelector = (state: RootState) => state.recipeReducer.recipesFiltered

export default recipeSlice.reducer