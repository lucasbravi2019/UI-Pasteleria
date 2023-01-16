import { createSlice } from "@reduxjs/toolkit";
import { RecipeName } from "../../interfaces/recipes";
import { RootState } from "../../root/store";

const initialState = {
    form: {
        name: ''
    } as RecipeName
}

const recipeSlice = createSlice({
    initialState,
    name: 'recipeReducer',
    reducers: {
        setRecipeName(state, action) {
            state.form.name = action.payload
        }
    }
})

export const { setRecipeName } = recipeSlice.actions

export const recipeCreationFormSelector = (state: RootState) => state.recipeCreationFormReducer.form

export default recipeSlice.reducer

