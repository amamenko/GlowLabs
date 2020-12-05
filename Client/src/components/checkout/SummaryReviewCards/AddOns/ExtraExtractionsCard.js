import React from "react";
import "../SummaryReviewCards.css";
import { useLocation } from "react-router-dom";

const ExtraExtractionsSummaryCard = (props) => {
  const location = useLocation();

  return (
    <div
      className="summary_add_ons_card_container"
      style={{
        borderBottom: location.pathname.includes("/account/clientprofile/")
          ? "none"
          : "1px solid rgb(211, 211, 211)",
      }}
    >
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
          viewBox="0 0 56.356 56.356"
        >
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
      <div className="summary_card_booking_description">
        <div className="summary_card_booking_description_left_section">
          <h2>Extra Extractions</h2>
          <p>10 minutes</p>
        </div>
        <div className="summary_card_booking_description_right_section">
          <p>$10</p>
        </div>
      </div>
    </div>
  );
};

export default ExtraExtractionsSummaryCard;
