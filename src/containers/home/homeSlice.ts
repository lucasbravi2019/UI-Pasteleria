import { createSlice } from "@reduxjs/toolkit";
import { Recipe } from "../../interfaces/recipes";
import { RootState } from "../../root/store";

const initialState = {
    recipes: [] as Recipe[]
}

const homeSlice = createSlice({
    initialState,
    name: 'homeReducer',
    reducers: {
        getRecipesFromApi(state, action) {
            state.recipes = action.payload
        },
        createRecipe(state, action) {
            state.recipes = [
                ...state.recipes,
                action.payload
            ]
        },
        deleteRecipe(state, action) {
            state.recipes = state.recipes.filter(recipe => recipe.id !== action.payload)
        }
    }
})

export const { getRecipesFromApi, createRecipe, deleteRecipe } = homeSlice.actions

export const recipesSelector = (state: RootState) => state.homeReducer.recipes

export default homeSlice.reducer