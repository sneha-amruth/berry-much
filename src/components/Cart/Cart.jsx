import { useCart } from "../../context/cart-context.jsx";
import ProductQuantity from "../Products/ProductQuantity";
import TotalCartValue from "./TotalCartValue";
import "./Cart.css";

export default function Cart() {
  const { cartItems } = useCart();
  return (
    <>
      <div className="cart-conatiner">
      <h1>Cart</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {cartItems &&
            cartItems.map(({ id, name, image, price, quantity }) => (
              <div key={id} className={"card card-md"}>
                <img src={image} width="50%" height="auto" alt="" />
                <div className={"card-content"}>
                  <div>{name}</div>
                  <p>Rs. {price}</p>
                  <ProductQuantity id={id} quantity={quantity} />
                </div>
              </div>
            ))}
        </div>
        <div>
          <TotalCartValue />
        </div>
      </div>
    </>
  );
}
