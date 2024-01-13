import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
}

export const loadingSlice = createSlice({
    name: 'loadingReducer',
    initialState,
    reducers: {
        setLoading(state) {
            state.loading = true
        },
        setLoaded(state) {
            state.loading = false
        }
    }
})
export const { setLoading, setLoaded } = loadingSlice.actions

export default loadingSlice.reducer