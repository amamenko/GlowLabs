import React, { useState, useEffect, useCallback } from "react";
import { Redirect, Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import "./AdminSchedule.css";
import AdminCalendarComponent from "./AdminCalendarComponent";
import AdminCreateAppointment from "./AdminCreateAppointment/AdminCreateAppointment";
import ACTION_ADMIN_APPOINTMENT_TIME from "../../../actions/Admin/AdminCreateAppointment/AdminAppointmentTime/ACTION_ADMIN_APPOINTMENT_TIME";
import ACTION_ADMIN_APPOINTMENT_DATE from "../../../actions/Admin/AdminCreateAppointment/AdminAppointmentDate/ACTION_ADMIN_APPOINTMENT_DATE";
import AdminPersonalEvent from "./AdminPersonalEvent/AdminPersonalEvent";
import ACTION_ADMIN_PERSONAL_EVENT_STAFF from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStaff/ACTION_ADMIN_PERSONAL_EVENT_STAFF";
import ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER from "../../../actions/Admin/AdminCreateAppointment/AdminAppointmentStaffMember/ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER";
import ACTION_ADMIN_PERSONAL_EVENT_DATE from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventDate/ACTION_ADMIN_PERSONAL_EVENT_DATE";
import ACTION_ADMIN_PERSONAL_EVENT_START_TIME from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStartTime/ACTION_ADMIN_PERSONAL_EVENT_START_TIME";
import ACTION_ADMIN_PERSONAL_EVENT_END_TIME from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventEndTime/ACTION_ADMIN_PERSONAL_EVENT_END_TIME";

const AdminSchedule = (props) => {
  const dispatch = useDispatch();

  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const adminAuthenticated = useSelector(
    (state) => state.adminAuthenticated.admin_authenticated
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const adminAppointmentStaffMember = useSelector(
    (state) => state.adminAppointmentStaffMember.admin_appointment_staff_member
  );
  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const [createAppointmentClicked, changeCreateAppointmentClicked] = useState(
    false
  );
  const [personalEventClicked, changePersonalEventClicked] = useState(false);
  const [stopTransition, changeStopTransition] = useState(false);

  const timeHeader = document.getElementsByClassName("rbc-time-header-content");

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  const handleCreateAppointmentToggled = (startTime, endTime, date) => {
    changeCreateAppointmentClicked(true);
    dispatch(ACTION_ADMIN_APPOINTMENT_TIME(startTime));
    dispatch(ACTION_ADMIN_APPOINTMENT_DATE(date));

    dispatch(ACTION_ADMIN_PERSONAL_EVENT_START_TIME(startTime));
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_END_TIME(endTime));
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_DATE(date));
  };

  const timeOptions = () => {
    const minutesArr = ["00", "15", "30", "45"];
    const allTimeArr = [];

    for (let i = 0; i < 24; i++) {
      for (let j = 0; j < minutesArr.length; j++) {
        allTimeArr.push(
          (i > 12 ? i - 12 : i === 0 ? "12" : i) +
            ":" +
            minutesArr[j] +
            " " +
            (i > 11 ? "PM" : "AM")
        );
      }
    }

    return allTimeArr;
  };

  const employeeOptions = useCallback(() => {
    if (props.getEmployeesData) {
      if (props.getEmployeesData.employees) {
        const estheticians = props.getEmployeesData.employees.filter(
          (employee) => employee.employeeRole.includes("Esthetician")
        );

        return estheticians.map(
          (esthetician) =>
            esthetician.firstName[0].toUpperCase() +
            esthetician.firstName.slice(1).toLowerCase() +
            " " +
            esthetician.lastName[0].toUpperCase() +
            esthetician.lastName.slice(1).toLowerCase()
        );
      }
    }
  }, [props.getEmployeesData]);

  useEffect(() => {
    if (props.getEmployeeData) {
      if (props.getEmployeeData.employee) {
        if (
          props.getEmployeeData.employee.employeeRole.includes("Esthetician")
        ) {
          const currentEmployee = props.getEmployeeData.employee;

          if (!adminAppointmentStaffMember) {
            dispatch(
              ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER(
                currentEmployee.firstName[0].toUpperCase() +
                  currentEmployee.firstName.slice(1).toLowerCase() +
                  " " +
                  currentEmployee.lastName[0].toUpperCase() +
                  currentEmployee.lastName.slice(1).toLowerCase()
              )
            );

            dispatch(
              ACTION_ADMIN_PERSONAL_EVENT_STAFF(
                currentEmployee.firstName[0].toUpperCase() +
                  currentEmployee.firstName.slice(1).toLowerCase() +
                  " " +
                  currentEmployee.lastName[0].toUpperCase() +
                  currentEmployee.lastName.slice(1).toLowerCase()
              )
            );
          }
        } else {
          dispatch(ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER(employeeOptions()[0]));
        }
      }
    }
  }, [
    dispatch,
    props.getEmployeeData,
    employeeOptions,
    adminAppointmentStaffMember,
  ]);

  // Styles react-big-calendar top header on select days
  useEffect(() => {
    const dayToday = new Date().getDay();

    // If not Saturday or Sunday, adjust header flex attribute
    if (dayToday > 0 && dayToday < 6) {
      if (timeHeader) {
        if (timeHeader[0]) {
          timeHeader[0].style.flex = 1;
        }
      }
    } else {
      if (timeHeader) {
        if (timeHeader[0]) {
          timeHeader[0].style.flex = 0.99;
        }
      }
    }
  }, [timeHeader]);

  return (
    <div className="admin_schedule_container">
      {redirectToAdminLogInPage()}
      <div
        className="admin_schedule_header"
        style={{
          zIndex:
            logoutClicked || loadingSpinnerActive || cancelAppointmentClicked
              ? 0
              : 5,
        }}
      >
        <Link to="/admin/menu">
          <FontAwesomeIcon
            className="admin_schedule_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>SCHEDULE</h1>
      </div>
      <div className="admin_calendar_top_buttons_container">
        <div
          className="admin_calendar_create_personal_event_button"
          onClick={() => changePersonalEventClicked(true)}
        >
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
        personalEventClicked={personalEventClicked}
        createAppointmentClicked={createAppointmentClicked}
        changeCreateAppointmentClicked={changeCreateAppointmentClicked}
        changePersonalEventClicked={changePersonalEventClicked}
        getClientsData={props.getClientsData}
        getClientsRefetch={props.getClientsRefetch}
        getAllAppointmentsData={props.getAllAppointmentsData}
        randomColorArray={props.randomColorArray}
        getAllAppointmentsRefetch={props.getAllAppointmentsRefetch}
        timeOptions={timeOptions}
        employeeOptions={employeeOptions}
        changeStopTransition={changeStopTransition}
        stopTransition={stopTransition}
        getNotificationsRefetch={props.getNotificationsRefetch}
      />
      <AdminPersonalEvent
        getAllPersonalEventsRefetch={props.getAllPersonalEventsRefetch}
        personalEventClicked={personalEventClicked}
        createAppointmentClicked={createAppointmentClicked}
        changePersonalEventClicked={changePersonalEventClicked}
        changeCreateAppointmentClicked={changeCreateAppointmentClicked}
        timeOptions={timeOptions}
        employeeOptions={employeeOptions}
        changeStopTransition={changeStopTransition}
        stopTransition={stopTransition}
        initialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        getNotificationsRefetch={props.getNotificationsRefetch}
      />
      <AdminCalendarComponent
        getAllAppointmentsData={props.getAllAppointmentsData}
        getEmployeeData={props.getEmployeeData}
        getAllPersonalEventsData={props.getAllPersonalEventsData}
        getAllPersonalEventsRefetch={props.getAllPersonalEventsRefetch}
        handleCreateAppointmentToggled={handleCreateAppointmentToggled}
        getAllAppointmentsRefetch={props.getAllAppointmentsRefetch}
        intialScreenSize={props.initialScreenSize}
        currentScreenSize={props.currentScreenSize}
        employeeOptions={employeeOptions}
        timeOptions={timeOptions}
        createAppointmentClicked={createAppointmentClicked}
        personalEventClicked={personalEventClicked}
      />
    </div>
  );
};

export default AdminSchedule;
