import React from "react";
import PropTypes from "prop-types";

const CartItem = ({ name, size, price, quantity }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-left">
        <p className="cart-item-left__name">{name}</p>
        <p className="cart-item-left__size">{size}</p>
      </div>
      <div className="cart-item-right">
        <p className="cart-item-right__price">{price}</p>
        <p className="cart-item-right__quantity">{quantity}</p>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.string.isRequired
};

export default CartItem;
