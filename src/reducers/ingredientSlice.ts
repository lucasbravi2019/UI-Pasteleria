import { createSlice } from '@reduxjs/toolkit'

import { Ingredient } from '../interfaces/recipes'
import { RootState } from '../root/store'

const initialState = {
    ingredients: [] as Ingredient[]
}

const ingredientSlice = createSlice({
    initialState,
<<<<<<< HEAD
    name: 'ingredientReducer',
=======
    name: 'createIngredientReducer',
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50
    reducers: {
        loadIngredients(state, action) {
            state.ingredients = action.payload
        },
        addIngredient(state, action) {
<<<<<<< HEAD
            state.ingredients = [
                ...state.ingredients,
                action.payload]
        },
        removeIngredient(state, action) {
            state.ingredients = state.ingredients.filter(ingredient => ingredient.id !== action.payload)
=======
            console.log(action.payload);

            state.ingredients = [...state.ingredients, action.payload]
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50
        }
    }
})

<<<<<<< HEAD
export const { loadIngredients, addIngredient, removeIngredient } = ingredientSlice.actions
=======
export const { loadIngredients, addIngredient } = ingredientSlice.actions
>>>>>>> 08a91cdf8322477aab983bd7ae31860b66c05a50

export const ingredientsSelector = (state: RootState) => state.ingredientReducer.ingredients

export default ingredientSlice.reducer