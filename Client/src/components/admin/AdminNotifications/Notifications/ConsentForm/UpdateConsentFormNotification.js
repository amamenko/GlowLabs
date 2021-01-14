import React from "react";
import { FaFileMedicalAlt } from "react-icons/fa";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";

const UpdateConsentFormNotification = (props) => {
  const { notification } = props;

  const createdByName =
    notification.createdByFirstName + " " + notification.createdByLastName;

  return (
    <div
      className="admin_individual_notification_container"
      style={{
        background:
          notification.new === true
            ? "rgba(211, 211, 211, 0.3)"
            : "transparent",
      }}
    >
      <div
        className="admin_notification_main_icon_container"
        style={{
          color: "rgb(171, 124, 56)",
          background: "rgba(171, 124, 56, 0.3)",
        }}
      >
        <FaFileMedicalAlt />
      </div>
      <div className="admin_individual_notification_message_info">
        <p>
          <strong>{createdByName}</strong> has an updated consent form.
        </p>
        <div className="admin_notification_time_ago">
          <IoMdTime />{" "}
          {notification.createdAt
            ? format(
                new Date(parseInt(notification._id.substring(0, 8), 16) * 1000)
              )
            : null}
        </div>
      </div>
    </div>
  );
};

export default UpdateConsentFormNotification;
