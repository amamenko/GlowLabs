import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { IoMdClose, IoMdNotificationsOff, IoMdTime } from "react-icons/io";
import { BsCheck } from "react-icons/bs";
import "./AdminNotifications.css";

const AdminNotifications = (props) => {
  //   const {} = props;

  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );

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
        <h1>NOTIFICATIONS</h1>
      </div>
      <div className="admin_notifications_content_container">
        <div className="admin_individual_notification_container">
          <div className="admin_notification_main_icon_container">
            <BsCheck />
          </div>
          <div className="admin_individual_notification_message_info">
            <p>
              <strong>Ronny Goldberg</strong> has booked an appointment with you
              scheduled for <strong>December 24th, 2020</strong> at{" "}
              <strong>6:30 PM</strong>.
            </p>
            <div className="admin_notification_time_ago">
              <IoMdTime /> 8 hours ago
            </div>
          </div>
        </div>
        <div className="admin_individual_notification_container">
          <div
            className="admin_notification_main_icon_container"
            style={{
              color: "rgb(204, 102, 102)",
              background: "rgba(204, 102, 102, 0.3)",
            }}
          >
            <IoMdClose />
          </div>
          <div className="admin_individual_notification_message_info">
            <p>
              <strong>Ronny Goldberg</strong> has canceled an appointment with
              you scheduled for <strong>December 24th, 2020</strong> at{" "}
              <strong>6:30 PM</strong>.
            </p>
            <div className="admin_notification_time_ago">
              <IoMdTime /> 8 hours ago
            </div>
          </div>
        </div>
        {/* {renderNoNotifications()} */}
      </div>
    </div>
  );
};

export default AdminNotifications;
