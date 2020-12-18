import React from "react";
import { Redirect, Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import AdminSaltCaveCalendarComponent from "./AdminSaltCaveCalendarComponent";
import "./AdminSaltCaveSchedule.css";

const AdminSaltCaveSchedule = (props) => {
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  return (
    <div className="admin_schedule_container">
      {redirectToAdminLogInPage()}
      <div
        className="admin_schedule_header"
        style={{ zIndex: logoutClicked ? 0 : 5 }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_schedule_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>
          SALT CAVE
          {!props.currentScreenSize
            ? props.initialScreenSize >= 1200
              ? " SCHEDULE"
              : null
            : props.currentScreenSize >= 1200
            ? " SCHEDULE"
            : null}
        </h1>
        <AdminSaltCaveCalendarComponent
          getAllAppointmentsData={props.getAllAppointmentsData}
          getEmployeeData={props.getEmployeeData}
        />
      </div>
    </div>
  );
};

export default AdminSaltCaveSchedule;
