import React from "react";
import "./ShoppingCart.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import ACTION_BODY_SCROLL_ALLOW from "../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_CART_IS_NOT_ACTIVE from "../../actions/CartIsActive/ACTION_CART_IS_NOT_ACTIVE";
import { useDispatch, useSelector } from "react-redux";

const ShoppingCart = () => {
  const dispatch = useDispatch();

  // In Cart states
  // Treatments
  const calmInCart = useSelector(state => state.calmInCart.in_cart);
  const clarifyInCart = useSelector(state => state.clarifyInCart.in_cart);
  const bacialInCart = useSelector(state => state.bacialInCart.in_cart);
  const glowInCart = useSelector(state => state.glowInCart.in_cart);
  const cbdInCart = useSelector(state => state.cbdInCart.in_cart);
  const chemicalPeelInCart = useSelector(
    state => state.chemicalPeelInCart.in_cart
  );
  const dermaplaningInCart = useSelector(
    state => state.dermaplaningInCart.in_cart
  );
  const microneedleInCart = useSelector(
    state => state.microneedleInCart.in_cart
  );
  const quenchInCart = useSelector(state => state.quenchInCart.in_cart);
  const quickieInCart = useSelector(state => state.quickieInCart.in_cart);
  const rejuvenateInCart = useSelector(state => state.rejuvenateInCart.in_cart);

  // Add-Ons
  const beardInCart = useSelector(state => state.beardInCart.in_cart);
  const dermarollingInCart = useSelector(
    state => state.dermarollingInCart.in_cart
  );
  const extraExtractionsInCart = useSelector(
    state => state.extraExtractionsInCart.in_cart
  );
  const guashaInCart = useSelector(state => state.guashaInCart.in_cart);
  const hydroJellyInCart = useSelector(state => state.hydroJellyInCart.in_cart);
  const ledInCart = useSelector(state => state.ledInCart.in_cart);
  const microcurrentInCart = useSelector(
    state => state.microcurrentInCart.in_cart
  );
  const microdermabrasionInCart = useSelector(
    state => state.microdermabrasionInCart.in_cart
  );
  const nanoneedlingInCart = useSelector(
    state => state.nanoneedlingInCart.in_cart
  );

  const counter = useSelector(state => state.counterReducer.counter);

  const backToHome = () => {
    dispatch(ACTION_CART_IS_NOT_ACTIVE());
    dispatch(ACTION_BODY_SCROLL_ALLOW());
  };

  const renderCartContents = () => {
    if (counter === 0) {
      return (
        <>
          <div className="empty_cart_container">
            <FontAwesomeIcon
              className="empty_shopping_cart"
              color="rgba(211, 211, 211, 0.6)"
              icon={faShoppingCart}
            />
            <h3>No items in your cart</h3>
          </div>
          <p className="cart_statement">
            You do not have any facial treatments or add-ons in your cart right
            now
          </p>
          <Link to="/" onClick={backToHome}>
            <div className="continue_shopping_button">
              <p>Continue Shopping</p>
            </div>
          </Link>
        </>
      );
    } else {
      return (
        <div
          style={{
            width: "100%",
            height: "23vh",
            paddingRight: "50vw",
            paddingLeft: "50vw",
            background: "black"
          }}
        >
          Hi
        </div>
      );
    }
  };

  return (
    <div className="shopping_cart_container">
      <h2
        className="shopping_cart_header"
        style={{
          borderBottom: counter === 0 ? "1px solid rgb(215, 156, 165" : "none"
        }}
      >
        MY CART
      </h2>
      <div
        className="my_facial_header"
        style={{ display: counter === 0 ? "none" : "flex" }}
      >
        <p>MY FACIAL</p>
      </div>
      {renderCartContents()}
    </div>
  );
};

export default ShoppingCart;
