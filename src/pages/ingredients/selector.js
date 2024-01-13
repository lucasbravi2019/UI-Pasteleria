import { createSelector } from '@reduxjs/toolkit'

export const selectIngredientsSelector = (state) =>
    state.ingredientsReducer.ingredients
export const selectIngredientEditingSelector = (state) =>
    state.ingredientsReducer.ingredientEditing

export const selectIngredientByIdSelector = createSelector(
    selectIngredientsSelector,
    selectIngredientEditingSelector,
    (originalIngredient, ingredientEditing) => {
        const ingredientFiltered = originalIngredient?.filter(
            (ingredient) => ingredient?.id === ingredientEditing?.id
        )
        return ingredientFiltered.length === 1 ? ingredientFiltered[0] : null
    }
)

export const selectIngredientEditingIdSelector = createSelector(
    selectIngredientEditingSelector,
    (substate) => substate?.id
)
export const selectIngredientEditingNameSelector = createSelector(
    selectIngredientEditingSelector,
    (substate) => substate?.name
)
export const selectIngredientEditingPackagesSelector = createSelector(
    selectIngredientByIdSelector,
    (substate) => substate?.packages
)

export const selectIngredientPackagesOptions = createSelector(
    selectIngredientEditingPackagesSelector,
    (substate) => {
        let packages = substate?.map((pkg) => {
            return {
                id: pkg?.ingredientPackageId,
                packageId: pkg?.package.id,
                price: pkg?.price,
            }
        })

        if (packages != null) {
            return {
                packages: [...Object.values(packages)],
            }
        }

        return null
    }
)
