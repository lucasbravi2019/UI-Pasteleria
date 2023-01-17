import { createSlice } from "@reduxjs/toolkit";
import { Ingredient } from "../interfaces/recipes";
import { RootState } from "../root/store";

const initialState = {
    ingredients: [] as Ingredient[]
}

const ingredientSlice = createSlice({
    initialState,
    name: 'createIngredientReducer',
    reducers: {
        loadIngredients(state, action) {
            state.ingredients = action.payload
        },
        addIngredient(state, action) {
            console.log(action.payload);

            state.ingredients = [...state.ingredients, action.payload]
        }
    }
})

export const { loadIngredients, addIngredient } = ingredientSlice.actions

export const ingredientsSelector = (state: RootState) => state.ingredientReducer.ingredients

export default ingredientSlice.reducer