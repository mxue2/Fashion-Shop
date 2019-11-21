import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = ({ productID, name, image, price }) => {
  return (
    <div className="card">
      <Link to={`/item/${productID}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="card-img">
          <img alt="name" src={require(`../../assets/products/${image}`)} />
        </div>
        <h2>{name}</h2>
      </Link>
      <p>${price}</p>
    </div>
  );
};

ProductCard.propTypes = {
  productID: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired
};

export default ProductCard;
