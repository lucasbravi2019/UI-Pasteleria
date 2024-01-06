import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
    ingredientEditing: null
}

const ingredientSlice = createSlice({
    name: 'ingredientsReducer',
    initialState,
    reducers: {
        loadIngredients(state, action) {
            state.ingredients = [...action.payload]
        },
        setIngredientEditing(state, action) {
            state.ingredientEditing = action.payload
        },
        resetIngredientEditing(state) {
            state.ingredientEditing = null
        },
        runLoadIngredients(state) {
            return state
        },
        runCreateIngredient(state) {
            return state
        },
        runUpdateIngredient(state) {
            return state
        },
        runDeleteIngredient(state) {
            return state
        }
    }
})

export const {
    loadIngredients,
    setIngredientEditing,
    resetIngredientEditing,
    runLoadIngredients,
    runCreateIngredient,
    runUpdateIngredient,
    runDeleteIngredient
} = ingredientSlice.actions

export default ingredientSlice.reducer