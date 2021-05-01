import { useCart } from "../../context/cart-context.jsx";
import { ACTIONS } from "../../context/cart-context.jsx";
import "./ProductCard.css";
import WishListBtn from "../WishList/WishListBtn";
import ProductQuantity from "./ProductQuantity";
import { Link } from "react-router-dom";


export default function ProductCard(prop){
const id = prop.value.id;
const name = prop.value.name;
const image = prop.value.image;
const price = prop.value.price;
const productName = prop.value.productName;
const brand = prop.value.brand;
const quantity = prop.value.quantity;
const inStock = prop.value.inStock;

const { cartItems, dispatch } = useCart();

  const checkIfItemInCart = (id) => {
    const isPresent = cartItems.some(({ id: itemId }) => {
      return itemId === id;
    });
    return isPresent;
  };
  const getCurrentItemQuantity = (id) => {
    return cartItems.filter((item) => item.id === id)[0].quantity;
  };

return (
    <div className={"card card-md"} key={id}>
            <Link to={`/products/${id}`}>   <img src={image} alt={productName} /></Link>
              {!inStock && <span className="custom-badge"> Out of Stock </span>}
              <WishListBtn id={id} name={name} image={image} price={price} />
              <div className={"card-content"}>
                <div>{name}</div>
                <p className="product-brand-name">{brand}</p>
                <span className="ratings">
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star checked"></span>
                  <span className="fa fa-star"></span>
                  <span className="fa fa-star"></span>
                </span>
                <p>Rs. {price}</p>
                {/* <p> {ratings}</p> */}
                {/* {inStock && <div> In stock </div>} */}

                {/* {fastDelivery ? (
                  <div>Fast Delivery</div>
                ) : (
                  <div>3 Day Minimum</div>
                )} */}
                {checkIfItemInCart(id) ? (
                  <ProductQuantity
                    id={id}
                    quantity={getCurrentItemQuantity(id)}
                  />
                ) : (
                  ""
                )}
                <button
                  onClick={() => {
                    const res = checkIfItemInCart(id);

                    if (!res) {
                      dispatch({
                        type: ACTIONS.ADD_TO_CART,
                        payload: { id, name, image, price }
                      });
                    }
                  }}
                  className="btn btn-primary"
                  disabled={!inStock}
                  style={!inStock ? { opacity: "0.5" } : null}
                >
                  {!checkIfItemInCart(id) ? (
                    "Add to Cart"
                  ) : (
                    <Link
                      to="/cart"
                      className="btn btn-primary"
                      style={{ textDecoration: "none" }}
                    >
                      Go to Cart
                    </Link>
                  )}
                </button>
              </div>
            </div>
)
}