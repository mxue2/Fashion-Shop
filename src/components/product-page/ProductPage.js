import React, { useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import productsList from "../../assets/json/products.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import NotFoundPage from "../not-found-page";
import PropTypes from "prop-types";

// define maximum purchases of each order
const maxPurchases = 5;
// products is an array that extracted from products.json
const products = productsList.products;

const errColor = "#ef4339";
const correctColor = "#000000";
// initial display label
const [sizeInitLabel, quantityInitLabel] = ["Select Size", "Quantity"];

const ProductPage = ({ addToCartCallback }) => {
  // get param from url
  let { id } = useParams();
  const findProduct = products.find(item => Number(item.id) === Number(id));
  const [selectSize, setSelectSize] = useState(sizeInitLabel);
  const [selectQuantity, setSelectQuantity] = useState(quantityInitLabel);
  const sizeEl = useRef(null);
  const quantityEl = useRef(null);

  const handleClick = () => {
    // check whether user select the correct size and quantity
    if (selectSize === sizeInitLabel) {
      sizeEl.current.style.borderColor = errColor;
    } else if (selectQuantity === quantityInitLabel) {
      sizeEl.current.style.borderColor = correctColor;
      quantityEl.current.style.borderColor = errColor;
    } else {
      sizeEl.current.style.borderColor = correctColor;
      quantityEl.current.style.borderColor = correctColor;
      // successful selection, then adding to shopping cart
      // parent callback passing value to App
      const totalPrice = findProduct.price * Number(selectQuantity);
      addToCartCallback({
        name: findProduct.name,
        size: selectSize,
        quantity: selectQuantity,
        price: totalPrice
      });
    }
  };

  /* Define the dropdown to select size or quantity
    @label: display label text
    @setLabel: set the state for size and quantity
    @list: dropdown list to select
    @refEl: refer to the container DOM, used to set error style when user didn't select size or quantity
  */
  const renderDropdown = (label, setLabel, list, refEl) => (
    <div className="dropdown-m" ref={refEl}>
      <button className="dropdown-m__button">
        {label}
        <FontAwesomeIcon icon={faCaretDown} className="dropdown-m__button-icon" />
      </button>
      <div className="dropdown-m-content">
        {list.map(item => (
          <p key={item} onClick={e => setLabel(e.target.textContent)}>
            {item}
          </p>
        ))}
      </div>
    </div>
  );

  const renderProduct = () => {
    if (findProduct) {
      // if we find a product according to the id
      return (
        <React.Fragment>
          <nav className="navigation">
            <Link to="/" className="navigation__home">
              Home
            </Link>
            > {findProduct.name}
          </nav>
          <div className="product-page">
            <div className="product-page-l">
              <div className="product-page-l__img">
                <img
                  alt={findProduct.name}
                  src={require(`../../assets/products/${findProduct.image}`)}
                />
              </div>
            </div>
            <div className="product-page-r">
              <h1 className="product-page-r__name">{findProduct.name}</h1>
              <p className="product-page-r__price">${findProduct.price}</p>
              <div className="product-page-r__options">
                {renderDropdown(selectSize, setSelectSize, findProduct.sizes, sizeEl)}
                {renderDropdown(
                  selectQuantity,
                  setSelectQuantity,
                  // [1,2,3,4,...maxPurchases]
                  Array.from({ length: maxPurchases }, (_, k) => k + 1),
                  quantityEl
                )}
              </div>
              <button onClick={handleClick} className="product-page-r__button custom-button">
                Add to Cart
              </button>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <NotFoundPage />;
    }
  };

  return <React.Fragment>{renderProduct()}</React.Fragment>;
};

ProductPage.propTyps = {
  addToCartCallback: PropTypes.func.isRequired
};

export default ProductPage;
