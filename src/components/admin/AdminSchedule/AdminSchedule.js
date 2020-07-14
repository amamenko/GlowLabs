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
  const [selectedAppointmentDate, changeSelectedAppointmentDate] = useState("");
  const [selectedAppointmentTime, changeSelectedAppointmentTime] = useState("");

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  const handleCreateAppointmentToggled = (time, date) => {
    changeCreateAppointmentClicked(true);
    changeSelectedAppointmentTime(time);
    changeSelectedAppointmentDate(date);
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
        getEmployeeData={props.getEmployeeData}
        getEmployeesData={props.getEmployeesData}
        randomColorArray={props.randomColorArray}
        changeSelectedAppointmentTime={changeSelectedAppointmentTime}
        selectedAppointmentTime={selectedAppointmentTime}
        changeSelectedAppointmentDate={changeSelectedAppointmentDate}
        selectedAppointmentDate={selectedAppointmentDate}
      />
      <AdminCalendarComponent
        getAllAppointmentsData={props.getAllAppointmentsData}
        getEmployeeData={props.getEmployeeData}
        handleCreateAppointmentToggled={handleCreateAppointmentToggled}
      />
    </div>
  );
};

export default AdminSchedule;
