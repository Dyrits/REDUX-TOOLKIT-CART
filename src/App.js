import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import { calculate } from "./features/cart/slice";
import { fetchItems } from "./features/cart/slice";

function App() {
    const { items, isLoading } = useSelector(({ cart }) => cart);
    const { isOpen } = useSelector(({ modal }) => modal);
    const dispatch = useDispatch();

    useEffect(() => { dispatch(calculate()); }, [dispatch, items]);
    useEffect(() => { dispatch(fetchItems()); }, [dispatch]);

    if (isLoading) { return <div className="loading"><h1>Loading...</h1></div>; }

    return (
        <main>
            { isOpen && <Modal /> }
            <Navbar/>
            <CartContainer/>
        </main>
    );
}

export default App;
