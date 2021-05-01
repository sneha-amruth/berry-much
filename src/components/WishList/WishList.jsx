import { useCart } from "../../context/cart-context.jsx";
import { ACTIONS } from "../../context/cart-context.jsx";
import "./WishList.css";

export default function WishList() {
  const { wishListItems, dispatch } = useCart();
  return (
    <>
    <div className="wishlist-header"><h1>Your Wishlist</h1></div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {wishListItems &&
          wishListItems.map(({ id, name, image, price, quantity }) => (
            <div key={id} className={"card card-md"}>
              <img src={image} width="50%" height="auto" alt="" />
              <div className={"card-content"}>
                <div>{name}</div>
                <p>Rs. {price}</p>
                <button
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.ADD_TO_CART_FROM_WISHLIST,
                      payload: { id, name, image, price }
                    });
                  }}
                  className="btn btn-primary btn-custom"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    dispatch({
                      type: ACTIONS.REMOVE_FROM_WISHLIST,
                      payload: { id, name, image, price }
                    });
                  }}
                  className="btn btn-outline btn-custom"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
