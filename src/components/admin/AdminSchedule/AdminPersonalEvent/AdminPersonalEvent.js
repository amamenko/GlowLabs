import React, { useEffect, useState } from "react";
import { Transition } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ACTION_ADMIN_PERSONAL_EVENT_TITLE from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventTitle/ACTION_ADMIN_PERSONAL_EVENT_TITLE";
import ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventAllDay/ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventBlockTime/ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_TITLE_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventTitle/ACTION_ADMIN_PERSONAL_EVENT_TITLE_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_DATE_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventDate/ACTION_ADMIN_PERSONAL_EVENT_DATE_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_STAFF_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStaff/ACTION_ADMIN_PERSONAL_EVENT_STAFF_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_NOTES_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventNotes/ACTION_ADMIN_PERSONAL_EVENT_NOTES_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_START_TIME_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStartTime/ACTION_ADMIN_PERSONAL_EVENT_START_TIME_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_END_TIME_RESET from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventEndTime/ACTION_ADMIN_PERSONAL_EVENT_END_TIME_RESET";
import ACTION_ADMIN_PERSONAL_EVENT_NOTES from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventNotes/ACTION_ADMIN_PERSONAL_EVENT_NOTES";
import ACTION_ADMIN_PERSONAL_EVENT_DATE from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventDate/ACTION_ADMIN_PERSONAL_EVENT_DATE";
import ACTION_ADMIN_PERSONAL_EVENT_START_TIME from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStartTime/ACTION_ADMIN_PERSONAL_EVENT_START_TIME";
import ACTION_ADMIN_PERSONAL_EVENT_END_TIME from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventEndTime/ACTION_ADMIN_PERSONAL_EVENT_END_TIME";
import ACTION_ADMIN_PERSONAL_EVENT_STAFF from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventStaff/ACTION_ADMIN_PERSONAL_EVENT_STAFF";
import { formatDate, parseDate } from "react-day-picker/moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "../AdminCreateAppointment/AdminCreateAppointment.css";
import "./AdminPersonalEvent.css";
import Dropdown from "react-dropdown";

