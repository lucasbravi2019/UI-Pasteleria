import { createSelector } from '@reduxjs/toolkit'

export const selectRecipesSelector = (state) => state.recipeReducer.recipes
export const selectModalOpenSelector = (state) => state.recipeReducer.modalOpen
export const selectRecipeIdSelector = (state) => state.recipeReducer.recipeId

export const selectRecipeEditingSelector = (state) =>
    state.recipeReducer.recipeEditing

export const selectRecipeEditingIdSelector = createSelector(
    selectRecipeEditingSelector,
    (substate) => substate?.id
)
export const selectRecipeEditingNameSelector = createSelector(
    selectRecipeEditingSelector,
    (substate) => substate?.name
)
export const selectRecipeEditingIngredientsSelector = createSelector(
    selectRecipeEditingSelector,
    (substate) => substate?.ingredients
)

export const selectRecipeEditingIngredientsOptions = createSelector(
    selectRecipeEditingSelector,
    (substate) => {
        console.log(substate)
        let options = substate?.ingredients?.map((ingredient) => {
            return {
                id: ingredient.ingredient.id,
                quantity: ingredient.quantity,
            }
        })

        if (options != null) {
            return {
                ingredients: [...Object.values(options)],
            }
        }

        return null
    }
)
