import React, { useEffect, useState, useCallback } from "react";
import { Transition, Spring } from "react-spring/renderprops";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { formatDate, parseDate } from "react-day-picker/moment";
import DayPickerInput from "react-day-picker/DayPickerInput";
import Dropdown from "react-dropdown";
import { useMutation } from "@apollo/react-hooks";
import addPersonalEventMutation from "../../../../graphql/mutations/addPersonalEventMutation";
import Modal from "react-modal";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/css";
import moment from "moment";
import ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventAllDay/ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY";
import ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME from "../../../../actions/Admin/AdminPersonalEvent/AdminPersonalEventBlockTime/ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";
import ACTION_LOADING_SPINNER_RESET from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
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
import "../AdminCreateAppointment/AdminCreateAppointment.css";
import "./AdminPersonalEvent.css";

const AdminPersonalEvent = (props) => {
  const {
    stopTransition,
    personalEventClicked,
    changeStopTransition,
    changePersonalEventClicked,
    changeCreateAppointmentClicked,
    timeOptions,
    allEmployeeOptions,
    getEmployeeData,
    getAllPersonalEventsRefetch,
    renderLoggedInStaffName,
  } = props;

  const dispatch = useDispatch();

  const adminPersonalEventTitle = useSelector(
    (state) => state.adminPersonalEventTitle.title
  );
  const adminPersonalEventNotes = useSelector(
    (state) => state.adminPersonalEventNotes.notes
  );
  const adminPersonalEventAllDay = useSelector(
    (state) => state.adminPersonalEventAllDay.all_day
  );
  const adminPersonalEventBlockTime = useSelector(
    (state) => state.adminPersonalEventBlockTime.block_time
  );
  const adminPersonalEventDate = useSelector(
    (state) => state.adminPersonalEventDate.date
  );
  const adminAppointmentDate = useSelector(
    (state) => state.adminAppointmentDate.admin_appointment_date
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
  const adminAppointmentStaffMember = useSelector(
    (state) => state.adminAppointmentStaffMember.admin_appointment_staff_member
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
  );

  const [clickOutsideDayPicker, changeClickOutsideDayPicker] = useState(true);
  const [pageOpened, changePageOpened] = useState(false);

  // Errors
  const [titleError, changeTitleError] = useState(false);
  const [dateError, changeDateError] = useState(false);
  const [startTimeError, changeStartTimeError] = useState(false);
  const [endTimeError, changeEndTimeError] = useState(false);
  const [staffError, changeStaffError] = useState(false);

  const [
    addPersonalEvent,
    { loading: personalEventLoading, data: personalEventData },
  ] = useMutation(addPersonalEventMutation);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  useEffect(() => {
    changePageOpened(true);
    const pageNowOpen = setTimeout(() => {
      changePageOpened(false);
    }, 500);
    return () => {
      clearTimeout(pageNowOpen);
    };
  }, []);

  const resetErrorStates = useCallback(() => {
    if (titleError) {
      changeTitleError(false);
    }

    if (dateError) {
      changeDateError(false);
    }

    if (staffError) {
      changeStaffError(false);
    }

    if (startTimeError) {
      changeStartTimeError(false);
    }

    if (endTimeError) {
      changeEndTimeError(false);
    }
  }, [dateError, endTimeError, staffError, startTimeError, titleError]);

  const handleBackToSchedule = useCallback(() => {
    changePersonalEventClicked(false);

    dispatch(ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_TITLE_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_DATE_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_STAFF_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_NOTES_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_START_TIME_RESET());
    dispatch(ACTION_ADMIN_PERSONAL_EVENT_END_TIME_RESET());
    dispatch(ACTION_LOADING_SPINNER_RESET());

    changeClickOutsideDayPicker(false);

    resetErrorStates();
  }, [changePersonalEventClicked, dispatch, resetErrorStates]);

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

  const handleAllDayToggle = () => {
    if (adminPersonalEventAllDay) {
      dispatch(ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY_RESET());
    } else {
      dispatch(ACTION_ADMIN_PERSONAL_EVENT_ALL_DAY());
    }
  };

  const handleBlockTimeToggle = () => {
    if (adminPersonalEventBlockTime) {
      dispatch(ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME_RESET());
    } else {
      dispatch(ACTION_ADMIN_PERSONAL_EVENT_BLOCK_TIME());
    }
  };

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {(styles) => (
          <svg
            width="100%"
            style={{
              display: "block",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={pageOpened ? 0 : `${styles.x}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        )}
      </Spring>
    );
  };

  const calculateDuration = (start, end) => {
    const startTime = moment.utc(start, "h:mm A");
    const endTime = moment.utc(end, "h:mm A");

    return endTime.diff(startTime, "minutes");
  };

  const handleSavePersonalEvent = () => {
    if (
      adminPersonalEventTitle &&
      (adminPersonalEventDate || adminAppointmentDate) &&
      adminPersonalEventStartTime &&
      adminPersonalEventEndTime &&
      (adminAppointmentStaffMember || adminPersonalEventStaff)
    ) {
      addPersonalEvent({
        variables: {
          title: adminPersonalEventTitle,
          date:
            adminAppointmentDate && !adminPersonalEventDate
              ? adminAppointmentDate
              : adminPersonalEventDate,
          startTime: adminPersonalEventStartTime,
          endTime: adminPersonalEventEndTime,
          duration: calculateDuration(
            adminPersonalEventStartTime,
            adminPersonalEventEndTime
          ),
          staff:
            adminAppointmentStaffMember && !adminPersonalEventStaff
              ? adminAppointmentStaffMember.value
                ? adminAppointmentStaffMember.value
                : adminAppointmentStaffMember
              : adminPersonalEventStaff.value
              ? adminPersonalEventStaff.value
              : adminPersonalEventStaff,
          notes: adminPersonalEventNotes,
          allDay: adminPersonalEventAllDay,
          blockTime: adminPersonalEventBlockTime,
        },
      });
    } else {
      if (!adminPersonalEventTitle) {
        changeTitleError(true);
      }
      if (!(adminPersonalEventDate || adminAppointmentDate)) {
        changeDateError(true);
      }
      if (!adminPersonalEventStartTime) {
        changeStartTimeError(true);
      }
      if (!adminPersonalEventEndTime) {
        changeEndTimeError(true);
      }
      if (!(adminAppointmentStaffMember || adminPersonalEventStaff)) {
        changeStaffError(true);
      }
    }
  };

  useEffect(() => {
    if (personalEventData) {
      const loadingFunction = setTimeout(() => {
        handleBackToSchedule();
        getAllPersonalEventsRefetch();
      }, 2000);
      return () => {
        clearTimeout(loadingFunction);
      };
    }
  }, [
    handleBackToSchedule,
    personalEventData,
    loadingSpinnerActive,
    getAllPersonalEventsRefetch,
  ]);

  useEffect(() => {
    if (personalEventLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [personalEventLoading, dispatch]);

  return (
    <Transition
      items={personalEventClicked}
      from={{ transform: "translateX(-100%)" }}
      enter={{ transform: "translateX(0%)" }}
      leave={{ transform: "translateX(-100%)" }}
      config={{ duration: 200 }}
      immediate={stopTransition}
    >
      {(personalEventClicked) =>
        personalEventClicked &&
        ((styleprops) => (
          <div
            className="admin_personal_event_container"
            style={{
              ...styleprops,
              zIndex: logoutClicked || loadingSpinnerActive ? "auto" : 5,
            }}
          >
            <Modal
              isOpen={loadingSpinnerActive}
              className="cancel_appointment_modal"
              style={{
                content: {
                  position: "fixed",
                  zIndex: 10000,
                  opacity: 0.99,
                  height: "100%",
                  backdropFilter: "blur(5px)",
                  WebkitBackdropFilter: "blur(5px)",
                  paddingBottom: "10%",
                  borderRadius: "none",
                  width: "100vw",
                  top: "0",
                  left: "0",
                  right: "0",
                  bottom: "0",
                  border: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(0, 0, 0, 0.5)",
                },
              }}
            >
              <BounceLoader
                size={100}
                css={override}
                color={"rgb(44, 44, 52)"}
                loading={loadingSpinnerActive}
              />
            </Modal>
            <div className="admin_individual_selected_client_back_container">
              <FontAwesomeIcon
                icon={faLongArrowAltLeft}
                className="admin_individual_selected_client_back_arrow_icon"
                onClick={handleBackToSchedule}
              />
              <p onClick={handleBackToSchedule}>Back to schedule</p>
              <div className="admin_individual_selected_client_top_page_options">
                <p className="admin_individual_selected_client_chosen_create_page">
                  Create Personal Event
                </p>
                <p>/</p>
                <p
                  onClick={() => {
                    changePersonalEventClicked(false);
                    changeCreateAppointmentClicked(true);
                    changeStopTransition(true);
                    setTimeout(() => {
                      changeStopTransition(false);
                    }, 1000);
                    resetErrorStates();
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
                style={{
                  outline: titleError ? "3px solid red" : "none",
                  zIndex: titleError ? 99999 : "auto",
                }}
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
                  onChange={(e) => {
                    resetErrorStates();
                    dispatch(ACTION_ADMIN_PERSONAL_EVENT_TITLE(e.target.value));
                  }}
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
                options={
                  getEmployeeData
                    ? getEmployeeData.employee
                      ? getEmployeeData.employee.employeeRole.includes("Admin")
                        ? allEmployeeOptions()
                        : renderLoggedInStaffName()
                      : renderLoggedInStaffName()
                    : renderLoggedInStaffName()
                }
                onChange={(choice) => {
                  resetErrorStates();
                  dispatch(ACTION_ADMIN_PERSONAL_EVENT_STAFF(choice));
                }}
                value={
                  adminAppointmentStaffMember && !adminPersonalEventStaff
                    ? adminAppointmentStaffMember
                    : adminPersonalEventStaff
                }
                controlClassName={
                  staffError
                    ? "react-autosuggest__input personal_event_error"
                    : "react-autosuggest__input"
                }
                className="react-autosuggest__container"
                placeholder={
                  adminAppointmentStaffMember && !adminPersonalEventStaff
                    ? adminAppointmentStaffMember
                    : adminPersonalEventStaff
                    ? adminPersonalEventStaff
                    : "Enter staff member with which to associate this personal event"
                }
                placeholderClassName={
                  adminAppointmentStaffMember && !adminPersonalEventStaff
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : adminPersonalEventStaff
                    ? "admin_create_appointent_dropdown_placeholder_time"
                    : "admin_create_appointent_dropdown_placeholder_no_time"
                }
                style={{
                  outline: staffError ? "3px solid red" : "none",
                  zIndex: staffError ? 99999 : "auto",
                }}
              />
            </div>
            <div className="admin_create_appointment_section_header">
              <h2>Personal Event Time</h2>

              <div className="admin_personal_event_checkbox_container">
                <p>All day?</p>
                <span
                  className="fa-layers fa-fw client_consent_form_checkbox"
                  onClick={handleAllDayToggle}
                >
                  <FontAwesomeIcon
                    color="rgba(155, 155, 155, 0.4)"
                    transform="grow-10"
                    icon={faSquare}
                  />
                  {adminPersonalEventAllDay ? checkMark() : null}
                </span>
                <p>Block time?</p>
                <span
                  className="fa-layers fa-fw client_consent_form_checkbox"
                  onClick={handleBlockTimeToggle}
                >
                  <FontAwesomeIcon
                    color="rgba(155, 155, 155, 0.4)"
                    transform="grow-10"
                    icon={faSquare}
                  />
                  {adminPersonalEventBlockTime ? checkMark() : null}
                </span>
              </div>
            </div>
            <div
              className="admin_create_appointment_input_information_container"
              onClick={() => resetErrorStates()}
            >
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
                  className: dateError
                    ? "react-autosuggest__input personal_event_error"
                    : "react-autosuggest__input",
                  style: {
                    color: "rgb(74, 144, 226)",
                  },
                }}
                formatDate={formatDate}
                parseDate={parseDate}
                onDayChange={(day) => {
                  resetErrorStates();
                  dispatch(ACTION_ADMIN_PERSONAL_EVENT_DATE(day));
                }}
                format="L"
                value={
                  adminAppointmentDate && !adminPersonalEventDate
                    ? adminAppointmentDate
                    : adminPersonalEventDate
                }
                placeholder="Enter your event date here"
              />
            </div>
            <div
              className="admin_create_appointment_input_information_container"
              onClick={() => resetErrorStates()}
            >
              <div className="admin_create_appointment_label admin_create_appointment_double_label">
                Start Time
              </div>
              <Dropdown
                options={timeOptions()}
                onChange={(choice) => {
                  resetErrorStates();
                  dispatch(
                    ACTION_ADMIN_PERSONAL_EVENT_START_TIME(choice.value)
                  );
                }}
                value={adminPersonalEventStartTime}
                controlClassName={
                  startTimeError
                    ? "react-autosuggest__input personal_event_error"
                    : "react-autosuggest__input"
                }
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
                onChange={(choice) => {
                  resetErrorStates();
                  dispatch(ACTION_ADMIN_PERSONAL_EVENT_END_TIME(choice.value));
                }}
                value={adminPersonalEventEndTime}
                controlClassName={
                  endTimeError
                    ? "react-autosuggest__input personal_event_error"
                    : "react-autosuggest__input"
                }
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
                style={{
                  outline: endTimeError ? "3px solid red" : "none",
                  zIndex: endTimeError ? 99999 : "auto",
                }}
              />
            </div>
            <div className="admin_square_payment_form_container">
              <div className="sq-payment-form">
                <div
                  className="sq-creditcard"
                  onClick={handleSavePersonalEvent}
                >
                  Save Personal Event
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </Transition>
  );
};

export default AdminPersonalEvent;
