import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    modalOpen: false,
    recipes: [],
    event: null,
    recipeId: null
}

const recipeSlice = createSlice({
    name: 'recipeReducer',
    initialState,
    reducers: {
        openModal(state) {
            state.modalOpen = true
        },
        closeModal(state) {
            state.modalOpen = false
        },
        loadRecipes(state, action) {
            state.recipes = [...action.payload]
        },
        setEvent(state, action) {
            state.event = action.payload
        },
        setRecipeId(state, action) {
            state.recipeId = action.payload
        },
        removeRecipe(state, action) {
            const newRecipes = state.recipes.filter(recipe => recipe.id !== action.payload)
            state.recipes = [...newRecipes]
        },
        runLoadRecipes(state) {
            return state
        },
        runDeleteRecipe(state) {
            return state
        },
        runCreateRecipe(state) {
            return state
        },
    }
})

export const {
    openModal,
    closeModal,
    loadRecipes,
    setEvent,
    setRecipeId,
    removeRecipe,
    runLoadRecipes,
    runDeleteRecipe,
    runCreateRecipe,
} = recipeSlice.actions

export default recipeSlice.reducer