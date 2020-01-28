import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const FacialInCartErrorNotification = props => {
  return (
    <div
      className="notification_container"
      style={{
        paddingRight:
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1200
              ? "3rem"
              : "0rem"
            : props.currentScreenSize >= 1200
            ? "3rem"
            : "0rem",
        backgroundColor: "rgb(225, 225, 225)"
      }}
    >
      <FontAwesomeIcon
        style={{
          width:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1200
                ? "14%"
                : "22%"
              : props.currentScreenSize >= 1200
              ? "14%"
              : "22%",
          height:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1200
                ? "6rem"
                : "3.2rem"
              : props.currentScreenSize >= 1200
              ? "6rem"
              : "3.2rem",
          color: "rgb(0, 0, 0)"
        }}
        icon={faExclamationCircle}
      />
      <div
        className="notification_text_container"
        style={{
          paddingBottom:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1200
                ? "2rem"
                : "0.8rem"
              : props.currentScreenSize >= 1200
              ? "2rem"
              : "0.8rem",
          paddingTop:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1200
                ? "2rem"
                : "0.8rem"
              : props.currentScreenSize >= 1200
              ? "2rem"
              : "0.8rem"
        }}
      >
        <h3>Cart Contains Facial</h3>
        <p>You already have a facial treatment in your cart</p>
      </div>
    </div>
  );
};

export default FacialInCartErrorNotification;
