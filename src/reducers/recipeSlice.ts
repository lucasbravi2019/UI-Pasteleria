<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit'

import { Recipe } from '../interfaces/recipes'
import { RootState } from '../root/store'
=======
import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../interfaces/recipes";
import { RootState } from "../root/store";
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50

const initialState = {
    recipes: [] as Recipe[]
}

const recipeSlice = createSlice({
    initialState,
<<<<<<< HEAD
    name: 'recipeReducer',
=======
    name: 'homeReducer',
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50
    reducers: {
        loadRecipes(state, action) {
            state.recipes = action.payload
        },
        addRecipe(state, action) {
            state.recipes = [
                ...state.recipes,
                action.payload
            ]
        },
        removeRecipe(state, action) {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload)
        }
    }
})

export const { loadRecipes, addRecipe, removeRecipe } = recipeSlice.actions

export const recipesSelector = (state: RootState) => state.recipeReducer.recipes

export default recipeSlice.reducer