import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    modalOpen: false,
    recipes: [],
    event: null,
    recipeId: null,
    recipeEditing: null
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
        setRecipeEditing(state, action) {
            state.recipeEditing = action.payload
        },
        resetRecipeEditing(state) {
            state.recipeEditing = null
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
        runUpdateRecipe(state) {
            return state
        }
    }
})

export const {
    openModal,
    closeModal,
    loadRecipes,
    setEvent,
    setRecipeId,
    setRecipeEditing,
    resetRecipeEditing,
    removeRecipe,
    runLoadRecipes,
    runDeleteRecipe,
    runCreateRecipe,
    runUpdateRecipe
} = recipeSlice.actions

export default recipeSlice.reducer