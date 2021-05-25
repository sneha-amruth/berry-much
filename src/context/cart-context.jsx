import React, { useEffect } from "react";
import { useReducer, useContext } from "react";
import { useAuth } from "./auth-context";
import { restAPICalls } from "../utils/CallRestAPI";
import { useLoader } from "./loader-context";
import { useSnackbar, SNACKBAR_ACTIONS } from "./snackbar-context";

export const CartContext = React.createContext();

export const ACTIONS = {
  SET_CART: "set-cart",
  ADD_TO_CART: "add-to-cart",
  INCREASE_QUANTITY: "increase-quantity",
  DECREASE_QUANTITY: "decrease-quantity",
  REMOVE_FROM_CART: "remove-from-cart",
  SET_WISHLIST: "set-wishlist",
  ADD_TO_WISHLIST: "add-to-wishlist",
  REMOVE_FROM_WISHLIST: "remove-from-wishlist",
  ADD_TO_CART_FROM_WISHLIST: "add-to-cart-from-wishlist",
  GET_WISHLIST_STATUS: "get-wishlist-status"
};

export function CartProvider({ children }) {
  const { request } = restAPICalls();
  const { setLoading} = useLoader();
  const { isUserLoggedIn, userId } = useAuth();
  const { snackbarDispatch } = useSnackbar();

  const reducer = (state, action) => {
    const { cartItems, wishListItems } = state;
    switch (action.type) {
      case ACTIONS.SET_CART: 
        return {
          ...state,
          cartItems: action.payload.cartItems
        }

      case ACTIONS.INCREASE_QUANTITY:
        return {
          ...state,
          cartItems: cartItems.map((item) => {
            return item.product._id === action.payload.productId
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          })
        };

      case ACTIONS.DECREASE_QUANTITY:
        if (action.payload.quantity > 1) {
          return {
            ...state,
            cartItems: cartItems.map((item) =>
              item.product._id === action.payload.productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
          };
        } 

      case ACTIONS.ADD_TO_CART:
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              _id: action.payload._id,
              product: {
              ...action.payload
              },
              quantity: 1
            }
          ]
        };

        case ACTIONS.REMOVE_FROM_CART:
        return {
          ...state,
          cartItems: cartItems.filter((item) => item.product._id !== action.payload)
        };

        case ACTIONS.SET_WISHLIST: 
        return {
          ...state,
          wishListItems: action.payload.wishListItems
        }

      case ACTIONS.ADD_TO_WISHLIST:
        return {
          ...state,
          wishListItems: [
            ...state.wishListItems,
            {
              _id: action.payload._id,
              product: 
              {...action.payload}
            }
          ]
        };

      case ACTIONS.REMOVE_FROM_WISHLIST:
        return {
          ...state,
          wishListItems: wishListItems.filter(
            (item) => item.product._id !== action.payload
          )
        };

      case ACTIONS.ADD_TO_CART_FROM_WISHLIST:
        if (
          !cartItems.filter((item) => item.id === action.payload.id).length > 0
        ) {
          return {
            ...state,
            cartItems: [
              ...state.cartItems,
              {
                id: action.payload.id,
                name: action.payload.name,
                image: action.payload.image,
                price: action.payload.price,
                quantity: 1
              }
            ]
          };
        } else {
          return {
            ...state,
            cartItems: cartItems.map((item) => {
              return item.id === action.payload.id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            })
          };
        }

      default:
        return state;
    }
  };

  const setCart = ({cartItems}) => {
    dispatch({ 
        type: ACTIONS.SET_CART, payload: { cartItems }
      });
  }

  const setWishList = ({wishListItems}) => {
    dispatch({ 
        type: ACTIONS.SET_WISHLIST, payload: { wishListItems }
      });
  }

  const [{ cartItems, wishListItems }, dispatch] = useReducer(reducer, {
    cartItems: [],
    wishListItems: []
  });
 
  const handleAddToCart = async ({product}) => {
    if(isUserLoggedIn) {
      try {
        const { success } = await request({
          method: "POST",
          endpoint: `/api/cart/${userId}/${product._id}`
        });
        if(success) {
          dispatch({
            type: ACTIONS.ADD_TO_CART, payload: product
          });
          snackbarDispatch({ type: "SUCCESS", payload: "Added To Cart" });
        }
       } catch(err){
        console.error(err);
       }
    }
  }

  const handleQuantityChange = async({productId, quantity, type}) => {
     if(isUserLoggedIn){
       try {
          const {success} = await request({
            method: "PUT",
            endpoint: `/api/cart/${userId}/${productId}`,
            body: {
              quantity: type === "increase-quantity" ? quantity+1 : quantity-1
            },
        });
        
        if(success){
          dispatch({
            type: type,
            payload: { productId, quantity } 
          })
        } else {
          dispatch({
            type: type,
            payload: { productId, quantity } 
          })
        }
       } catch(err) {
         console.error(err);
       }
     }
  }

  const handleRemoveFromCart = async({productId}) => {
    if(isUserLoggedIn) {
      try {
        const { success } = await request({
          method: "DELETE",
          endpoint: `/api/cart/${userId}/${productId}`,
        });
        if(success) {
          dispatch({
            type: ACTIONS.REMOVE_FROM_CART, payload: productId
          });
          snackbarDispatch({
            type: SNACKBAR_ACTIONS.ERROR, payload: "Removed from cart"
          });
        }
       } catch(err){
        console.error(err);
       }
    }
  }

  const handleAddToWishlist = async ({product}) => {
    if(isUserLoggedIn) {
      try {
        const { success } = await request({
          method: "POST",
          endpoint: `/api/wishlist/${userId}/${product._id}`
        });
        if(success) {
          dispatch({
            type: ACTIONS.ADD_TO_WISHLIST, payload: product
          });
          snackbarDispatch({
            type: SNACKBAR_ACTIONS.INFO, payload: "Added to Wishlist"
          });
        }
       } catch(err){
        console.error(err);
       }
    }
  }

  const handleRemoveFromWishlist = async({product}) => {
    if(isUserLoggedIn) {
      try {
        const { success } = await request({
          method: "DELETE",
          endpoint: `/api/wishlist/${userId}/${product._id}`
        });
        if(success) {
          dispatch({
            type: ACTIONS.REMOVE_FROM_WISHLIST, payload: product._id
          });
          snackbarDispatch({
            type: SNACKBAR_ACTIONS.INFO, payload: "Removed from Wishlist"
          });
        }
       } catch(err){
        console.error(err);
       }
    }
  }

  const fetchData = () => {
    (async () => {
      setLoading(true);
      try {
        const { data, success } = await request({
          method: "GET",
          endpoint: `/api/cart/${userId}`
        });
        if(success) {
          setLoading(false);
          setCart({cartItems: data})
        }
      } catch(err){
        setLoading(false);
        console.error(err);
      }
    })();
    (async () => {
      setLoading(true);
      try {
      const { data, success } = await request({
        method: "GET",
        endpoint: `/api/wishlist/${userId}`
      });
      if(success) {
        setWishList({ wishListItems: data})
      }
      }catch(err){
      setLoading(false);
      console.error(err);
      }
    })();
  }

  useEffect(() => {
    if(isUserLoggedIn){
      fetchData();
    } else{
      setCart({cartItems: []});
      setWishList({ wishListItems: []});
    } 
}, [isUserLoggedIn])

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      wishListItems, 
      dispatch, 
      handleAddToCart,
      handleQuantityChange,
      handleRemoveFromCart,     
      handleAddToWishlist,
      handleRemoveFromWishlist,
      setWishList,
      setCart
      }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
