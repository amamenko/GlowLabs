import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const MicrocurrentRejuvenateErrorNotification = props => {
  return (
    <div
      className="notification_container"
      style={{ backgroundColor: "rgb(225, 225, 225)" }}
    >
      <FontAwesomeIcon
        style={{
          width:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "24%"
                : "22%"
              : props.currentScreenSize >= 1800
              ? "24%"
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
          color: "rgb(0, 0, 0)"
        }}
        icon={faExclamationCircle}
      />
      <div
        className="notification_text_container"
        style={{
          paddingBottom:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "1rem"
                : "0.8rem"
              : props.currentScreenSize >= 1800
              ? "1rem"
              : "0.8rem",
          paddingTop:
            props.currentScreenSize === ""
              ? props.initialScreenSize >= 1800
                ? "1rem"
                : "0.8rem"
              : props.currentScreenSize >= 1800
              ? "1rem"
              : "0.8rem"
        }}
      >
        <h3
          style={{
            fontSize:
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "1.5rem"
                  : props.initialScreenSize >= 375
                  ? "0.9rem"
                  : "0.8rem"
                : props.currentScreenSize >= 1800
                ? "1.5rem"
                : props.currentScreenSize >= 375
                ? "0.9rem"
                : "0.8rem"
          }}
        >
          Included with Rejuvenate Facial
        </h3>
        <p>
          The Microcurrent add-on is included with the Rejuvenate facial
          treatment
        </p>
      </div>
    </div>
  );
};

export default MicrocurrentRejuvenateErrorNotification;
