import { useParams } from "react-router-dom";
import { data } from "../../Database.js";
import "./ProductDetailPage.css";
import { useCart } from "../../context/cart-context.jsx";
import { ACTIONS } from "../../context/cart-context.jsx";
import ProductQuantity from "./ProductQuantity";
import { Link } from "react-router-dom";
import ProductDetailImg from "../../assets/product-details/vegan.png"

export default function ProductDetail() {
    const {productId} = useParams();
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

    const getProductDetails = (products, ProductId) => {
        return products.find((product) => product.id === productId);
    }

    const product = getProductDetails(data, productId);
    const id = product.id;
    const name = product.name;
    const brand = product.brand;
    const price = product.price;
    const image = product.image;
    const inStock = product.inStock;
    const productDetails = product.productDetails;
    return(
        <div className="detail-container">
         <div>
          <img src={image} alt={name} />
         </div>
         <div className="details-text">
         <p className="product-brand-name-pd">{brand}</p>
         <h1> {name}</h1>
        <span className="ratings">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
        </span>
        <p className="product-price">Rs. {price}</p>
        {/* <span className="product-features">
            <img src={ProductDetailImg}></img>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
        </span> */}
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
                {!inStock && <div class="text-card text-card-custom">
                <h2>Out Of Stock!</h2>
                <p>We will notify you when this product becomes available.</p>
                <input placeholder="Email Address"/> 
                <span><button type="button" class="btn btn-primary">Notify me</button></span>
                </div>}
                <div class="product-info">
                    {productDetails}
                </div>
        </div>
        </div>
        
    )
}