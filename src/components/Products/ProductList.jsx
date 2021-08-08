import { useReducer } from "react";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ACTIONS = {
  PRICE_HIGH_TO_LOW: "price-high-to-low",
  PRICE_LOW_TO_HIGH: "price-low-to-high",
  TOGGLE_INVENTORY: "toggle-inventory",
  TOGGLE_DELIVERY: "toggle-delivery",
  SORT: "sort"
};

export default function ProductList(props) {
  const productsData = props.value;

  const navigate = useNavigate();
  const handleProductDetail = (id) => {
    navigate(`/products/${id}`);
  };


  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SORT:
        return { ...state, sortBy: action.payload };
      case ACTIONS.TOGGLE_INVENTORY:
        return {
          ...state,
          showInventoryAll: !state.showInventoryAll
        };
      case ACTIONS.TOGGLE_DELIVERY:
        return {
          ...state,
          showFastDeliveryOnly: !state.showFastDeliveryOnly
        };
      default:
        return state;
    }
  };
  const [
    { showInventoryAll, showFastDeliveryOnly, sortBy },
    dispatch
  ] = useReducer(reducer, {
    showFastDeliveryOnly: true,
    showInventoryAll: false,
    sortBy: null
  });

  const getSortedData = (productList, sortBy) => {
    if (sortBy && sortBy === ACTIONS.PRICE_HIGH_TO_LOW) {
      return productList.sort((a, b) => b["price"] - a["price"]);
    } else if (sortBy && sortBy === ACTIONS.PRICE_LOW_TO_HIGH) {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    return productList;
  };
  const getFilteredData = (
    productList,
    { showInventoryAll, showFastDeliveryOnly }
  ) => {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  };
  
  const sortedData = getSortedData(productsData, sortBy);
  
  const filteredData = getFilteredData(sortedData, {
    showInventoryAll,
    showFastDeliveryOnly
  });

  return (
    <>
      <div className="product-page-container">
        <div className="sidenav-container">
          <div className="sidenav-set">
            <p>Sort By</p>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({
                    type: ACTIONS.SORT,
                    payload: ACTIONS.PRICE_HIGH_TO_LOW
                  })
                }
                checked={sortBy && sortBy === ACTIONS.PRICE_HIGH_TO_LOW}
              />{" "}
              Price - High to Low
            </label>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  dispatch({
                    type: ACTIONS.SORT,
                    payload: ACTIONS.PRICE_LOW_TO_HIGH
                  })
                }
                checked={sortBy && sortBy === ACTIONS.PRICE_LOW_TO_HIGH}
              />{" "}
              Price - Low to High
            </label>
          </div>
          <div className="sidenav-set">
            <legend>Filters</legend>
            <label>
              <input
                type="checkbox"
                checked={showFastDeliveryOnly}
                onChange={() => dispatch({ type: ACTIONS.TOGGLE_DELIVERY })}
              />{" "}
              Fast Delivery only
            </label>
            <label>
              <input
                type="checkbox"
                checked={showInventoryAll}
                onChange={() => dispatch({ type: ACTIONS.TOGGLE_INVENTORY })}
              />{" "}
              Include Out of stock
            </label>
          </div>
        </div>
        <div className="products-conatiner">
          <div style={{ display: "flex", flexWrap: "wrap" }}>
        {filteredData.map(
         product => (
            <ProductCard key={product._id} product={product}  handleProductDetail={handleProductDetail}/>
          )
        )}
      </div>
        </div>
      </div>
    </>
  );
}
