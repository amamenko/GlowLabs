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
import ACTION_ON_ACTIVITY_PAGE_RESET from "../../../actions/Admin/OnActivityPage/ACTION_ON_ACTIVITY_PAGE_RESET";

const AdminSchedule = (props) => {
  const dispatch = useDispatch();

  const {
    getEmployeesData,
    getEmployeeData,
    resetNotifications,
    initialScreenSize,
    currentScreenSize,
    getClientsData,
    getClientsRefetch,
    randomColorArray,
    getAllAppointmentsData,
    getAllAppointmentsRefetch,
    getAllPersonalEventsData,
    getAllPersonalEventsRefetch,
  } = props;

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
  const onActivityPage = useSelector(
    (state) => state.onActivityPage.on_activity_page
  );
  const adminNotifications = useSelector(
    (state) => state.adminNotifications.notifications
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
    if (getEmployeesData) {
      if (getEmployeesData.employees) {
        const estheticians = getEmployeesData.employees.filter((employee) =>
          employee.employeeRole.includes("Esthetician")
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
  }, [getEmployeesData]);

  useEffect(() => {
    if (getEmployeeData) {
      if (getEmployeeData.employee) {
        if (getEmployeeData.employee.employeeRole.includes("Esthetician")) {
          const currentEmployee = getEmployeeData.employee;

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
  }, [dispatch, getEmployeeData, employeeOptions, adminAppointmentStaffMember]);

  useEffect(() => {
    if (onActivityPage) {
      if (adminNotifications) {
        if (adminNotifications.length > 0) {
          if (adminNotifications.some((item) => item.new)) {
            resetNotifications();
          }
        }
      }
      dispatch(ACTION_ON_ACTIVITY_PAGE_RESET());
    }
  }, [onActivityPage, dispatch, resetNotifications, adminNotifications]);

  // Styles react-big-calendar top header on select days
  useEffect(() => {
    const dayToday = new Date().getDay();

    // If not Saturday or Sunday, adjust header flex attribute
    if (dayToday > 0) {
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
        getClientsData={getClientsData}
        getClientsRefetch={getClientsRefetch}
        getAllAppointmentsData={getAllAppointmentsData}
        randomColorArray={randomColorArray}
        getAllAppointmentsRefetch={getAllAppointmentsRefetch}
        timeOptions={timeOptions}
        employeeOptions={employeeOptions}
        changeStopTransition={changeStopTransition}
        stopTransition={stopTransition}
      />
      <AdminPersonalEvent
        getAllPersonalEventsRefetch={getAllPersonalEventsRefetch}
        personalEventClicked={personalEventClicked}
        createAppointmentClicked={createAppointmentClicked}
        changePersonalEventClicked={changePersonalEventClicked}
        changeCreateAppointmentClicked={changeCreateAppointmentClicked}
        timeOptions={timeOptions}
        employeeOptions={employeeOptions}
        changeStopTransition={changeStopTransition}
        stopTransition={stopTransition}
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
      />
      <AdminCalendarComponent
        getAllAppointmentsData={getAllAppointmentsData}
        getEmployeeData={getEmployeeData}
        getAllPersonalEventsData={getAllPersonalEventsData}
        getAllPersonalEventsRefetch={getAllPersonalEventsRefetch}
        handleCreateAppointmentToggled={handleCreateAppointmentToggled}
        getAllAppointmentsRefetch={getAllAppointmentsRefetch}
        intialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        employeeOptions={employeeOptions}
        timeOptions={timeOptions}
        createAppointmentClicked={createAppointmentClicked}
        personalEventClicked={personalEventClicked}
      />
    </div>
  );
};

export default AdminSchedule;
