import React, { useState, useEffect, useMemo } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";

const Header = ({ newItem }) => {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // when new item comes in, check before adding to the cart
  useEffect(() => {
    if (newItem && !_.isEmpty(newItem)) {
      setShoppingCart(prev => [...prev, newItem]);
    }
  }, [newItem]);

  // calculate the total price when shopping cart changed
  useMemo(() => setTotalPrice(shoppingCart.reduce((acum, curr) => acum + curr.price, 0)), [
    shoppingCart
  ]);

  return (
    <header className="header">
      <Link className="header-logo-box" to="/">
        <h1 className="header-logo-box__logo" >Fashion Shop</h1>
      </Link>
      <div className="header-shopping-cart">
        <FontAwesomeIcon icon={faCartPlus} className="header-shopping-cart__icon" />

        <div className="header-shopping-cart__content">
          <h2>Your Order</h2>
          {shoppingCart.map((item, index) => (
            <CartItem key={index} {...item} />
          ))}
          <Link to="/checkout">
            <button className="header-shopping-cart__content-button custom-button">
              Check out: ${totalPrice}
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  newItem: PropTypes.object.isRequired
};

export default Header;
