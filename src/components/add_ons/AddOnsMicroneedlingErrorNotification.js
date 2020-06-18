import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const AddOnsMicroneedlingErrorNotification = (props) => {
  return (
    <div
      className="notification_container"
      style={{
        marginLeft:
          props.currentScreenSize === ""
            ? props.initialScreenSize >= 1800
              ? "1rem"
              : "0rem"
            : props.currentScreenSize >= 1800
            ? "1rem"
            : "0rem",
        backgroundColor: "rgb(225, 225, 225)",
      }}
    >
      <FontAwesomeIcon
        style={{
          width:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "13%"
                : "22%"
              : props.currentScreenSize >= 1800
              ? "13%"
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
          paddingLeft:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "1rem"
                : "0rem"
              : props.currentScreenSize >= 1800
              ? "1rem"
              : "0rem",
        }}
      >
        <h3
          style={{
            fontSize:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 2200
                  ? "1.5rem"
                  : props.initialScreenSize >= 1800
                  ? "1rem"
                  : "0.9rem"
                : props.currentScreenSize >= 2200
                ? "1.5rem"
                : props.currentScreenSize >= 1800
                ? "1rem"
                : "0.9rem",
          }}
        >
          Not Available With This Facial
        </h3>
        <p>
          This add-on is not able to be booked along with the Microneedle
          Infusion facial
        </p>
      </div>
    </div>
  );
};

export default AddOnsMicroneedlingErrorNotification;
