import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const FacialInCartErrorNotification = () => {
  return (
    <div
      className="notification_container"
      style={{ backgroundColor: "rgb(225, 225, 225)" }}
    >
      <FontAwesomeIcon
        style={{ width: "22%", height: "3.2rem", color: "rgb(0, 0, 0)" }}
        icon={faExclamationCircle}
      />
      <div
        className="notification_text_container"
        style={{ paddingBottom: "1rem", paddingTop: "1rem" }}
      >
        <h3>Cart Contains Facial</h3>
        <p>You already have a facial treatment in your cart</p>
      </div>
    </div>
  );
};

export default FacialInCartErrorNotification;
