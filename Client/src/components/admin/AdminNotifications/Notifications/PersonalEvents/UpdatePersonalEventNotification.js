import React from "react";
import { BiCalendarEdit } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";

const UpdatePersonalEventNotification = (props) => {
  const { notification, employee } = props;

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
          updated a personal event now scheduled for{" "}
          {notification.allDay ? "all day" : null}{" "}
          <strong>{notification.date}</strong>
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
