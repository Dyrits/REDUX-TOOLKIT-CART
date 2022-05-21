import { createSlice } from "@reduxjs/toolkit";
import items from "./items";

const getAmount = items => items.reduce((accumulator, item) => accumulator + item.amount, 0);
const getTotal = items => Math.round(items.reduce((accumulator, item) => accumulator + Number(item.price) * item.amount, 0) * 100) / 100;

const initialState = {
    items,
    amount: getAmount(items),
    total: getTotal(items),
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
            state.amount = getAmount(state.items);
            state.total = getTotal(state.items);
        },
        increase: (state, { payload }) => {
            const item = state.items.find(item => item.id === payload);
            item.amount ++;
            state.amount = getAmount(state.items);
            state.total = getTotal(state.items);
        },
        decrease: (state, { payload}) => {
            const item = state.items.find(item => item.id === payload);
            item.amount --;
            if (item.amount === 0) { state.items = state.items.filter(item => item.id !== payload); }
            state.amount = getAmount(state.items);
            state.total = getTotal(state.items);
        },
    }
});

export const { clear, remove, increase, decrease } = slice.actions;

console.log(slice);

export default slice.reducer;