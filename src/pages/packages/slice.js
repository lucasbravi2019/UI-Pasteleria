import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    packages: []
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
    loadPackages,
    removePackage
} = packagesSlice.actions

export default packagesSlice.reducer