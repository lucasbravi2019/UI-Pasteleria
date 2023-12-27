import { createSelector } from "@reduxjs/toolkit"

export const selectShowRecipeSelector = (state) => state.showRecipeReducer.recipe

export const selectRecipeIdSelector = createSelector(selectShowRecipeSelector, (substate) => substate?.id)
export const selectRecipeNameSelector = createSelector(selectShowRecipeSelector, (substate) => substate?.name)
export const selectRecipePriceSelector = createSelector(selectShowRecipeSelector, (substate) => substate?.price)