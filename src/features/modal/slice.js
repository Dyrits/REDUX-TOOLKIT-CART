import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
};

const slice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        close: state => { state.isOpen = false; },
        open: state => { state.isOpen = true; }
    }
});

export const { close, open } = slice.actions;

export default slice.reducer;