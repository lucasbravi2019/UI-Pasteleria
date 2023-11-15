import { createSlice } from "@reduxjs/toolkit"


export const initialState = {
    recipes: [{}]
}

const homeSlice = createSlice({
    name: 'homeReducer',
    initialState,
    reducers: {
        loadRecipes(state, action) {
            state.recipes = [...action.payload]
        },
        runGetRecipes(state) {
            return state
        }
    }
})

export const {
    loadRecipes,
    runGetRecipes
} = homeSlice.actions

export default homeSlice.reducer