import { useCart } from "../../context/cart-context.jsx";
import "./WishListBtn.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

export default function WishListBtn({product}) {
  const id = product._id;
  const { wishListItems, handleAddToWishlist, handleRemoveFromWishlist } = useCart();
  const { isUserLoggedIn } = useAuth();
  const navigate = useNavigate();

  const checkIfItemInWishlist = (id) => {
    const isPresent = wishListItems.some(({ _id: itemId }) => {
      return itemId === id;
    });
    return isPresent;
  };

  const addOrRemoveItemToWishlist = () => {
    if(!isUserLoggedIn){
      navigate("/login");
      return;
    }
    const inWishlist = checkIfItemInWishlist(id);
    if (!inWishlist) {
      handleAddToWishlist({product});
    } else {
      handleRemoveFromWishlist({product})
    }
  };
  return (
    <>
      <button onClick={addOrRemoveItemToWishlist} className="btn btn-icon">
        {!checkIfItemInWishlist(id) ? (
          <i className="far fa-heart icon-wishlist"></i>
        ) : (
          <i className="fas fa-heart icon-wishlisted"></i>
        )}
      </button>
    </>
  );
}
