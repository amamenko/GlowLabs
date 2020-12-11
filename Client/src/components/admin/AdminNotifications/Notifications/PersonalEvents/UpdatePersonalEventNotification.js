import React from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";
import moment from "moment";

const UpdatePersonalEventNotification = (props) => {
  const { notification, employee } = props;

  const createdByName =
    notification.createdByFirstName + " " + notification.createdByLastName;
  const originalAssociatedStaffName =
    notification.originalAssociatedStaffFirstName +
    " " +
    notification.originalAssociatedStaffLastName;
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
      <div
        className="admin_notification_main_icon_container"
        style={{
          color: "rgb(171, 124, 56)",
          background: "rgba(171, 124, 56, 0.3)",
        }}
      >
        <BiCalendarEdit />
      </div>
      <div className="admin_individual_notification_message_info">
        <p>
          <strong>
            {createdByName === signedInEmployeeName ? "You" : createdByName}
          </strong>{" "}
          updated a personal event
          {createdByName === signedInEmployeeName
            ? " "
            : ` in ${
                originalAssociatedStaffName === signedInEmployeeName
                  ? "your"
                  : originalAssociatedStaffName + "'s"
              } calendar `}
          now scheduled for {notification.allDay ? "all day" : null}{" "}
          <strong>
            {moment(notification.date, "L").format("MMMM Do, YYYY")}
          </strong>
          {notification.allDay ? "." : " at "}
          {notification.allDay ? null : notification.time ? (
            <strong>{notification.time}</strong>
          ) : null}
          {notification.allDay ? null : "."}
        </p>
        <div className="admin_notification_time_ago">
          <IoMdTime />{" "}
          {notification.createdAt ? format(notification.createdAt) : null}
        </div>
      </div>
    </div>
  );
};

export default UpdatePersonalEventNotification;
