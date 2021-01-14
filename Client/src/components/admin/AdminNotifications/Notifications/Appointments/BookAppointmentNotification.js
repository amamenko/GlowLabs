import React from "react";
import { BiCalendarPlus } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";

const BookAppointmentNotification = (props) => {
  const { notification, employee } = props;

  const associatedClientName =
    notification.associatedClientFirstName +
    " " +
    notification.associatedClientLastName;
  const createdByName =
    notification.createdByFirstName + " " + notification.createdByLastName;
  const signedInEmployeeName = employee.firstName + " " + employee.lastName;

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
          color: "rgb(51, 153, 204)",
          background: "rgba(51, 153, 204, 0.3)",
        }}
      >
        <BiCalendarPlus />
      </div>
      <div className="admin_individual_notification_message_info">
        <p>
          <strong>
            {createdByName === signedInEmployeeName
              ? "You"
              : createdByName === associatedClientName
              ? associatedClientName
              : createdByName}
          </strong>{" "}
          booked an appointment
          {createdByName !== signedInEmployeeName &&
          createdByName !== associatedClientName ? (
            <strong> for {associatedClientName} </strong>
          ) : (
            " "
          )}
          with{" "}
          <strong>
            {createdByName === signedInEmployeeName
              ? associatedClientName
              : createdByName === associatedClientName
              ? "you"
              : "you"}
          </strong>{" "}
          scheduled for <strong>{notification.date}</strong> at{" "}
          <strong>{notification.time}</strong>.
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

export default BookAppointmentNotification;
