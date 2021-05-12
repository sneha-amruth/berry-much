import {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import "./ProductDetailPage.css";
import { useCart } from "../../context/cart-context.jsx";
import { ACTIONS } from "../../context/cart-context.jsx";
import ProductQuantity from "./ProductQuantity";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";
import {useLoader} from "../../context/loader-context";
import {restAPICalls} from "../../utils/CallRestAPI";

//import ProductDetailImg from "../../assets/product-details/vegan.png"

export default function ProductDetail() {
    const {request} = restAPICalls();

    const {productId} = useParams();
    const { cartItems, dispatch } = useCart();
    const [productDetail, setProductDetail] = useState();
    const {isLoading, setLoading} = useLoader();
  const checkIfItemInCart = (id) => {
    const isPresent = cartItems.some(({ id: itemId }) => {
      return itemId === id;
    });
    return isPresent;
  };
  const getCurrentItemQuantity = (id) => {
    return cartItems.filter((item) => item.id === id)[0].quantity;
  };
  
    useEffect(() => {
      (async () => { 
        setLoading(true);
        try {
          const { data, success } = await request({
            method: "GET",
            endpoint: `/api/products/${productId}`,
          });
          if (success) {
             setProductDetail(data);
             setLoading(false);
          } else {
            console.error("something went worng.");
          }
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
       
      })();
     
    }, []);

    return(
        <>
         {isLoading && <Loader />}
         {!isLoading && productDetail && 
        <div className="detail-container">
         <div>
          <img src={productDetail.image} alt={productDetail.name} />
         </div>
         <div className="details-text">
         <p className="product-brand-name-pd">{productDetail.brand}</p>
         <h1> {productDetail.name}</h1>
        <span className="ratings">
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star checked"></span>
            <span className="fa fa-star"></span>
            <span className="fa fa-star"></span>
        </span>
        <p className="product-price">Rs. {productDetail.price}</p>
        {/* <span className="product-features">
            <img src={ProductDetailImg}></img>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
            <span className="btn btn-icon"><img src={ProductDetailImg}></img></span>
        </span> */}
        {checkIfItemInCart(productDetail._id) ? (
                  <ProductQuantity
                    id={productDetail._id}
                    quantity={getCurrentItemQuantity(productDetail._id)}
                  />
                ) : (
                  ""
                )}
                <button
                  onClick={() => {
                    const res = checkIfItemInCart(productDetail._id);

                    if (!res) {
                      dispatch({
                        type: ACTIONS.ADD_TO_CART,
                        payload: { id: productDetail._id, name: productDetail.name, image: productDetail.image, price: productDetail.price }
                      });
                    }
                  }}
                  className="btn btn-primary"
                  disabled={!productDetail.inStock}
                  style={!productDetail.inStock ? { opacity: "0.5" } : null}
                >
                  {!checkIfItemInCart(productDetail._id) ? (
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
                {!productDetail.inStock && <div class="text-card text-card-custom">
                <h2>Out Of Stock!</h2>
                <p>We will notify you when this product becomes available.</p>
                <input placeholder="Email Address"/> 
                <span><button type="button" class="btn btn-primary">Notify me</button></span>
                </div>}
                <div class="product-info">
                    {productDetail.description}
                </div>
        </div>
        </div>}
        </>
    )
}