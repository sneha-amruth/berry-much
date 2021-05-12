import { useCart } from "../../context/cart-context.jsx";
import { useAuth } from "../../context/auth-context";
import { ACTIONS } from "../../context/cart-context";
import "./ProductCard.css";
import WishListBtn from "../WishList/WishListBtn";
import ProductQuantity from "./ProductQuantity";
import { Link } from "react-router-dom";


export default function ProductCard({product, handleProductDetail}){
const id = product._id;
const name = product.name;
const image = product.image;
const price = product.price;
const brand = product.brand;
const inStock = product.inStock;

const { cartItems, handleAddToCart } = useCart();
const { isUserLoggedIn } = useAuth();

  const checkIfItemInCart = (id) => {
    const isPresent = cartItems.some(({ _id: itemId }) => {
      return itemId === id;
    });
    return isPresent;
  };
  

return (
    <div className={"card card-md"} key={id}>
            <img src={image} alt={name} onClick={ () => handleProductDetail(id)} style={{cursor: "pointer"}}/>
              {!inStock && <span className="custom-badge"> Out of Stock </span>}
              <WishListBtn product={product} />
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
                  />
                ) : (
                  ""
                )}
                <button
                  onClick={() => {
                    if(!isUserLoggedIn){
                        return;
                    }
                    const res = checkIfItemInCart(id);
                    if (!res) {
                      handleAddToCart({product});
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