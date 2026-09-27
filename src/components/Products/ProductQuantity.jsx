import { useCart } from "../../context/cart-context.jsx";
import { ACTIONS } from "../../context/cart-context.jsx";
import "./ProductQuantity.css";

export default function ProductQuantity(props) {
  const productId = props.id;

  const { cartItems, handleQuantityChange, handleRemoveFromCart } = useCart();

  const quantity = cartItems.filter((item) => item.product._id === productId)[0].quantity;

  return (
    <div className="quantity-input-area">
      <button
        onClick={() =>
          handleQuantityChange({productId, quantity, type: ACTIONS.INCREASE_QUANTITY})
        }
        className="btn-quantity"
      >
        {" "}
        +{" "}
      </button>
      <input
        type="number"
        value={quantity}
        readOnly
      ></input>
      <button
        onClick={() =>
          quantity === 1 ? handleRemoveFromCart({productId}) :
          handleQuantityChange({productId, quantity, type: ACTIONS.DECREASE_QUANTITY})
        }
        className="btn-quantity"
      >
        {quantity === 1 ? <i className="fas fa-trash trash-icon"></i> : "-"}
      </button>
    </div>
  );
}
