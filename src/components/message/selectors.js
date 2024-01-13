import { createSelector } from "@reduxjs/toolkit"

export const selectMessageSelector = (state) => state.messageReducer

export const selectOperationSelector = createSelector(selectMessageSelector, (substate) => substate.operation)
export const selectContentSelector = createSelector(selectMessageSelector, (substate) => substate.content)
export const selectErrorSelector = createSelector(selectMessageSelector, (substate) => substate.error)