import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import "./AdminSchedule.css";
import AdminCalendarComponent from "./AdminCalendarComponent";
import AdminCreateAppointment from "./AdminCreateAppointment/AdminCreateAppointment";

const AdminSchedule = (props) => {
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const [createAppointmentClicked, changeCreateAppointmentClicked] = useState(
    false
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
        <h1>MY SCHEDULE</h1>
      </div>
      <div className="admin_calendar_top_buttons_container">
        <div className="admin_calendar_create_personal_event_button">
          <p>Create Personal Event</p>
        </div>
        <div
          className="admin_calendar_create_appointment_button"
          onClick={() => changeCreateAppointmentClicked(true)}
        >
          <p>Create Appointment</p>
        </div>
      </div>
      <AdminCreateAppointment
        createAppointmentClicked={createAppointmentClicked}
        changeCreateAppointmentClicked={changeCreateAppointmentClicked}
        getClientsData={props.getClientsData}
        randomColorArray={props.randomColorArray}
      />
      <AdminCalendarComponent
        getAllAppointmentsData={props.getAllAppointmentsData}
        getEmployeeData={props.getEmployeeData}
      />
    </div>
  );
};

export default AdminSchedule;
