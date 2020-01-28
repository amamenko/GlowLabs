import React from "react";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import { useDispatch } from "react-redux";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const enableScroll = () => {
    dispatch(ACTION_BODY_SCROLL_ALLOW());
  };

  return (
    <div className="shopping_cart_container">
      <h2 className="shopping_cart_header">MY CART</h2>
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
      <Link to="/" onClick={enableScroll()}>
        <div className="continue_shopping_button">
          <p>Continue Shopping</p>
        </div>
      </Link>
    </div>
  );
};

export default ShoppingCart;
