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
        }
    }
})

export const { getRecipesFromApi } = homeSlice.actions

export const recipesSelector = (state: RootState) => state.homeReducer.recipes

export default homeSlice.reducer