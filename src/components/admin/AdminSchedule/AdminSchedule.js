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
  const [createAppointmentClicked, changeCreateAppointmentClicked] = useState(
    false
  );
  const [personalEventClicked, changePersonalEventClicked] = useState(false);

  const redirectToAdminLogInPage = () => {
    if (!adminAuthenticated) {
      return <Redirect to="/admin" />;
    }
  };

  const handleCreateAppointmentToggled = (time, date) => {
    changeCreateAppointmentClicked(true);
    dispatch(ACTION_ADMIN_APPOINTMENT_TIME(time));
    dispatch(ACTION_ADMIN_APPOINTMENT_DATE(date));
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

  return (
    <div className="admin_schedule_container">
      {redirectToAdminLogInPage()}
      <div
        className="admin_schedule_header"
        style={{ zIndex: logoutClicked || loadingSpinnerActive ? 0 : 5 }}
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
      />
      <AdminPersonalEvent
        personalEventClicked={personalEventClicked}
        changePersonalEventClicked={changePersonalEventClicked}
        changeCreateAppointmentClicked={changeCreateAppointmentClicked}
        timeOptions={timeOptions}
        employeeOptions={employeeOptions}
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
