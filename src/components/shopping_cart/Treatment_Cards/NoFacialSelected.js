import React from "react";
import "../CartCard.css";

const NoFacialSelected = props => {
  return (
    <div className="shopping_cart_card_wrapping">
      <div className="shopping_cart_card_image_circle">
        <svg width="100%" height="12rem" viewBox="0 0 50.006 50.006">
          <circle cx="25" cy="25" r="20" fill="rgb(241, 241, 241)" />
        </svg>
      </div>
      <div className="shopping_cart_card_description">
        <div className="cart_card_top_container">
          <h3 style={{ fontWeight: 600 }} className="no_facial_selected">
            No Facial Selected
          </h3>
          <p className="book_a_facial_statement">
            Book a facial to go along with your add-on
            {props.addOnsArr.length > 1 ? "s" : null}!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoFacialSelected;
