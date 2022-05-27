import { useDispatch } from "react-redux";

import { clear } from "../features/cart/slice";
import { close } from "../features/modal/slice";

const Modal = () => {
    const dispatch = useDispatch();

   return (
       <aside className="modal-container">
           <div className="modal">
               <h4>Remove all items from your shopping cart?</h4>
               <div className="btn-container">
                   <button className="btn confirm-btn"
                           onClick={ () => { dispatch(clear()); dispatch(close()); } }>Confirm</button>
                   <button className="btn clear-btn" onClick={ () => dispatch(close()) }>Cancel</button>
               </div>
           </div>
       </aside>
   )
}

export default Modal;