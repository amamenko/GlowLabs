import React, { useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ACTION_DAY_OF_THE_WEEK from "../../../actions/SelectedDay/DayOfTheWeek/ACTION_DAY_OF_THE_WEEK";
import ACTION_REFORMATTED_DAY_CLONE_RESET from "../../../actions/SelectedDay/ReformattedDayClone/ACTION_REFORMATTED_DAY_CLONE_RESET";
import ACTION_SELECTED_TIME from "../../../actions/SelectedTime/ACTION_SELECTED_TIME";
import ACTION_SELECTED_TIME_RESET from "../../../actions/SelectedTime/ACTION_SELECTED_TIME_RESET";
import ACTION_AFTERNOON_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/Afternoon/ACTION_AFTERNOON_OPEN";
import ACTION_AFTERNOON_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/Afternoon/ACTION_AFTERNOON_CLOSED";
import ACTION_LATE_AFTERNOON_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/LateAfternoon/ACTION_LATE_AFTERNOON_OPEN";
import ACTION_LATE_AFTERNOON_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/LateAfternoon/ACTION_LATE_AFTERNOON_CLOSED";
import ACTION_MORNING_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/Morning/ACTION_MORNING_OPEN";
import ACTION_MORNING_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/Morning/ACTION_MORNING_CLOSED";
import ACTION_EVENING_OPEN from "../../../actions/SelectedTime/CollapseIsOpen/Evening/ACTION_EVENING_OPEN";
import ACTION_EVENING_CLOSED from "../../../actions/SelectedTime/CollapseIsOpen/Evening/ACTION_EVENING_CLOSED";
import ACTION_CONTINUE_BUTTON_ACTIVE from "../../../actions/ContinueToCheckoutButtonActive/ACTION_CONTINUE_BUTTON_ACTIVE";
import ACTION_CONTINUE_BUTTON_RESET from "../../../actions/ContinueToCheckoutButtonActive/ACTION_CONTINUE_BUTTON_RESET";
import ACTION_FIRST_NAME_RESET from "../../../actions/GuestCheckoutForm/FirstName/ACTION_FIRST_NAME_RESET";
import ACTION_LAST_NAME_RESET from "../../../actions/GuestCheckoutForm/LastName/ACTION_LAST_NAME_RESET";
import ACTION_EMAIL_RESET from "../../../actions/GuestCheckoutForm/Email/ACTION_EMAIL_RESET";
import ACTION_EMAIL_NOT_INVALID from "../../../actions/EmailValidation/Invalid/ACTION_EMAIL_NOT_INVALID";
import ACTION_EMAIL_NOT_VALID from "../../../actions/EmailValidation/Valid/ACTION_EMAIL_NOT_VALID";
import ACTION_PHONE_NUMBER_RESET from "../../../actions/GuestCheckoutForm/PhoneNumber/ACTION_PHONE_NUMBER_RESET";
import ACTION_PHONE_NOT_INVALID from "../../../actions/PhoneNumberValidation/Invalid/ACTION_PHONE_NOT_INVALID";
import ACTION_PHONE_NOT_VALID from "../../../actions/PhoneNumberValidation/Valid/ACTION_PHONE_NOT_VALID";
import ACTION_APPOINTMENT_NOTES_RESET from "../../../actions/GuestCheckoutForm/AppointmentNotes/ACTION_APPOINTMENT_NOTES_RESET";
import ACTION_APPOINTMENT_END_TIME from "../../../actions/AppointmentEndTime/ACTION_APPOINTMENT_END_TIME";
import ACTION_TOTAL_DURATION from "../../../actions/TotalDuration/ACTION_TOTAL_DURATION";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/react-hooks";
import { getAllAppointmentsQuery } from "../../../graphql/queries/queries";
import "./TimePreference.css";

// Minified Bootstrap CSS file (for Collapse feature)
import "../../../bootstrap.min.css";

const TimePreference = () => {
  const dispatch = useDispatch();

  const addOnsArr = useSelector(state => state.addOnsArr.add_ons_arr);
  const treatmentsArr = useSelector(
    state => state.treatmentsArr.treatments_arr
  );
  const reformattedDay = useSelector(
    state => state.reformattedDay.reformattedDay
  );
  const selectedDay = useSelector(state => state.selectedDay.selectedDay);
  const dayOfTheWeek = useSelector(state => state.dayOfTheWeek.dayOfTheWeek);
  const selectedTime = useSelector(state => state.selectedTime.selectedTime);
  const continueToCheckoutButton = useSelector(
    state => state.continueToCheckoutButton.continueButtonActive
  );
  const morningCollapseIsOpen = useSelector(
    state => state.morningCollapse.collapseIsOpen
  );
  const afternoonCollapseIsOpen = useSelector(
    state => state.afternoonCollapse.collapseIsOpen
  );
  const lateAfternoonCollapseIsOpen = useSelector(
    state => state.lateAfternoonCollapse.collapseIsOpen
  );
  const eveningCollapseIsOpen = useSelector(
    state => state.eveningCollapse.collapseIsOpen
  );
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );

  // Checkout Form States
  const firstName = useSelector(state => state.firstName.first_name);
  const lastName = useSelector(state => state.lastName.last_name);
  const appointmentNotes = useSelector(
    state => state.appointmentNotes.appointment_notes
  );

  // Email States
  const email = useSelector(state => state.email.email);
  const emailIsValid = useSelector(state => state.emailIsValid.email_valid);
  const emailIsInvalid = useSelector(
    state => state.emailIsInvalid.email_invalid
  );

  // Phone Number States
  const phoneNumber = useSelector(state => state.phoneNumber.phone_number);
  const phoneIsValid = useSelector(state => state.phoneIsValid.phone_valid);
  const phoneIsInvalid = useSelector(
    state => state.phoneIsInvalid.phone_invalid
  );

  const { data } = useQuery(getAllAppointmentsQuery, {
    fetchPolicy: "no-cache"
  });

  const alreadyBookedAppointments = data
    ? data.all_appointments.filter(item => item.date === reformattedDay)
    : null;

  const alreadyBookedTimes = () => {
    if (alreadyBookedAppointments !== null) {
      for (let i = 0; i < alreadyBookedAppointments.length; i++) {
        const startMinutes = Number(
          alreadyBookedAppointments[i].startTime.slice(-2)
        );
        const minutes =
          startMinutes +
          Math.ceil(alreadyBookedAppointments[i].duration / 15) * 15;
        const endHour = (
          Number(alreadyBookedAppointments[i].startTime.split(":")[0]) +
          Number((minutes / 60).toString().slice(0, 1))
        ).toString();
        const endMinutes =
          (minutes / 60).toString().length > 1
            ? (
                Number((minutes / 60).toString().slice(1, minutes.length)) * 60
              ).toString()
            : null;
        const calendarEndTime =
          (Number(endHour) > 12 ? (Number(endHour) - 12).toString() : endHour) +
          ":" +
          endMinutes;
        return calendarEndTime;
      }
    }
  };

  alreadyBookedTimes();

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const daysOfTheWeekArr = [
    { Mon: "Monday" },
    { Tue: "Tuesday" },
    { Wed: "Wednesday" },
    { Thu: "Thursday" },
    { Fri: "Friday" },
    { Sat: "Saturday" },
    { Sun: "Sunday" }
  ];

  const getFullDayOfTheWeek = () => {
    if (selectedDay) {
      const dayThreeLetters = selectedDay.toString().slice(0, 3);

      let fullDayName = "";

      for (let i = 0; i < daysOfTheWeekArr.length; i++) {
        if (daysOfTheWeekArr[i][dayThreeLetters]) {
          fullDayName = daysOfTheWeekArr[i][dayThreeLetters];
        }
      }
      dispatch(ACTION_DAY_OF_THE_WEEK(fullDayName));
    }
  };

  getFullDayOfTheWeek();

  const handleMorningCollapse = () => {
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    } else {
      dispatch(ACTION_MORNING_OPEN());
    }
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    }
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    }
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    }
  };

  const handleAfternoonCollapse = () => {
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    } else {
      dispatch(ACTION_AFTERNOON_OPEN());
    }
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    }
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    }
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    }
  };

  const handleLateAfternoonCollapse = () => {
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    } else {
      dispatch(ACTION_LATE_AFTERNOON_OPEN());
    }
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    }
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    }
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    }
  };

  const handleEveningCollapse = () => {
    if (eveningCollapseIsOpen) {
      dispatch(ACTION_EVENING_CLOSED());
    } else {
      dispatch(ACTION_EVENING_OPEN());
    }
    if (morningCollapseIsOpen) {
      dispatch(ACTION_MORNING_CLOSED());
    }
    if (afternoonCollapseIsOpen) {
      dispatch(ACTION_AFTERNOON_CLOSED());
    }
    if (lateAfternoonCollapseIsOpen) {
      dispatch(ACTION_LATE_AFTERNOON_CLOSED());
    }
  };

  const handleContinueCheckoutButtonClick = () => {
    dispatch(ACTION_CONTINUE_BUTTON_ACTIVE());
    dispatch(ACTION_DAY_OF_THE_WEEK(dayOfTheWeek));
  };

  const fifteenMinuteIntervals = ["00", "15", "30", "45"];
  const morningTimesArr = [];

  const createMorningTimeInstances = () => {
    let hours = [];
    let minutes = fifteenMinuteIntervals.concat(fifteenMinuteIntervals);

    for (let i = 10; i < 12; i++) {
      hours.push(i);
    }

    const multipleHours = hours
      .map(e => [e, e, e, e])
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 0; i < multipleHours.length; i++) {
      morningTimesArr.push(
        multipleHours[i].toString() + ":" + minutes[i].toString()
      );
    }
  };

  createMorningTimeInstances();

  const afternoonTimesArr = [];

  const createAfternoonTimeInstances = () => {
    let hours = [];
    let minutes = new Array(20)
      .fill(fifteenMinuteIntervals)
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 12; i < 17; i++) {
      hours.push(i);
    }

    const multipleHours = hours
      .map(e => (e > 12 ? [e - 12, e - 12, e - 12, e - 12] : [e, e, e, e]))
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 0; i < multipleHours.length; i++) {
      afternoonTimesArr.push(
        multipleHours[i].toString() + ":" + minutes[i].toString()
      );
    }
  };

  createAfternoonTimeInstances();

  let lateAfternoonTimesArr = afternoonTimesArr.splice(12, 10);

  const eveningTimesArr = [];

  const createEveningTimeInstances = () => {
    let hours = [];
    let minutes = new Array(dayOfTheWeek === "Sunday" ? 5 : 12)
      .fill(fifteenMinuteIntervals)
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 17; i < (dayOfTheWeek === "Sunday" ? 19 : 20); i++) {
      hours.push(i);
    }

    const multipleHours = hours
      .map(e => [e - 12, e - 12, e - 12, e - 12])
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 0; i < multipleHours.length; i++) {
      eveningTimesArr.push(
        multipleHours[i].toString() + ":" + minutes[i].toString()
      );
    }
  };

  createEveningTimeInstances();

  const handleTimeClick = e => {
    let renderedTime = "";

    // Required for button border click to trigger selected time on mobile
    if (e.target.lastChild.innerText) {
      renderedTime = e.target.lastChild.innerText;
    } else {
      renderedTime = e.target.innerText;
    }

    dispatch(ACTION_SELECTED_TIME(renderedTime));
    if (selectedTime === renderedTime) {
      dispatch(ACTION_SELECTED_TIME_RESET());
      dispatch(ACTION_CONTINUE_BUTTON_RESET());
      if (firstName) {
        dispatch(ACTION_FIRST_NAME_RESET());
      }
      if (lastName) {
        dispatch(ACTION_LAST_NAME_RESET());
      }
      if (email) {
        dispatch(ACTION_EMAIL_RESET());
      }
      if (emailIsInvalid) {
        dispatch(ACTION_EMAIL_NOT_INVALID());
      }
      if (emailIsValid) {
        dispatch(ACTION_EMAIL_NOT_VALID());
      }
      if (phoneNumber) {
        dispatch(ACTION_PHONE_NUMBER_RESET());
      }
      if (phoneIsInvalid) {
        dispatch(ACTION_PHONE_NOT_INVALID());
      }
      if (phoneIsValid) {
        dispatch(ACTION_PHONE_NOT_VALID());
      }
      if (appointmentNotes) {
        dispatch(ACTION_APPOINTMENT_NOTES_RESET());
      }
    }
  };

  const treatmentDurationArr = treatmentsArr.map(item => item.duration);
  const addOnsDurationArr = addOnsArr.map(item => item.duration);
  const totalDurationArr = treatmentDurationArr.concat(addOnsDurationArr);

  let totalDurationValue;
  totalDurationArr[0] === undefined
    ? (totalDurationValue = null)
    : (totalDurationValue = totalDurationArr.reduce((a, b) => a + b));

  const handleAppointmentEndTime = useCallback(() => {
    if (selectedTime) {
      let endTotalTime = "";
      let endMinutes =
        Number(
          selectedTime.slice(selectedTime.length - 2, selectedTime.length)
        ) + totalDurationValue;
      let endHours = Number(selectedTime.slice(0, selectedTime.indexOf(":")));

      if (endMinutes >= 240) {
        endMinutes -= 240;
        endHours += 4;
      } else {
        if (endMinutes >= 180) {
          endMinutes -= 180;
          endHours += 3;
        } else {
          if (endMinutes >= 120) {
            endMinutes -= 120;
            endHours += 2;
          } else {
            if (endMinutes >= 60) {
              endMinutes -= 60;
              endHours += 1;
            }
          }
        }
      }

      if (endHours > 12) {
        endHours -= 12;
      }

      endMinutes = endMinutes.toString().split("");
      if (endMinutes.toString().length < 2) {
        endMinutes.splice(0, 0, "0");
      }

      endTotalTime = endHours.toString() + ":" + endMinutes.join("");

      dispatch(ACTION_TOTAL_DURATION(totalDurationValue));
      dispatch(ACTION_APPOINTMENT_END_TIME(endTotalTime));
    }
  }, [selectedTime, totalDurationValue, dispatch]);

  handleAppointmentEndTime();

  return (
    <div className="select_time_container">
      {redirectToHome()}
      <div className="select_time_container_header">
        <Link to="/availability">
          <FontAwesomeIcon
            className="select_time_back_arrow"
            icon={faChevronLeft}
            onClick={() => dispatch(ACTION_REFORMATTED_DAY_CLONE_RESET)}
          />
        </Link>
        <h1>AVAILABILITY</h1>
        <Link to="/checkout">
          <FontAwesomeIcon
            className="select_time_forward_arrow"
            style={{ display: continueToCheckoutButton ? "block" : "none" }}
            icon={faChevronRight}
          />
        </Link>
      </div>
      <div className="select_a_time_header">
        <h2>SELECT A TIME</h2>
      </div>
      <p className="time_statement">
        Choose a time for your appointment on {dayOfTheWeek}, {reformattedDay}.
      </p>
      <div className="time_of_day_selectors_wrapper">
        <div className="time_of_day_card_container">
          <div className="time_of_day_card_top_wrapping">
            <div className="time_of_day_heading">
              <p>Morning</p>
            </div>
            <p
              className="time_of_day_card_show_more"
              onClick={handleMorningCollapse}
            >
              Show {morningCollapseIsOpen ? "Less" : "Times"}
            </p>
          </div>
          <Collapse isOpen={morningCollapseIsOpen}>
            <div className="inner_times_wrapper">
              {morningTimesArr.map((item, i) => (
                <div
                  key={i}
                  className="individual_time_wrapper"
                  onClick={handleTimeClick}
                  style={{
                    background:
                      item === selectedTime
                        ? "rgb(165, 138, 127)"
                        : "rgb(255, 255, 255)",
                    color:
                      item === selectedTime
                        ? "rgb(255, 255, 255)"
                        : "rgb(0, 0, 0)",
                    border:
                      item === selectedTime
                        ? "2px solid transparent"
                        : "2px solid rgb(0, 0, 0)"
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
        <div className="time_of_day_card_container">
          <div className="time_of_day_card_top_wrapping">
            <div className="time_of_day_heading">
              <p>Afternoon</p>
            </div>
            <p
              className="time_of_day_card_show_more"
              onClick={handleAfternoonCollapse}
            >
              Show {afternoonCollapseIsOpen ? "Less" : "Times"}
            </p>
          </div>
          <Collapse isOpen={afternoonCollapseIsOpen}>
            <div className="inner_times_wrapper">
              {afternoonTimesArr.map((item, i) => (
                <div
                  key={i}
                  className="individual_time_wrapper"
                  onClick={handleTimeClick}
                  style={{
                    background:
                      item === selectedTime
                        ? "rgb(165, 138, 127)"
                        : "rgb(255, 255, 255)",
                    color:
                      item === selectedTime
                        ? "rgb(255, 255, 255)"
                        : "rgb(0, 0, 0)",
                    border:
                      item === selectedTime ? "none" : "2px solid rgb(0, 0, 0)"
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
        <div className="time_of_day_card_container">
          <div className="time_of_day_card_top_wrapping">
            <div className="time_of_day_heading">
              <p>Late Afternoon</p>
            </div>
            <p
              className="time_of_day_card_show_more"
              onClick={handleLateAfternoonCollapse}
            >
              Show {lateAfternoonCollapseIsOpen ? "Less" : "Times"}
            </p>
          </div>
          <Collapse isOpen={lateAfternoonCollapseIsOpen}>
            <div className="inner_times_wrapper">
              {lateAfternoonTimesArr.map((item, i) => (
                <div
                  key={i}
                  className="individual_time_wrapper"
                  onClick={handleTimeClick}
                  style={{
                    opacity:
                      dayOfTheWeek === "Friday"
                        ? parseInt(item[0], 10) > 3
                          ? 0
                          : 1
                        : 1,
                    pointerEvents:
                      dayOfTheWeek === "Friday"
                        ? parseInt(item[0], 10) > 3
                          ? "none"
                          : "auto"
                        : "auto",
                    background:
                      item === selectedTime
                        ? "rgb(165, 138, 127)"
                        : "rgb(255, 255, 255)",
                    color:
                      item === selectedTime
                        ? "rgb(255, 255, 255)"
                        : "rgb(0, 0, 0)",
                    border:
                      item === selectedTime ? "none" : "2px solid rgb(0, 0, 0)"
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </Collapse>
        </div>
        {dayOfTheWeek === "Friday" ? null : (
          <div className="time_of_day_card_container">
            <div className="time_of_day_card_top_wrapping">
              <div className="time_of_day_heading">
                <p>Evening</p>
              </div>
              <p
                className="time_of_day_card_show_more"
                onClick={handleEveningCollapse}
              >
                Show {eveningCollapseIsOpen ? "Less" : "Times"}
              </p>
            </div>
            <Collapse isOpen={eveningCollapseIsOpen}>
              <div className="inner_times_wrapper">
                {eveningTimesArr.map((item, i) => (
                  <div
                    key={i}
                    className="individual_time_wrapper"
                    onClick={handleTimeClick}
                    style={{
                      opacity:
                        dayOfTheWeek === "Sunday"
                          ? parseInt(item[0], 10) > 5
                            ? 0
                            : 1
                          : 1,
                      pointerEvents:
                        dayOfTheWeek === "Sunday"
                          ? parseInt(item[0], 10) > 5
                            ? "none"
                            : "auto"
                          : "auto",
                      background:
                        item === selectedTime
                          ? "rgb(165, 138, 127)"
                          : "rgb(255, 255, 255)",
                      color:
                        item === selectedTime
                          ? "rgb(255, 255, 255)"
                          : "rgb(0, 0, 0)",
                      border:
                        item === selectedTime
                          ? "none"
                          : "2px solid rgb(0, 0, 0)"
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        )}
        <div
          className="time_preference_bottom_buttons_container"
          style={{
            paddingTop:
              dayOfTheWeek === "Sunday"
                ? eveningCollapseIsOpen
                  ? continueToCheckoutButton
                    ? "5vh"
                    : "-11vh"
                  : "5vh"
                : dayOfTheWeek === "Friday"
                ? lateAfternoonCollapseIsOpen
                  ? continueToCheckoutButton
                    ? "5vh"
                    : "-8vh"
                  : "5vh"
                : "5vh",
            marginTop:
              dayOfTheWeek === "Sunday"
                ? eveningCollapseIsOpen
                  ? "-13vh"
                  : "0vh"
                : dayOfTheWeek === "Friday"
                ? lateAfternoonCollapseIsOpen
                  ? "-13vh"
                  : "0vh"
                : eveningCollapseIsOpen
                ? "-4vh"
                : "0vh",
            transition: "margin-top 0.4s ease, padding-top 0.4s ease"
          }}
        >
          <Link
            to="/checkout"
            style={{
              display: "block",
              pointerEvents: selectedTime !== "" ? "auto" : "none"
            }}
            onClick={handleContinueCheckoutButtonClick}
          >
            <div
              className="time_preference_continue_button"
              style={{
                background: selectedTime ? "rgb(165, 138, 127)" : "#f0f0f0",
                color: selectedTime
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
                transition: "background 0.5s ease, color 0.5s ease"
              }}
            >
              <p>Continue Checkout</p>
            </div>
          </Link>
          <Link to="/availability">
            <div className="change_date_button">
              <p>Change Date</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TimePreference;
