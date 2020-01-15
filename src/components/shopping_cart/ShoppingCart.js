import React from "react";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const ShoppingCart = () => {
  return (
    <div className="shopping_cart_container">
      <h2 className="shopping_cart_header">My Cart</h2>
      <div className="empty_cart_container">
        <FontAwesomeIcon
          className="empty_shopping_cart"
          color="rgba(211, 211, 211, 0.6)"
          icon={faShoppingCart}
        />
        <h3>No items in your cart</h3>
      </div>
      <p className="cart_statement">
        You do not have any facial treatments or add-ons in your cart right now
      </p>
      <Link to="/">
        <div className="continue_shopping_button">
          <p>Continue Shopping</p>
        </div>
      </Link>
    </div>
  );
};

export default ShoppingCart;
