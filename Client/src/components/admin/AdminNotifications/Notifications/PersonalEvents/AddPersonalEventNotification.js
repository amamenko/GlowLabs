import React from "react";
import { BiCalendarPlus } from "react-icons/bi";
import { IoMdTime } from "react-icons/io";
import { format } from "timeago.js";
import moment from "moment";

const AddPersonalEventNotification = (props) => {
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
        background:
          notification.new === true
            ? "rgba(211, 211, 211, 0.3)"
            : "transparent",
      }}
    >
      <div
        className="admin_notification_main_icon_container"
        style={{
          color: "rgb(144, 151, 154)",
          background: "rgba(144, 151, 154, 0.3)",
        }}
      >
        <BiCalendarPlus />
      </div>
      <div className="admin_individual_notification_message_info">
        <p>
          <strong>
            {createdByName === signedInEmployeeName ? "You" : createdByName}
          </strong>{" "}
          added a personal event
          {createdByName === signedInEmployeeName ? (
            " "
          ) : (
            <>
              {" "}
              to{" "}
              {originalAssociatedStaffName === signedInEmployeeName ? (
                <strong>your</strong>
              ) : createdByName === originalAssociatedStaffName ? (
                <strong>their</strong>
              ) : (
                <strong>{`${originalAssociatedStaffName} + 's`}</strong>
              )}{" "}
              calendar{" "}
            </>
          )}
          scheduled for {notification.allDay ? <strong>all day</strong> : null}{" "}
          {notification.allDay ? "on " : null}
          <strong>
            {moment(new Date(notification.date)).format("MMMM Do, YYYY")}
          </strong>
          {notification.allDay ? "." : " at "}
          {notification.allDay ? null : notification.time ? (
            <strong>{notification.time}</strong>
          ) : null}
          {notification.allDay ? null : "."}
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

export default AddPersonalEventNotification;
