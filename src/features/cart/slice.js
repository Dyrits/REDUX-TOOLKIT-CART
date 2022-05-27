import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
    items: [],
    amount: 0,
    total: 0,
    isLoading: true,
};

export const fetchItems = createAsyncThunk("cart/fetchItems", async (args, thunkAPI) => {
    try {
        const { data } = await axios.get(url);
        return data;
    } catch (error) { return thunkAPI.rejectWithValue(error.response); }
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
        decrease: (state, { payload }) => {
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
        [fetchItems.rejected]: (state, { payload }) => {
            console.error(payload);
            state.isLoading = false;
        }
    }
});

export const { clear, remove, increase, decrease, calculate } = slice.actions;

export default slice.reducer;