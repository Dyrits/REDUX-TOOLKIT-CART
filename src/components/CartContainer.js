import React from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const CartContainer = () => {
    const { items, total, amount } = useSelector(({ cart }) => cart);

    if (amount === 0) {
        return (
            <section className="cart">
                <header>
                    <h2>Your cart</h2>
                    <h4 className="empty-cart">is currently empty</h4>
                </header>
            </section>
        );
    }
    return (
        <section className="cart">
            <header>
                <h2>Your cart</h2>
            </header>
            <div>
                { items.map((item) => <CartItem key={ item.id } { ...item } />) }
            </div>
            <footer>
                <hr />
                <div className="cart-total">
                    <h4>Total <span>${ total }</span></h4>
                </div>
                <button className="btn clear-btn">Clear cart</button>
            </footer>
        </section>
    );
};

export default CartContainer;