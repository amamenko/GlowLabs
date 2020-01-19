import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const MicrocurrentRejuvenateErrorNotification = () => {
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
        <h3>Included with Rejuvenate Facial</h3>
        <p>
          The Microcurrent add-on is included with the Rejuvenate facial
          treatment
        </p>
      </div>
    </div>
  );
};

export default MicrocurrentRejuvenateErrorNotification;
