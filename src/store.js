import { configureStore } from "@reduxjs/toolkit";
import cart from "./features/cart/slice";

export const store = configureStore({
    reducer: { cart },
});