import React from "react";
import { FiUserPlus } from "react-icons/fi";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";

const AddStaffNotification = (props) => {
  const { notification, employee } = props;

  const originalAssociatedStaffName =
    notification.originalAssociatedStaffFirstName +
    " " +
    notification.originalAssociatedStaffLastName;
  const createdByName =
    notification.createdByFirstName + " " + notification.createdByLastName;
  const signedInEmployeeName = employee.firstName + " " + employee.lastName;

  return (
    <div
      className="admin_individual_notification_container"
      style={{
        background: notification.new
          ? "rgba(211, 211, 211, 0.3)"
          : "transparent",
      }}
    >
      <div className="admin_notification_main_icon_container">
        <FiUserPlus />
      </div>
      <div className="admin_individual_notification_message_info">
        <p>
          <strong>
            {createdByName === signedInEmployeeName ? "You" : createdByName}
          </strong>{" "}
          added <strong>{originalAssociatedStaffName}</strong> as a staff
          member.
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

export default AddStaffNotification;
