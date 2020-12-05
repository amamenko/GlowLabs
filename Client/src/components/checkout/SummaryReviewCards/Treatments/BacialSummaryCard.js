import React from "react";
import "../SummaryReviewCards.css";

const BacialSummaryCard = (props) => {
  return (
    <div className="summary_card_container">
      <div className="summary_card_image_circle">
        <svg
          width="100%"
          height={
            !props.currentScreenSize
              ? props.initialScreenSize >= 1200
                ? "10rem"
                : "6rem"
              : props.currentScreenSize >= 1200
              ? "10rem"
              : "6rem"
          }
          viewBox="0 0 56 56"
        >
          <circle cx="28" cy="28" r="22" fill="rgb(241, 241, 241)" />
          <g
            id="layer1"
            fill="none"
            stroke="#000"
            transform="translate(10, -174)"
          >
            <path
              fill="rgba(150,221,225, 0.5)"
              className="bacial_icon_path"
              d="M6.953 276.362l35.653-.064-17.396-18.032-3.872 6.694-1.533-2.274-2.446 4.323-5.109 4.324-.134-1.921z"
              strokeWidth=".5"
            />
            <path
              fill="#fff"
              transform="translate(2, -140)"
              className="bacial_icon_path"
              d="M8.136 274.808l3.066-3.203.134 1.217 3.415-2.562.806 1.12 2.205-3.138 1.586 3.01 2.608-4.387.216 5.092 2.742-9.576 1.264 4.676.269-4.004 2.796 6.246.188-3.043 11.938 8.904-15.621-16.462-.296-.289-.054-.032-4.033 7.11-1.56-2.402-2.016 3.876-5.78 4.74-.135-1.89z"
              strokeWidth=".265"
            />
          </g>
        </svg>
      </div>
      <div className="summary_card_booking_description">
        <div className="summary_card_booking_description_left_section">
          <h2>Bacial</h2>
          <p>50 minutes</p>
        </div>
        <div className="summary_card_booking_description_right_section">
          <p>$120</p>
        </div>
      </div>
    </div>
  );
};

export default BacialSummaryCard;
