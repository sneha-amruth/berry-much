import { useCart } from "../../context/cart-context.jsx";
import { ACTIONS } from "../../context/cart-context.jsx";
import "./ProductQuantity.css";

export default function ProductQuantity(props) {
  const itemId = props.id;

  const { cartItems, dispatch } = useCart();

  const quantity = cartItems.filter((item) => item.id === itemId)[0].quantity;

  const calculateTotalCartValue = () => {
    dispatch({
      type: ACTIONS.TOTAL_CART_VALUE
    });
  };
  return (
    <div className="quantity-input-area">
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.INCREASE_QUANTITY,
            payload: { itemId, quantity }
          })
        }
        className="btn-quantity"
      >
        {" "}
        +{" "}
      </button>
      <input
        type="number"
        value={quantity}
        onChange={calculateTotalCartValue}
      ></input>
      <button
        onClick={() =>
          dispatch({
            type: ACTIONS.DECREASE_QUANTITY,
            payload: { itemId, quantity }
          })
        }
        className="btn-quantity"
      >
        {quantity === 0 ? <i className="fas fa-trash trash-icon"></i> : "-"}
      </button>
    </div>
  );
}
