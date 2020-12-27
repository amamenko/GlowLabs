import React, { useState, useEffect, useCallback } from "react";
import { Redirect, Link } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "react-dropdown";
import AdminCalendarComponent from "./AdminCalendarComponent";
import AdminCreateAppointment from "./AdminCreateAppointment/AdminCreateAppointment";
import AdminPersonalEvent from "./AdminPersonalEvent/AdminPersonalEvent";
import ACTION_ADMIN_APPOINTMENT_TIME from "../../../actions/Admin/AdminCreateAppointment/AdminAppointmentTime/ACTION_ADMIN_APPOINTMENT_TIME";
import ACTION_ADMIN_APPOINTMENT_DATE from "../../../actions/Admin/AdminCreateAppointment/AdminAppointmentDate/ACTION_ADMIN_APPOINTMENT_DATE";
import ACTION_ADMIN_PERSONAL_EVENT_STAFF from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStaff/ACTION_ADMIN_PERSONAL_EVENT_STAFF";
import ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER from "../../../actions/Admin/AdminCreateAppointment/AdminAppointmentStaffMember/ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER";
import ACTION_ADMIN_PERSONAL_EVENT_DATE from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventDate/ACTION_ADMIN_PERSONAL_EVENT_DATE";
import ACTION_ADMIN_PERSONAL_EVENT_START_TIME from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStartTime/ACTION_ADMIN_PERSONAL_EVENT_START_TIME";
import ACTION_ADMIN_PERSONAL_EVENT_END_TIME from "../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventEndTime/ACTION_ADMIN_PERSONAL_EVENT_END_TIME";
import ACTION_ON_ACTIVITY_PAGE_RESET from "../../../actions/Admin/OnActivityPage/ACTION_ON_ACTIVITY_PAGE_RESET";
import "./AdminSchedule.css";
import "../../payment_info/PaymentInfo.css";

