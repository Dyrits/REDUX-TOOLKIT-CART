import { configureStore } from "@reduxjs/toolkit";
import cart from "./features/cart/slice";
import modal from "./features/modal/slice";

export const store = configureStore({
    reducer: { cart, modal },
});