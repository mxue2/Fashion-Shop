import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import productsList from "../../assets/json/products.json";
import PropTypes from "prop-types";

// define the match keywards
const orderLowToHigh = "Price - Low to High";
const orderHighToLow = "Price - High to Low";
const sizeList = ["S", "M", "L", "XL"];
// products is an array that extracted from products.json
const products = productsList.products;

/* PROPS:
  @orderby: prop from parent "<Main />", eg, "Price - Low to High", etc.
  @filterby: prop from parent "<Main />", eg, "ALL" or "S", etc.
  @getNumItemsCallback: parent callback function used to tell how many items are now
*/
const ProductsSection = ({ orderby, filterby, getNumItemsCallback }) => {
  const [displayList, setDisplayList] = useState(products);

  // If props changed, calling function to render the page
  useEffect(() => {
    let didCancel = false;

    // component did mount
    getNumItemsCallback(products.length);

    if (!didCancel) {
      // filter by size
      if (sizeList.includes(filterby)) {
        const filterList = products.filter(item => item.sizes.includes(filterby));
        getNumItemsCallback(filterList.length);
        setDisplayList(filterList);
      } else {
        getNumItemsCallback(products.length);
        setDisplayList(products);
      }

      if (orderby === orderLowToHigh) {
        // sorby by price from low to high
        // return a copy of sorted array without mutating the original array
        setDisplayList(prev => prev.slice().sort((a, b) => (a.price > b.price ? 1 : -1)));
      } else if (orderby === orderHighToLow) {
        // sorby by price from high to low
        // return a copy of sorted array without mutating the original array
        setDisplayList(prev => prev.slice().sort((a, b) => (a.price > b.price ? -1 : 1)));
      }
    }

    return () => {
      // avoid infinite loop when setState in useEffect
      didCancel = true;
    };
    // eslint-disable-next-line
  }, [filterby, orderby]);

  // Render the component
  return (
    <div className="section-products">
      {displayList.map(item => (
        <ProductCard
          key={item.id}
          productID={item.id}
          name={item.name}
          image={item.image}
          price={item.price}
        />
      ))}
    </div>
  );
};

ProductsSection.propTypes = {
  orderby: PropTypes.string.isRequired,
  filterby: PropTypes.string.isRequired,
  getNumItemsCallback: PropTypes.func.isRequired
};

export default ProductsSection;
