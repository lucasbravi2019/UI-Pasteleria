import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    recipe: null
}

const showRecipeSlice = createSlice({
    name: 'showRecipeReducer',
    initialState,
    reducers: {
        runLoadRecipe(state) {
            return state
        },
        loadRecipe(state, action) {
            state.recipe = action.payload
        },
        resetRecipe(state) {
            state.recipe = null
        }
    }

})

export const {
    runLoadRecipe,
    loadRecipe,
    resetRecipe
} = showRecipeSlice.actions

export default showRecipeSlice.reducer
