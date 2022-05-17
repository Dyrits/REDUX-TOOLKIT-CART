import { createSlice } from "@reduxjs/toolkit";
import items from "./items";

const initialState = {
    items,
    amount: items.length,
    total: items.reduce((accumulator, item) => accumulator + Number(item.price), 0),
    isLoading: true,
};

const slice = createSlice({
    name: "cart",
    initialState,
});

console.log(slice);

export default slice.reducer;