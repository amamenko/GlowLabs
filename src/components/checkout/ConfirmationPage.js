import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./ConfirmationPage.css";

const ConfirmationPage = () => {
  return (
    <div className="confirmation_page_container">
      <div className="confirmation_page_container_header">
        <Link to="/checkout">
          <FontAwesomeIcon
            className="confirmation_page_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CONFIRMATION</h1>
      </div>
      <div className="confirmation_page_header">
        <h2>CONFIRM BOOKING DETAILS</h2>
      </div>
      <p className="confirmation_page_statement">
        Almost there! Please make sure that your booking information is correct.
      </p>
    </div>
  );
};

export default ConfirmationPage;
