import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const AddOnsMicroneedlingErrorNotification = () => {
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
        style={{ paddingBottom: "0.8rem", paddingTop: "0.8rem" }}
      >
        <h3 style={{ fontSize: "0.9rem" }}>Not Available With This Facial</h3>
        <p>
          This add-on is not able to be booked along with the Microneedle
          Infusion facial
        </p>
      </div>
    </div>
  );
};

export default AddOnsMicroneedlingErrorNotification;