import { createSlice } from '@reduxjs/toolkit'

import { Recipe } from '../interfaces/recipes'
import { RootState } from '../root/store'

const initialState = {
    recipes: [] as Recipe[]
}

const recipeSlice = createSlice({
    initialState,
    name: 'recipeReducer',
    reducers: {
        loadRecipes(state, action) {
            state.recipes = action.payload
        },
        addRecipe(state, action) {
            state.recipes = [
                ...state.recipes,
                action.payload
            ]
            console.log(state.recipes);

        },
        removeRecipe(state, action) {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload)
        },
        runLoadRecipes(state) {
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

export const { loadRecipes, addRecipe, removeRecipe, runLoadRecipes, runAddRecipe, runDeleteRecipe } = recipeSlice.actions

export const recipesSelector = (state: RootState) => state.recipeReducer.recipes

export default recipeSlice.reducer