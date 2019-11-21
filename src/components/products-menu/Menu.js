import React, { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Menu = ({ onOrderBy, onFilterBy, numItems }) => {
  const orderbyList = ["Price - Low to High", "Price - High to Low"];
  const filterList = ["ALL", "S", "M", "L", "XL"];

  const [orderby, setOrderby] = useState(orderbyList[0]);
  const [filterby, setFilterby] = useState(filterList[0]);

  useMemo(() => onOrderBy(orderby), [orderby, onOrderBy]);
  useMemo(() => onFilterBy(filterby), [filterby, onFilterBy]);

  const renderDropdown = (titleLabel, label, setLabel, list) => {
    return (
      <div className="dropdown">
        <p className="dropdown__label">{titleLabel}:</p>
        <button className="dropdown__button">
          {label}
          <FontAwesomeIcon icon={faCaretDown} className="dropdown__button-icon" />
        </button>
        <div className="dropdown-content">
          {list.map(item => (
            <p key={item} onClick={e => setLabel(e.target.textContent)}>
              {item}
            </p>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="menu">
      <h1 className="menu__title">Products</h1>
      <div className="menu-box">
        <p className="menu-box__subtitle">{numItems} items</p>
        {renderDropdown("Filter by", filterby, setFilterby, filterList)}
        {renderDropdown("Order by", orderby, setOrderby, orderbyList)}
      </div>
    </div>
  );
};

Menu.propTypes = {
  onOrderBy: PropTypes.func.isRequired,
  onFilterBy: PropTypes.func.isRequired,
  numItems: PropTypes.number.isRequired
};

export default Menu;
