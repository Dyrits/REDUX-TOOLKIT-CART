import React from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import axios from "axios";
import App from "./App";
import cart, { fetchItems } from "./features/cart/slice";
import modal from "./features/modal/slice";

vi.mock("axios", () => ({ default: { get: vi.fn() } }));
const fixtures = [
  { id: "one", title: "Phone One", price: "10.50", amount: 1, img: "/logo192.png" },
  { id: "two", title: "Phone Two", price: "20.00", amount: 2, img: "/logo192.png" },
];
const setup = () => {
  const store = configureStore({ reducer: { cart, modal } });
  render(<Provider store={store}><App /></Provider>);
  return store;
};
beforeEach(() => { vi.clearAllMocks(); axios.get.mockResolvedValue({ data: fixtures }); });
afterEach(cleanup);

describe("cart behavior after the build-tool migration", () => {
  it("loads items, calculates totals and handles quantity changes and removal", async () => {
    const store = setup();
    expect(screen.getByText("Loading...")).toBeInTheDocument();
    await screen.findByText("Phone One");
    await waitFor(() => expect(store.getState().cart.total).toBe(50.5));
    const buttons = document.querySelectorAll(".amount-btn");
    fireEvent.click(buttons[0]);
    expect(store.getState().cart.amount).toBe(4);
    expect(screen.getByText("$61.00")).toBeInTheDocument();
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[1]);
    expect(screen.queryByText("Phone One")).not.toBeInTheDocument();
    expect(store.getState().cart.total).toBe(40);
    fireEvent.click(screen.getByText("Remove [X]"));
    expect(screen.getByText("is currently empty")).toBeInTheDocument();
  });
  it("cancels or confirms clearing the cart", async () => {
    const store = setup();
    await screen.findByText("Phone One");
    fireEvent.click(screen.getByText("Clear cart"));
    expect(store.getState().modal.isOpen).toBe(true);
    fireEvent.click(screen.getByText("Cancel"));
    expect(store.getState().cart.items).toHaveLength(2);
    expect(store.getState().modal.isOpen).toBe(false);
    fireEvent.click(screen.getByText("Clear cart"));
    fireEvent.click(screen.getByText("Confirm"));
    expect(store.getState().cart.items).toHaveLength(0);
    expect(store.getState().modal.isOpen).toBe(false);
    expect(screen.getByText("is currently empty")).toBeInTheDocument();
  });
  it("leaves loading and shows an empty cart when the API fails", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    axios.get.mockRejectedValue({ response: "unavailable" });
    const store = setup();
    await screen.findByText("is currently empty");
    expect(store.getState().cart.isLoading).toBe(false);
    expect(log).toHaveBeenCalledWith("unavailable");
    log.mockRestore();
  });
  it("uses the existing public demo endpoint for the async action", async () => {
    const store = configureStore({ reducer: { cart, modal } });
    await store.dispatch(fetchItems());
    expect(axios.get).toHaveBeenCalledWith("https://course-api.com/react-useReducer-cart-project");
  });
});
