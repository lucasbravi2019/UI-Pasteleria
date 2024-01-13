import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: [],
    packageEditing: null,
}


const packagesSlice = createSlice({
    name: 'packagesReducer',
    initialState,
    reducers: {
        runLoadPackages(state) {
            return state
        },
        runCreatePackage(state) {
            return state
        },
        runDeletePackage(state) {
            return state
        },
        runUpdatePackage(state) {
            return state
        },
        setPackageEditing(state, action) {
            state.packageEditing = action.payload
        },
        resetPackageEditing(state) {
            state.packageEditing = null
        },
        removePackage(state, action) {
            const packages = state.packages.filter(pkg => pkg.id !== action.payload)
            state.packages = [...packages]
        },
        loadPackages(state, action) {
            state.packages = [...action.payload]
        }
    }
})

export const {
    runLoadPackages,
    runCreatePackage,
    runDeletePackage,
    runUpdatePackage,
    setPackageEditing,
    resetPackageEditing,
    loadPackages,
    removePackage
} = packagesSlice.actions

export default packagesSlice.reducer