import React, { useEffect, useCallback, useState } from "react";
import { Transition, Spring } from "react-spring/renderprops";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLongArrowAltLeft,
  faTimes,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/css";
import { useMutation } from "@apollo/react-hooks";
import updatePersonalEventMutation from "../../../../graphql/mutations/updatePersonalEventMutation";
import deletePersonalEventMutation from "../../../../graphql/mutations/deletePersonalEventMutation";
import Dropdown from "react-dropdown";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { formatDate, parseDate } from "react-day-picker/moment";
import ACTION_CANCEL_APPOINTMENT_CLICKED_RESET from "../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED_RESET";
import ACTION_CANCEL_APPOINTMENT_CLICKED from "../../../../actions/CancelAppointmentClicked/ACTION_CANCEL_APPOINTMENT_CLICKED";
import ACTION_LOADING_SPINNER_RESET from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_RESET";
import ACTION_LOADING_SPINNER_ACTIVE from "../../../../actions/LoadingSpinner/ACTION_LOADING_SPINNER_ACTIVE";

const AdminSelectedPersonalEvent = React.forwardRef((props, ref) => {
  const {
    getAllPersonalEventsData,
    currentToggledAppointment,
    handleAppointmentUntoggled,
    changeCurrentToggledAppointment,
    getAllPersonalEventsRefetch,
    currentScreenSize,
    initialScreenSize,
    allEmployeeOptions,
    timeOptions,
  } = props;
  const { selectedAppointmentBackRef, backToAppointmentsRef } = ref;

  const [
    deletePersonalEvent,
    { loading: deleteLoading, data: deleteData },
  ] = useMutation(deletePersonalEventMutation);

  const [
    updatePersonalEvent,
    { loading: updateLoading, data: updateData },
  ] = useMutation(updatePersonalEventMutation);

  const dispatch = useDispatch();

  const cancelAppointmentClicked = useSelector(
    (state) => state.cancelAppointmentClicked.cancelAppointmentClicked
  );
  const loadingSpinnerActive = useSelector(
    (state) => state.loadingSpinnerActive.loading_spinner
  );

  const [clickOutsideDayPicker, changeClickOutsideDayPicker] = useState(true);
  const [pageOpened, changePageOpened] = useState(false);

  const [personalEventTitle, changePersonalEventTitle] = useState("");
  const [titleError, changeTitleError] = useState(false);

  const [personalEventNotes, changePersonalEventNotes] = useState("");
  const [personalEventStaff, changePersonalEventStaff] = useState("");
  const [personalEventDate, changePersonalEventDate] = useState("");
  const [personalEventStartTime, changePersonalEventStartTime] = useState("");
  const [personalEventEndTime, changePersonalEventEndTime] = useState("");
  const [personalEventBlockTime, changePersonalEventBlockTime] = useState(
    false
  );
  const [personalEventAllDay, changePersonalEventAllDay] = useState(false);

  const override = css`
    display: block;
    position: absolute;
    left: 25%;
    right: 25%;
  `;

  const handleCancelPersonalEvent = (item) => {
    deletePersonalEvent({
      variables: { _id: item },
    });
  };

  const calculateDuration = (start, end) => {
    const startTime = moment(start, "h:mm A");
    const endTime = moment(end, "h:mm A");

    const totalDuration = moment.duration(endTime.diff(startTime));
    const durationAsMinutes = parseInt(totalDuration.asMinutes()) % 60;

    return durationAsMinutes;
  };

  const handleUpdatePersonalEvent = () => {
    updatePersonalEvent({
      variables: {
        _id: currentToggledAppointment,
        title: personalEventTitle,
        notes: personalEventNotes,
        staff: personalEventStaff,
        date: personalEventDate,
        startTime: personalEventStartTime,
        endTime: personalEventEndTime,
        duration: calculateDuration(
          personalEventStartTime,
          personalEventEndTime
        ),
        allDay: personalEventAllDay,
        blockTime: personalEventBlockTime,
      },
    });
  };

  const resetStatesAfterLoading = useCallback(() => {
    getAllPersonalEventsRefetch();
    dispatch(ACTION_LOADING_SPINNER_RESET());
    dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET());
    changeCurrentToggledAppointment(false);
  }, [dispatch, changeCurrentToggledAppointment, getAllPersonalEventsRefetch]);

  useEffect(() => {
    changePageOpened(true);
    const pageNowOpen = setTimeout(() => {
      changePageOpened(false);
    }, 500);
    return () => {
      clearTimeout(pageNowOpen);
    };
  }, []);

  useEffect(() => {
    if (deleteData || updateData) {
      const loadingFunction = setTimeout(() => resetStatesAfterLoading(), 2000);
      return () => {
        clearTimeout(loadingFunction);
      };
    }
  }, [deleteData, resetStatesAfterLoading, updateData]);

  useEffect(() => {
    if (deleteLoading || updateLoading) {
      dispatch(ACTION_LOADING_SPINNER_ACTIVE());
    }
  }, [deleteLoading, deleteData, dispatch, updateLoading]);

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

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {(styles) => (
          <svg
            width="100%"
            style={{
              marginTop:
                currentScreenSize === ""
                  ? initialScreenSize >= 1800
                    ? "-0.2rem"
                    : initialScreenSize >= 1600
                    ? "-0.2rem"
                    : initialScreenSize >= 1200
                    ? "-0.5rem"
                    : initialScreenSize >= 360
                    ? "-0.5rem"
                    : "0rem"
                  : currentScreenSize >= 1800
                  ? "-0.2rem"
                  : currentScreenSize >= 1600
                  ? "-0.2rem"
                  : currentScreenSize >= 1200
                  ? "-0.5rem"
                  : currentScreenSize >= 360
                  ? "-0.5rem"
                  : "0rem",
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

  useEffect(() => {
    if (getAllPersonalEventsData) {
      if (
        getAllPersonalEventsData.all_personal_events.find(
          (x) => x._id === currentToggledAppointment
        )
      ) {
        const personalEventObj = getAllPersonalEventsData.all_personal_events.find(
          (x) => x._id === currentToggledAppointment
        );

        changePersonalEventNotes(personalEventObj.notes);
        changePersonalEventStaff(personalEventObj.staff);
        changePersonalEventDate(personalEventObj.date);
        changePersonalEventStartTime(personalEventObj.startTime);
        changePersonalEventEndTime(personalEventObj.endTime);
        changePersonalEventBlockTime(personalEventObj.blockTime);
        changePersonalEventAllDay(personalEventObj.allDay);
        changePersonalEventTitle(personalEventObj.title);
      }
    }
  }, [currentToggledAppointment, getAllPersonalEventsData]);

  return (
    <>
      <Modal
        isOpen={
          (cancelAppointmentClicked &&
            currentToggledAppointment ===
              (getAllPersonalEventsData.all_personal_events.filter(
                (x) => x._id === currentToggledAppointment
              )[0]
                ? getAllPersonalEventsData.all_personal_events.filter(
                    (x) => x._id === currentToggledAppointment
                  )[0]._id
                : null)) ||
          loadingSpinnerActive
        }
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
        <Transition
          items={cancelAppointmentClicked && !loadingSpinnerActive}
          from={{ transform: "translate3d(0, -65%, 0)" }}
          enter={{ transform: "translate3d(0, 0, 0)" }}
          leave={{ display: "none" }}
        >
          {(cancelAppointmentClicked) =>
            cancelAppointmentClicked &&
            ((styleprops) => (
              <div
                className="cancel_appointment_modal_content_container"
                style={styleprops}
              >
                <div className="log_out_modal_contents admin_cancel_appointment">
                  <FontAwesomeIcon
                    className="modal_x"
                    icon={faTimes}
                    onClick={() =>
                      dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET())
                    }
                  />
                  <h2>Are you sure you want to cancel this personal event?</h2>
                  <span className="logout_buttons_container">
                    <div
                      className="logout_button yes_cancel_appointment_button"
                      onClick={() =>
                        handleCancelPersonalEvent(currentToggledAppointment)
                      }
                    >
                      <p>YES, CANCEL</p>
                    </div>
                    <div
                      className="cancel_logout_button no_dont_cancel_appointment_button"
                      onClick={() =>
                        dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED_RESET())
                      }
                    >
                      <p>NO, GO BACK</p>
                    </div>
                  </span>
                </div>
              </div>
            ))
          }
        </Transition>
      </Modal>
      <Transition
        items={currentToggledAppointment}
        from={{ transform: "translateX(-100%)" }}
        enter={{ transform: "translateX(0%)" }}
        leave={{ transform: "translateX(-100%)" }}
        config={{ duration: 200 }}
      >
        {(currentToggledAppointment) =>
          currentToggledAppointment ===
            (getAllPersonalEventsData
              ? getAllPersonalEventsData.all_personal_events.find(
                  (x) => x._id === currentToggledAppointment
                )
                ? getAllPersonalEventsData.all_personal_events.find(
                    (x) => x._id === currentToggledAppointment
                  )._id
                : null
              : null) &&
          ((styleprops) => (
            <div
              className="admin_side_schedule_calendar_individual_selected_appointment_container"
              style={styleprops}
            >
              <div className="my_individual_selected_appointment_back_container">
                <div
                  className="back_to_schedule_designator"
                  ref={selectedAppointmentBackRef}
                  onClick={(e) => handleAppointmentUntoggled(e)}
                >
                  <FontAwesomeIcon
                    icon={faLongArrowAltLeft}
                    className="my_individual_selected_appointment_back_arrow_icon"
                  />

                  <p>Back to schedule</p>
                </div>
                <div className="admin_individual_selected_client_top_page_options">
                  <div className="admin_square_payment_form_container">
                    <div className="sq-payment-form">
                      <div
                        className="sq-creditcard"
                        onClick={handleUpdatePersonalEvent}
                      >
                        Save Personal Event
                      </div>
                    </div>
                  </div>
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
                    value={personalEventTitle}
                    maxLength={200}
                    onChange={(e) => {
                      if (titleError) {
                        changeTitleError(false);
                      }
                      changePersonalEventTitle(e.target.value);
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
                    value={personalEventNotes}
                    maxLength={200}
                    onChange={(e) => changePersonalEventNotes(e.target.value)}
                  />
                </div>
              </div>
              <div className="admin_create_appointment_input_information_container">
                <div className="admin_create_appointment_label">Staff</div>
                <Dropdown
                  options={allEmployeeOptions()}
                  onChange={(choice) => {
                    if (titleError) {
                      changeTitleError(false);
                    }
                    changePersonalEventStaff(choice);
                  }}
                  value={personalEventStaff}
                  controlClassName={"react-autosuggest__input"}
                  className="react-autosuggest__container"
                  placeholder={
                    personalEventStaff
                      ? personalEventStaff
                      : "Enter staff member with which to associate this personal event"
                  }
                  placeholderClassName={
                    personalEventStaff
                      ? "admin_create_appointent_dropdown_placeholder_time"
                      : "admin_create_appointent_dropdown_placeholder_no_time"
                  }
                />
              </div>
              <div className="admin_create_appointment_section_header">
                <h2>Personal Event Time</h2>

                <div className="admin_personal_event_checkbox_container">
                  <p>All day?</p>
                  <span
                    className="fa-layers fa-fw client_consent_form_checkbox"
                    onClick={() =>
                      changePersonalEventAllDay(!personalEventAllDay)
                    }
                  >
                    <FontAwesomeIcon
                      color="rgba(155, 155, 155, 0.4)"
                      transform="grow-10"
                      icon={faSquare}
                    />
                    {personalEventAllDay ? checkMark() : null}
                  </span>
                  <p>Block time?</p>
                  <span
                    className="fa-layers fa-fw client_consent_form_checkbox"
                    onClick={() =>
                      changePersonalEventBlockTime(!personalEventBlockTime)
                    }
                  >
                    <FontAwesomeIcon
                      color="rgba(155, 155, 155, 0.4)"
                      transform="grow-10"
                      icon={faSquare}
                    />
                    {personalEventBlockTime ? checkMark() : null}
                  </span>
                </div>
              </div>
              <div
                className="admin_create_appointment_input_information_container"
                onClick={() => {
                  if (titleError) {
                    changeTitleError(false);
                  }
                }}
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
                    className: "react-autosuggest__input",
                    style: {
                      color: "rgb(74, 144, 226)",
                    },
                  }}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  onDayChange={(day) => {
                    if (titleError) {
                      changeTitleError(false);
                    }
                    changePersonalEventDate(day);
                  }}
                  format="L"
                  value={personalEventDate}
                  placeholder="Enter your event date here"
                />
              </div>
              <div
                className="admin_create_appointment_input_information_container"
                onClick={() => {
                  if (titleError) {
                    changeTitleError(false);
                  }
                }}
              >
                <div className="admin_create_appointment_label admin_create_appointment_double_label">
                  Start Time
                </div>
                <Dropdown
                  options={timeOptions()}
                  onChange={(choice) => {
                    if (titleError) {
                      changeTitleError(false);
                    }
                    changePersonalEventStartTime(choice.value);
                  }}
                  value={personalEventStartTime}
                  controlClassName={"react-autosuggest__input"}
                  className="react-autosuggest__container"
                  placeholder={
                    personalEventStartTime
                      ? personalEventStartTime
                      : "Start Time"
                  }
                  placeholderClassName={
                    personalEventStartTime
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
                    if (titleError) {
                      changeTitleError(false);
                    }
                    changePersonalEventEndTime(choice.value);
                  }}
                  value={personalEventEndTime}
                  controlClassName={"react-autosuggest__input"}
                  className="react-autosuggest__container"
                  placeholder={
                    personalEventEndTime ? personalEventEndTime : "End Time"
                  }
                  placeholderClassName={
                    personalEventEndTime
                      ? "admin_create_appointent_dropdown_placeholder_time"
                      : "admin_create_appointent_dropdown_placeholder_no_time"
                  }
                />
              </div>

              <div className="selected_appointments_bottom_buttons_container">
                {moment(
                  getAllPersonalEventsData.all_personal_events.filter(
                    (x) => x._id === currentToggledAppointment
                  )[0].date,
                  "MMMM D, YYYY"
                ).format("MMMM D, YYYY") < moment().format("MMMM D, YYYY") ? (
                  <div
                    className="cancel_appointment_button"
                    onClick={() =>
                      dispatch(ACTION_CANCEL_APPOINTMENT_CLICKED())
                    }
                  >
                    <p>Cancel Personal Event</p>
                  </div>
                ) : null}
                <div
                  className="back_to_all_appointments_button"
                  ref={backToAppointmentsRef}
                  onClick={(e) => handleAppointmentUntoggled(e)}
                >
                  <p>Back to Appointments</p>
                </div>
              </div>
            </div>
          ))
        }
      </Transition>
    </>
  );
});

export default AdminSelectedPersonalEvent;
