import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    modalOpen: false, 
    recipes: {},
    ingredients: {},
    packages: {},
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
            state.recipes = {...action.payload}
        },
        loadIngredients(state, action) {
            state.ingredients = {...action.payload}
        },
        loadPackages(state, action) {
            state.packages = {...action.payload}
        },
        setEvent(state, action) {
            state.event = action.payload
        },
        setRecipeId(state, action) {
            state.recipeId = action.payload
        },
        removeRecipe(state, action) {
            const newMap = {...state.recipes}
            delete newMap[action.payload]
            state.recipes = {...newMap}
        },
        runLoadRecipes(state) {
            return state
        },
        runDeleteRecipe(state) {
            return state
        }
    }
})

export const {
    openModal, 
    closeModal,
    loadRecipes,
    loadIngredients,
    loadPackages,
    setEvent,
    setRecipeId,
    removeRecipe,
    runLoadRecipes,
    runDeleteRecipe
} = recipeSlice.actions

export default recipeSlice.reducer