import { createSelector } from "@reduxjs/toolkit"

export const selectRecipesSelector = (state) => state.homeReducer.recipes

export const selectRecipesNamesSelector = createSelector(selectRecipesSelector, (substate) => substate.map(recipe => {
    return {
        id: recipe.id,
        name: recipe.name
    }
}))

export const selectRecipeBasicSelector = createSelector(selectRecipesSelector, (substate) => {
    return substate.map(recipe => {
        return {
            key: `${recipe.id}`,
            name: recipe.name,
            price: recipe.price,
            actions: recipe.id
        }
    })
})