import React from "react";
import "./ExtraExtractions.css";
import "../../treatments/card_styling.css";

const ExtraExtractionsRemovedNotification = (props) => {
  return (
    <div className="notification_removed_container">
      <svg
        width={
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1800
              ? "27%"
              : "29%"
            : props.currentScreenSize >= 1800
            ? "27%"
            : "29%"
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
        viewBox="0 0 56.356 56.356"
      >
        <circle
          cx="28"
          cy="28"
          r="22.25"
          stroke="rgb(0, 129, 177)"
          strokeWidth="0.5"
          fill="white"
        />
        <g transform="translate(10.5 10)">
          <path
            className="extra_extractions_icon_path"
            stroke="rgb(131, 131, 131)"
            strokeWidth="1.2"
            d="M24.135 49.56c-.073-.145-.11-3.025-.11-8.554v-8.334h-7.857c-5.21 0-7.925-.04-8.062-.117-.198-.113-.207-.278-.207-4.075s.009-3.962.207-4.074c.137-.078 2.851-.118 8.062-.118h7.856v-8.334c0-5.528.038-8.408.111-8.554.106-.21.262-.219 3.84-.219 3.58 0 3.735.01 3.841.22.074.145.11 3.025.11 8.553v8.334h7.883c6.27 0 7.92.03 8.07.147.175.135.188.442.179 4.05-.01 3.507-.029 3.918-.189 4.045-.139.11-1.92.142-8.06.142h-7.882v8.335c0 5.528-.037 8.408-.11 8.553-.107.21-.263.22-3.841.22-3.579 0-3.735-.01-3.841-.22z"
            fill="none"
          />
        </g>
      </svg>
      <div className="notification_text_container">
        <h3>Extra Extractions Removed</h3>
        <p>The Extra Extractions add-on has been removed from your cart</p>
      </div>
    </div>
  );
};

export default ExtraExtractionsRemovedNotification;
