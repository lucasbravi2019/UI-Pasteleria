import { createSelector } from "@reduxjs/toolkit"

export const selectPackagesSelector = (state) => state.packagesReducer.packages

export const selectPackageEditingSelector = (state) => state.packagesReducer.packageEditing
export const selectPackageEditingIdSelector = createSelector(selectPackageEditingSelector, (substate) => substate?.id)
export const selectPackageEditingMetricSelector = createSelector(selectPackageEditingSelector, (substate) => substate?.metric)
export const selectPackageEditingQuantitySelector = createSelector(selectPackageEditingSelector, (substate) => substate?.quantity)
