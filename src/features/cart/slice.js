import { createSlice } from "@reduxjs/toolkit";
import items from "./items";

const initialState = {
    items,
    amount: items.reduce((accumulator, item) => accumulator + item.amount, 0),
    total: items.reduce((accumulator, item) => accumulator + Number(item.price) * item.amount, 0),
    isLoading: true,
};

const slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clear: state => {
            state.items = [];
            state.amount = 0;
            state.total = 0;
        },
        remove: (state, { payload }) => {
            state.items = state.items.filter(item => item.id !== payload);
        },
        increase: (state, { payload }) => {
            const item = state.items.find(item => item.id === payload);
            item.amount ++;
        },
        decrease: (state, { payload}) => {
            const item = state.items.find(item => item.id === payload);
            item.amount --;
            if (item.amount === 0) { state.items = state.items.filter(item => item.id !== payload); }
        },
        calculate: (state) => {
            state.amount = state.items.reduce((accumulator, item) => accumulator + item.amount, 0);
            state.total = state.items.reduce((accumulator, item) => accumulator + Number(item.price) * item.amount, 0);
        }
    }
});

export const { clear, remove, increase, decrease, calculate } = slice.actions;

console.log(slice);

export default slice.reducer;