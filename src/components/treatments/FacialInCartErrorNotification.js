import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const FacialInCartErrorNotification = (props) => {
  const saltCaveInCart = useSelector((state) => state.saltCaveInCart.in_cart);

  return (
    <div
      className="notification_container"
      style={{
        paddingRight:
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1800
              ? "3rem"
              : "0rem"
            : props.currentScreenSize >= 1800
            ? "3rem"
            : "0rem",
        backgroundColor: "rgb(225, 225, 225)",
      }}
    >
      <FontAwesomeIcon
        style={{
          width:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "14%"
                : "22%"
              : props.currentScreenSize >= 1800
              ? "14%"
              : "22%",
          height:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "6rem"
                : props.initialScreenSize >= 375
                ? "3.2rem"
                : "2.5rem"
              : props.currentScreenSize >= 1800
              ? "6rem"
              : props.currentScreenSize >= 375
              ? "3.2rem"
              : "2.5rem",
          color: "rgb(0, 0, 0)",
        }}
        icon={faExclamationCircle}
      />
      <div
        className="notification_text_container"
        style={{
          paddingBottom:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "2rem"
                : props.initialScreenSize >= 375
                ? "0.8rem"
                : "0.5rem"
              : props.currentScreenSize >= 1800
              ? "2rem"
              : props.currentScreenSize >= 375
              ? "0.8rem"
              : "0.5rem",
          paddingTop:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "2rem"
                : props.initialScreenSize >= 375
                ? "0.8rem"
                : "0.5rem"
              : props.currentScreenSize >= 1800
              ? "2rem"
              : props.currentScreenSize >= 375
              ? "0.8rem"
              : "0.5rem",
        }}
      >
        <h3>Cart Contains {saltCaveInCart ? "Treatment" : "Facial"}</h3>
        <p>
          You already have a{saltCaveInCart ? null : " facial"} treatment in
          your cart
        </p>
      </div>
    </div>
  );
};

export default FacialInCartErrorNotification;
