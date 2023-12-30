import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ingredients: [],
    ingredientId: null
}

const ingredientSlice = createSlice({
    name: 'ingredientsReducer',
    initialState,
    reducers: {
        loadIngredients(state, action) {
            state.ingredients = [...action.payload]
        },
        setIngredientId(state, action) {
            state.ingredientId = action.payload
        },
        resetIngredientId(state) {
            state.ingredientId = null
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
    setIngredientId,
    resetIngredientId,
    runLoadIngredients,
    runCreateIngredient,
    runUpdateIngredient,
    runDeleteIngredient
} = ingredientSlice.actions

export default ingredientSlice.reducer