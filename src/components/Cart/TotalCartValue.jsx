import { useCart } from "../../context/cart-context.jsx";
import "./Cart.css";

export default function TotalCartValue() {
  const { cartItems } = useCart();
  const getTotalCartValue = () => {
    return cartItems.reduce(
      (prev, item) => prev + item.quantity * item.product.price,
      0
    );
  };
  return (
    <>
      {getTotalCartValue() > 0 ? (
        <p>
          Total cart value Rs. {getTotalCartValue()}{" "}
          <button className="btn btn-primary btn">Checkout</button>
        </p>
      ) : (
        <p className="info-message"> Your cart is currently empty</p>
      )}
    </>
  );
}