const AdminSchedule = (props) => {
  const dispatch = useDispatch();

  const {
    getEmployeesData,
    getEmployeeData,
    getEmployeeError,
    getEmployeesError,
    employeeDataRefetch,
    getEmployeesRefetch,
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
  const [currentScheduleShown, changeCurrentScheduleShown] = useState(
    "My Schedule"
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

  const allEmployeeOptions = useCallback(() => {
    if (getEmployeesData) {
      if (getEmployeesData.employees) {
        const allStaff = getEmployeesData.employees;

        return allStaff.map(
          (staff) =>
            staff.firstName[0].toUpperCase() +
            staff.firstName.slice(1).toLowerCase() +
            " " +
            staff.lastName[0].toUpperCase() +
            staff.lastName.slice(1).toLowerCase()
        );
      }
    }
  }, [getEmployeesData]);

  const renderLoggedInStaffName = () => {
    if (getEmployeeData) {
      if (getEmployeeData.employee) {
        return [
          getEmployeeData.employee.firstName[0].toUpperCase() +
            getEmployeeData.employee.firstName.slice(1).toLowerCase() +
            " " +
            getEmployeeData.employee.lastName[0].toUpperCase() +
            getEmployeeData.employee.lastName.slice(1).toLowerCase(),
        ];
      }
    }
  };

  const renderScheduleSelectionDropdownOptions = () => {
    if (getEmployeeData) {
      if (getEmployeeData.employee) {
        if (getEmployeeData.employee.employeeRole.includes("Admin")) {
          if (getEmployeesData) {
            if (getEmployeesData.employees) {
              const allStaff = getEmployeesData.employees;

              const newArr = ["Salt Cave Schedule"];

              if (allStaff) {
                for (let i = 0; i < allStaff.length; i++) {
                  const loggedInEmployeeFullName =
                    getEmployeeData.employee.firstName[0].toUpperCase() +
                    getEmployeeData.employee.firstName.slice(1).toLowerCase() +
                    " " +
                    getEmployeeData.employee.lastName[0].toUpperCase() +
                    getEmployeeData.employee.lastName.slice(1).toLowerCase();

                  const currentIndexFullName =
                    allStaff[i].firstName[0].toUpperCase() +
                    allStaff[i].firstName.slice(1).toLowerCase() +
                    " " +
                    allStaff[i].lastName[0].toUpperCase() +
                    allStaff[i].lastName.slice(1).toLowerCase();

                  if (loggedInEmployeeFullName === currentIndexFullName) {
                    newArr.unshift("My Schedule");
                  } else {
                    newArr.push(currentIndexFullName + "'s Schedule");
                  }
                }

                return newArr;
              }
            } else {
              return ["My Schedule"];
            }
          } else {
            return ["My Schedule"];
          }
        } else {
          return ["My Schedule"];
        }
      } else {
        return ["My Schedule"];
      }
    } else {
      return ["My Schedule"];
    }
  };

  useEffect(() => {
    if (getEmployeeData) {
      if (getEmployeeData.employee) {
        const currentEmployee = getEmployeeData.employee;

        if (currentScheduleShown === "My Schedule") {
          if (!createAppointmentClicked) {
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
          const currentScheduleEmployee = currentScheduleShown.split("'")[0];
          const currentScheduleFirstName = currentScheduleEmployee.split(
            " "
          )[0];
          const currentScheduleLastName = currentScheduleEmployee.split(" ")[1];

          if (!createAppointmentClicked) {
            dispatch(
              ACTION_ADMIN_APPOINTMENT_STAFF_MEMBER(
                currentScheduleFirstName[0].toUpperCase() +
                  currentScheduleFirstName.slice(1).toLowerCase() +
                  " " +
                  currentScheduleLastName[0].toUpperCase() +
                  currentScheduleLastName.slice(1).toLowerCase()
              )
            );

            dispatch(
              ACTION_ADMIN_PERSONAL_EVENT_STAFF(
                currentScheduleFirstName[0].toUpperCase() +
                  currentScheduleFirstName.slice(1).toLowerCase() +
                  " " +
                  currentScheduleLastName[0].toUpperCase() +
                  currentScheduleLastName.slice(1).toLowerCase()
              )
            );
          }
        }
      }
    }
  }, [
    dispatch,
    getEmployeeData,
    employeeOptions,
    adminAppointmentStaffMember,
    currentScheduleShown,
    createAppointmentClicked,
  ]);

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

  useEffect(() => {
    if (getEmployeeError) {
      employeeDataRefetch();
    }
  }, [getEmployeeError, employeeDataRefetch]);

  useEffect(() => {
    if (getEmployeesError) {
      getEmployeesRefetch();
    }
  }, [getEmployeesError, getEmployeesRefetch]);

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
        {getEmployeeData ? (
          getEmployeeData.employee ? (
            <Dropdown
              options={renderScheduleSelectionDropdownOptions()}
              onChange={(choice) => changeCurrentScheduleShown(choice.value)}
              value={currentScheduleShown}
              controlClassName="react-autosuggest__input"
              className="react-autosuggest__container"
              placeholder={
                currentScheduleShown
                  ? currentScheduleShown
                  : "Choose a Schedule"
              }
              placeholderClassName={
                currentScheduleShown
                  ? "admin_create_appointent_dropdown_placeholder_time"
                  : "admin_create_appointent_dropdown_placeholder_no_time"
              }
            />
          ) : null
        ) : null}
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
        getEmployeeData={getEmployeeData}
        getClientsData={getClientsData}
        getClientsRefetch={getClientsRefetch}
        getAllAppointmentsData={getAllAppointmentsData}
        randomColorArray={randomColorArray}
        getAllAppointmentsRefetch={getAllAppointmentsRefetch}
        timeOptions={timeOptions}
        allEmployeeOptions={allEmployeeOptions}
        changeStopTransition={changeStopTransition}
        stopTransition={stopTransition}
        renderLoggedInStaffName={renderLoggedInStaffName}
      />
      <AdminPersonalEvent
        getAllPersonalEventsRefetch={getAllPersonalEventsRefetch}
        personalEventClicked={personalEventClicked}
        createAppointmentClicked={createAppointmentClicked}
        changePersonalEventClicked={changePersonalEventClicked}
        changeCreateAppointmentClicked={changeCreateAppointmentClicked}
        timeOptions={timeOptions}
        allEmployeeOptions={allEmployeeOptions}
        getEmployeeData={getEmployeeData}
        changeStopTransition={changeStopTransition}
        stopTransition={stopTransition}
        initialScreenSize={initialScreenSize}
        currentScreenSize={currentScreenSize}
        renderLoggedInStaffName={renderLoggedInStaffName}
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
        allEmployeeOptions={allEmployeeOptions}
        timeOptions={timeOptions}
        createAppointmentClicked={createAppointmentClicked}
        personalEventClicked={personalEventClicked}
        currentScheduleShown={currentScheduleShown}
      />
    </div>
  );
};

export default AdminSchedule;
