import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { IoMdNotificationsOff } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import BookAppointmentNotification from "./Notifications/Appointments/BookAppointmentNotification";
import CancelAppointmentNotification from "./Notifications/Appointments/CancelAppointmentNotification";
import ConfirmAppointmentNotification from "./Notifications/Appointments/ConfirmAppointmentNotification";
import RemoveClientNotification from "./Notifications/Clients/RemoveClientNotification";
import AddPersonalEventNotification from "./Notifications/PersonalEvents/AddPersonalEventNotification";
import UpdatePersonalEventNotification from "./Notifications/PersonalEvents/UpdatePersonalEventNotification";
import AddStaffNotification from "./Notifications/Staff/AddStaffNotification";
import DeleteStaffNotification from "./Notifications/Staff/DeleteStaffNotification";
import CancelPersonalEventNotification from "./Notifications/PersonalEvents/CancelPersonalEventNotification";
import "./AdminNotifications.css";
import { css } from "@emotion/css";
import { resetNotificationsMutation } from "../../../graphql/queries/queries";
import { useMutation } from "@apollo/react-hooks";

const AdminNotifications = (props) => {
  const {
    getEmployeeData,
    getNotificationsData,
    getNotificationsLoading,
  } = props;

  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );

  const [resetNotifications] = useMutation(resetNotificationsMutation);

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  const renderNoNotifications = () => {
    return (
      <div className="my_upcoming_appointments_empty_container">
        <IoMdNotificationsOff className="my_upcoming_appointments_empty_calendar_icon" />
        <h2>No notifications</h2>
        <p>You have no notifications to show.</p>
      </div>
    );
  };

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  // Reset notifications on component unmount
  useEffect(() => {
    return () => {
      resetNotifications();
    };
  }, [resetNotifications]);

  return (
    <div className="admin_notifications_container">
      {redirectToAdminLogInPage()}{" "}
      <div
        className="admin_notifications_header"
        style={{
          zIndex: logoutClicked || loadingSpinnerActive ? 0 : 5,
        }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_notifications_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>ACTIVITY</h1>
      </div>
      <div
        className="admin_notifications_content_container"
        style={{ display: getNotificationsLoading ? "flex" : "block" }}
      >
        {getNotificationsLoading || !getEmployeeData ? (
          <ClipLoader
            size={100}
            css={override}
            color={"rgb(44, 44, 52)"}
            loading={getNotificationsLoading}
          />
        ) : getNotificationsData && getEmployeeData ? (
          getNotificationsData.notifications && getEmployeeData.employee ? (
            getNotificationsData.notifications.length > 0 ? (
              getNotificationsData.notifications
                // Sort by most recent first
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((notification, i) => {
                  if (notification.type === "bookAppointment") {
                    return (
                      <BookAppointmentNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "confirmAppointment") {
                    return (
                      <ConfirmAppointmentNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "cancelAppointment") {
                    return (
                      <CancelAppointmentNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "removeClient") {
                    return (
                      <RemoveClientNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "addStaff") {
                    return (
                      <AddStaffNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "deleteStaff") {
                    return (
                      <DeleteStaffNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "addPersonalEvent") {
                    return (
                      <AddPersonalEventNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "updatePersonalEvent") {
                    return (
                      <UpdatePersonalEventNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else if (notification.type === "cancelPersonalEvent") {
                    return (
                      <CancelPersonalEventNotification
                        key={i}
                        notification={notification}
                        employee={getEmployeeData.employee}
                      />
                    );
                  } else {
                    return null;
                  }
                })
            ) : (
              renderNoNotifications()
            )
          ) : (
            renderNoNotifications()
          )
        ) : (
          renderNoNotifications()
        )}
      </div>
    </div>
  );
};

export default AdminNotifications;
