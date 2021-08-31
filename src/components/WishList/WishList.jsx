import { useCart } from "../../context/cart-context.jsx";
import "./WishList.css";

export default function WishList() {
  const {  wishListItems, handleAddToCart, handleRemoveFromWishlist } = useCart();
 
  return (
    <>
    <div className="wishlist-header"><h1>Your Wishlist</h1></div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {wishListItems &&
          wishListItems.map(({product}) => (
            <div key={product._id} className={"card card-md"}>
              <img src={product.image} width="50%" height="auto" alt="" />
              <div className={"card-content"}>
                <div>{product.name}</div>
                <p>Rs. {product.price}</p>
                <button
                  onClick={() => {
                    handleAddToCart({product})
                  }}
                  className="btn btn-primary btn-custom"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    handleRemoveFromWishlist({product})
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
