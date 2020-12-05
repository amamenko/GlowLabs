import React from "react";
import { useDispatch } from "react-redux";
import ACTION_EXTRACTION_NOT_IN_CART from "../../../../actions/InCart/AddOns/ExtraExtractions/ACTION_EXTRACTION_NOT_IN_CART";
import ACTION_DECREMENT_COUNTER from "../../../../actions/Counter/ACTION_DECREMENT_COUNTER";
import "../../CartCard.css";

const ExtraExtractionsCard = (props) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(ACTION_EXTRACTION_NOT_IN_CART());
    dispatch(ACTION_DECREMENT_COUNTER());

    props.resetAllCartStatesExceptTreatments();
  };

  return (
    <div className="shopping_cart_card_wrapping">
      <div className="shopping_cart_card_image_circle">
        <svg width="100%" height="12rem" viewBox="0 0 56.356 56.356">
          <circle cx="28" cy="28" r="22.25" fill="rgb(241, 241, 241)" />
          <g transform="translate(10.5 10)">
            <path
              className="extra_extractions_icon_path"
              stroke="#000"
              strokeWidth="1.2"
              d="M24.135 49.56c-.073-.145-.11-3.025-.11-8.554v-8.334h-7.857c-5.21 0-7.925-.04-8.062-.117-.198-.113-.207-.278-.207-4.075s.009-3.962.207-4.074c.137-.078 2.851-.118 8.062-.118h7.856v-8.334c0-5.528.038-8.408.111-8.554.106-.21.262-.219 3.84-.219 3.58 0 3.735.01 3.841.22.074.145.11 3.025.11 8.553v8.334h7.883c6.27 0 7.92.03 8.07.147.175.135.188.442.179 4.05-.01 3.507-.029 3.918-.189 4.045-.139.11-1.92.142-8.06.142h-7.882v8.335c0 5.528-.037 8.408-.11 8.553-.107.21-.263.22-3.841.22-3.579 0-3.735-.01-3.841-.22z"
              fill="none"
            />
          </g>
        </svg>
      </div>
      <div className="shopping_cart_card_description">
        <div className="cart_card_top_container">
          <h3>Extra Extractions</h3>
          <p className="shopping_cart_duration">Duration: 10 minutes</p>
        </div>
        <div className="cart_card_bottom_container">
          <div className="shopping_cart_price_container">
            <p className="shopping_cart_price">$10</p>
          </div>
          <div className="shopping_cart_remove_button" onClick={handleRemove}>
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraExtractionsCard;
