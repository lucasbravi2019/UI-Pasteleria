import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    operation: null,
    error: false,
    content: null
}

const messageSlice = createSlice({
    name: 'messageReducer',
    initialState,
    reducers: {
        runShowMessage(state) {
            return state
        },
        showMessage(state, action) {
            state.operation = action.payload.operation
            state.error = action.payload.error
            state.content = action.payload.content
        },
        hideMessage(state) {
            state.operation = null
            state.error = false
            state.content = null
        }
    }
})

export const {
    runShowMessage,
    showMessage,
    hideMessage
} = messageSlice.actions

export default messageSlice.reducer