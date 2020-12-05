import React from "react";
import "./Bacial.css";
import "../../treatments/card_styling.css";

const BacialNotification = (props) => {
  return (
    <div className="notification_container">
      <svg
        width={
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1800
              ? "18%"
              : "26%"
            : props.currentScreenSize >= 1800
            ? "18%"
            : "26%"
        }
        height={
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1800
              ? "8rem"
              : props.initialScreenSize >= 375
              ? "5rem"
              : "4rem"
            : props.currentScreenSize >= 1800
            ? "8rem"
            : props.currentScreenSize >= 375
            ? "5rem"
            : "4rem"
        }
        viewBox="0 0 56 56"
      >
        <circle
          cx="28"
          cy="28"
          r="22"
          stroke="rgb(0, 129, 177)"
          strokeWidth="0.5"
          fill="white"
        />
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
      <div className="notification_text_container">
        <h3>Bacial Added</h3>
        <p>The Bacial facial treatment has been added to your cart</p>
      </div>
    </div>
  );
};

export default BacialNotification;