const AdminPersonalEvent = (props) => {
  const {
    personalEventClicked,
    changePersonalEventClicked,
    changeCreateAppointmentClicked,
    timeOptions,
    employeeOptions,
  } = props;

  const dispatch = useDispatch();

  const adminPersonalEventTitle = useSelector(
    (state) => state.adminPersonalEventTitle.title
  );
  const adminPersonalEventNotes = useSelector(
    (state) => state.adminPersonalEventNotes.notes
  );
  const adminPersonalEventDate = useSelector(
    (state) => state.adminPersonalEventDate.date
  );
  const adminPersonalEventStartTime = useSelector(
    (state) => state.adminPersonalEventStartTime.start_time
  );
  const adminPersonalEventEndTime = useSelector(
    (state) => state.adminPersonalEventEndTime.end_time
  );
  const adminPersonalEventStaff = useSelector(
    (state) => state.adminPersonalEventStaff.staff
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [clickOutsideDayPicker, changeClickOutsideDayPicker] = useState(true);

  const handleBackToSchedule = () => {
    changePersonalEventClicked(false);

    dispatch(ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_TITLE_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_DATE_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_STAFF_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_NOTES_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_START_TIME_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_END_TIME_RESET());

    changeClickOutsideDayPicker(false);
  };

  useEffect(() => {
    const dayPickerClickFunction = (e) => {
      if (e.target) {
        if (e.target.placeholder === "Enter your event date here") {
          if (clickOutsideDayPicker) {
            changeClickOutsideDayPicker(false);
          }
        } else if (e.target.getAttribute("class")) {
          if (typeof (e.target.className === "string")) {
            if (!e.target.className.baseVal) {
              if (
                e.target.className.split(" ").includes("DayPicker-Day") ||
                e.target.className.split(" ").includes("DayPicker-NavButton")
              ) {
                if (clickOutsideDayPicker) {
                  changeClickOutsideDayPicker(false);
                }
              } else {
                if (!clickOutsideDayPicker) {
                  changeClickOutsideDayPicker(true);
                }
              }
            } else {
              if (!clickOutsideDayPicker) {
                changeClickOutsideDayPicker(true);
              }
            }
          } else {
            if (!clickOutsideDayPicker) {
              changeClickOutsideDayPicker(true);
            }
          }
        } else {
          if (!clickOutsideDayPicker) {
            changeClickOutsideDayPicker(true);
          }
        }
      }
    };

    window.addEventListener("click", dayPickerClickFunction);

    return () => {
      window.removeEventListener("click", dayPickerClickFunction);
    };
  }, [clickOutsideDayPicker]);

  return (
    <Transition
      items={personalEventClicked}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
    >
      {(personalEventClicked) =>
        personalEventClicked &&
        ((styleprops) => (
          <div
            className="admin_personal_event_container"
            style={{
              ...styleprops,
              zIndex: logoutClicked || loadingSpinnerActive ? 0 : 5,
            }}
          >
            <div
              className="admin_individual_selected_client_back_container"
              onClick={handleBackToSchedule}
            >
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className="admin_individual_selected_client_back_arrow_icon"
              />
              <p>Back to schedule</p>
              <div className="admin_individual_selected_client_top_page_options">
                <p className="admin_individual_selected_client_chosen_create_page">
                  Create Personal Event
                </p>
                <p>/</p>
                <p
                  onClick={() => {
                    changeCreateAppointmentClicked(true);
                    changePersonalEventClicked(false);
                  }}
                >
                  Create Appointment
                </p>
              </div>
            </div>
            <div className="admin_create_appointment_section_header">
              <h2>Personal Event Information</h2>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label">Title</div>
              <div
                role="combobox"
                aria-haspopup="listbox"
                aria-owns="react-autowhatever-1"
                aria-controls="react-autowhatever-1"
                aria-expanded="false"
                className="react-autosuggest__container"
              >
                <input
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="react-autowhatever-1"
                  className="react-autosuggest__input"
                  placeholder={"Create a title for your event"}
                  value={adminPersonalEventTitle}
                  maxLength={200}
                  onChange={(e) =>
                    dispatch(ACTION_ADMIN_PERSONAL_EVENT_TITLE(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label">Notes</div>
              <div
                role="combobox"
                aria-haspopup="listbox"
                aria-owns="react-autowhatever-1"
                aria-controls="react-autowhatever-1"
                aria-expanded="false"
                className="react-autosuggest__container"
              >
                <input
                  type="text"
                  autoComplete="off"
                  aria-autocomplete="list"
                  aria-controls="react-autowhatever-1"
                  className="react-autosuggest__input"
                  placeholder={"Enter optional notes here"}
                  value={adminPersonalEventNotes}
                  maxLength={200}
                  onChange={(e) =>
                    dispatch(ACTION_ADMIN_PERSONAL_EVENT_NOTES(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label">Staff</div>
              <Dropdown
                options={employeeOptions()}
                onChange={(choice) =>
                  dispatch(ACTION_ADMIN_PERSONAL_EVENT_STAFF(choice))
                }
                value={adminPersonalEventStaff}
                controlClassName="react-autosuggest__input"
                className="react-autosuggest__container"
                placeholder={
                  adminPersonalEventStaff
                    ? adminPersonalEventStaff
                    : "Enter staff member with which to associate this personal event"
                }
                placeholderClassName={
                  adminPersonalEventStaff
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : "admin_create_appointent_dropdown_placeholder_no_time"
                }
              />
            </div>
            <div className="admin_create_appointment_section_header">
              <h2>Personal Event Time</h2>
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label">Date</div>
              <DayPickerInput
                classNames={{
                  container: "react-autosuggest__container",
                  overlay: "",
                  overlayWrapper: clickOutsideDayPicker
                    ? "react-autosuggest__input_hide"
                    : "",
                }}
                dayPickerProps={{ disabledDays: { before: new Date() } }}
                inputProps={{
                  className: "react-autosuggest__input",
                  style: {
                    color: "rgb(74, 144, 226)",
                  },
                }}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={(day) =>
                  dispatch(ACTION_ADMIN_PERSONAL_EVENT_DATE(day))
                }
                format="L"
                value={adminPersonalEventDate}
                placeholder="Enter your event date here"
              />
            </div>
            <div className="admin_create_appointment_input_information_container">
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Start Time
              </div>
              <Dropdown
                options={timeOptions()}
                onChange={(choice) =>
                  dispatch(ACTION_ADMIN_PERSONAL_EVENT_START_TIME(choice.value))
                }
                value={adminPersonalEventStartTime}
                controlClassName="react-autosuggest__input"
                className="react-autosuggest__container"
                placeholder={
                  adminPersonalEventStartTime
                    ? adminPersonalEventStartTime
                    : "Start Time"
                }
                placeholderClassName={
                  adminPersonalEventStartTime
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : "admin_create_appointent_dropdown_placeholder_no_time"
                }
              />
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                End Time
              </div>
              <Dropdown
                options={timeOptions()}
                onChange={(choice) =>
                  dispatch(ACTION_ADMIN_PERSONAL_EVENT_END_TIME(choice.value))
                }
                value={adminPersonalEventEndTime}
                controlClassName="react-autosuggest__input"
                className="react-autosuggest__container"
                placeholder={
                  adminPersonalEventEndTime
                    ? adminPersonalEventEndTime
                    : "End Time"
                }
                placeholderClassName={
                  adminPersonalEventEndTime
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : "admin_create_appointent_dropdown_placeholder_no_time"
                }
              />
            </div>
            <div className="admin_square_payment_form_container">
              <div className="sq-payment-form">
                <div className="sq-creditcard">Save Personal Event</div>
              </div>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default AdminPersonalEvent;
