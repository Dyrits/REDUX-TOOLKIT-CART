import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { calculate } from "./features/cart/slice";


function App() {
    const { items } = useSelector(({ cart }) => cart);
    const dispatch = useDispatch();

    useEffect(() => { dispatch(calculate()); }, [dispatch, items]);

    return (
        <main>
            <Navbar/>
            <CartContainer/>
        </main>
    );
}

export default App;
