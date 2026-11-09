import React from "react";
import { useDispatch }  from "react-redux";

import { ChevronDownIcon, ChevronUpIcon } from "../icons";
import { increase, decrease, remove } from "../features/cart/slice";

const CartItem = ({ id, img, title, price, amount }) => {
    const dispatch = useDispatch();

    return (
        <article className="cart-item">
            <img src={ img } alt={ title } />
            <div>
                <h4>{ title }</h4>
                <h4 className="item-price">${ price }</h4>
                <button className="remove-btn" onClick={ () => dispatch(remove(id)) }>Remove [X]</button>
            </div>
            <div>
                <button className="amount-btn" onClick={ () => dispatch(increase(id)) }>
                    <ChevronUpIcon />
                </button>
                <p className="amount">{ amount }</p>
                <button className="amount-btn" onClick={ () => dispatch(decrease(id)) }>
                    <ChevronDownIcon />
                </button>
            </div>
        </article>
    );
}

export default CartItem;