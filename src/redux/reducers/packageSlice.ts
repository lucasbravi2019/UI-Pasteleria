import { createSlice } from '@reduxjs/toolkit'

import { Package } from '../../interfaces/recipe'
import { RootState } from '../store/store'

const initialState = {
    packages: [] as Package[]
}

const packageSlice = createSlice({
    initialState,
    name: 'packageReducer',
    reducers: {
        loadPackages(state, action) {
            state.packages = action.payload
        },
        addPackage(state, action) {
            state.packages = [
                ...state.packages,
                action.payload
            ]
        },
        removePackage(state, action) {
            state.packages = state.packages.filter(pack => pack.id !== action.payload.id)
        },
        runLoadPackages(state) {
            return state
        },
        runAddPackage(state) {
            return state
        },
        runRemovePackage(state) {
            return state
        },
        runChangePackagePrice(state) {
            return state
        }
    }
})

export const {
    loadPackages,
    addPackage,
    removePackage,
    runLoadPackages,
    runAddPackage,
    runRemovePackage,
    runChangePackagePrice
} = packageSlice.actions

export const packagesSelector = (state: RootState) => state.packageReducer.packages

export default packageSlice.reducer