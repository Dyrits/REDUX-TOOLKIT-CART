import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import CartItem from "./CartItem";
import { clear } from "../features/cart/slice";



const CartContainer = () => {
    const { items, total, amount } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();

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
                <button className="btn clear-btn" onClick={ () => dispatch(clear()) }>Clear cart</button>
            </footer>
        </section>
    );
};

export default CartContainer;