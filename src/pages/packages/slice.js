import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: [],
    packageIdEditing: null,
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
        setPackageIdEditing(state, action) {
            state.packageIdEditing = action.payload
        },
        resetPackageIdEditing(state) {
            state.packageIdEditing = null
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
    setPackageIdEditing,
    resetPackageIdEditing,
    loadPackages,
    removePackage
} = packagesSlice.actions

export default packagesSlice.reducer