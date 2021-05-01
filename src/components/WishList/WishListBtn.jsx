import { useCart } from "../../context/cart-context.jsx";
import { ACTIONS } from "../../context/cart-context.jsx";
import "./WishListBtn.css";

export default function WishListBtn(props) {
  const id = props.id;
  const name = props.name;
  const image = props.image;
  const price = props.price;
  const { wishListItems, dispatch } = useCart();

  const checkIfItemInWishlist = (id) => {
    const isPresent = wishListItems.some(({ id: itemId }) => {
      return itemId === id;
    });
    return isPresent;
  };

  const addOrRemoveItemToWishlist = () => {
    const inWishlist = checkIfItemInWishlist(id);
    if (!inWishlist) {
      dispatch({
        type: ACTIONS.ADD_TO_WISHLIST,
        payload: { id, name, image, price }
      });
    } else {
      dispatch({
        type: ACTIONS.REMOVE_FROM_WISHLIST,
        payload: { id, name, image, price }
      });
    }
  };
  return (
    <>
      <button onClick={addOrRemoveItemToWishlist} className="btn btn-icon">
        {!checkIfItemInWishlist(id) ? (
          <i className="far fa-heart icon-wishlist"></i>
        ) : (
          <i className="far fa-heart icon-wishlisted"></i>
        )}
      </button>
    </>
  );
}
