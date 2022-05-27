import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
    items: [],
    amount: 0,
    total: 0,
    isLoading: true,
};

export const fetchItems = createAsyncThunk("cart/fetchItems", () => {
    return fetch(url)
        .then(response => response.json())
        .catch(error => console.log(error));
});

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
    },
    extraReducers: {
        [fetchItems.pending]: (state, action) => { state.isLoading = true; },
        [fetchItems.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.items = payload;
        },
        [fetchItems.rejected]: (state, action) => { state.isLoading = false; }
    }
});

export const { clear, remove, increase, decrease, calculate } = slice.actions;

export default slice.reducer;