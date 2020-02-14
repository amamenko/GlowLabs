import React from "react";
import { Link } from "react-router-dom";
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
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./TimePreference.css";

// Minified Bootstrap CSS file (for Collapse feature)
import "../../../bootstrap.min.css";

const TimePreference = () => {
  const dispatch = useDispatch();

  const reformattedDay = useSelector(
    state => state.reformattedDay.reformattedDay
  );
  const selectedDay = useSelector(state => state.selectedDay.selectedDay);
  const dayOfTheWeek = useSelector(state => state.dayOfTheWeek.dayOfTheWeek);
  const selectedTime = useSelector(state => state.selectedTime.selectedTime);
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

  const fifteenMinuteIntervals = ["00", "15", "30", "45"];
  let initialMorningTimesArr = [];
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

  initialMorningTimesArr = morningTimesArr.splice(0, 3);

  let initialAfternoonTimesArr = [];
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

  initialAfternoonTimesArr = afternoonTimesArr.splice(0, 3);
  let lateAfternoonTimesArr = afternoonTimesArr.splice(9, 8);
  const initialLateAfternoonTimesArr = lateAfternoonTimesArr.splice(0, 3);

  let initialEveningTimesArr = [];
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

  initialEveningTimesArr = eveningTimesArr.splice(0, 3);

  const handleTimeClick = e => {
    dispatch(ACTION_SELECTED_TIME(e.target.innerText));
    if (selectedTime === e.target.innerText) {
      dispatch(ACTION_SELECTED_TIME_RESET());
    }
  };

  return (
    <div className="select_time_container">
      <div className="select_time_container_header">
        <Link to="/availability">
          <FontAwesomeIcon
            className="select_time_back_arrow"
            icon={faChevronLeft}
            onClick={() => dispatch(ACTION_REFORMATTED_DAY_CLONE_RESET)}
          />
        </Link>
        <h1>AVAILABILITY</h1>
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
              Show {morningCollapseIsOpen ? "Less" : "More"}
            </p>
          </div>

          <div className="inner_times_wrapper">
            {initialMorningTimesArr.map((item, i) => (
              <div
                key={i}
                className="individual_time_wrapper"
                onClick={handleTimeClick}
                style={{
                  background:
                    item === selectedTime
                      ? "rgb(215, 156, 165)"
                      : "rgb(255, 255, 255)",
                  color:
                    item === selectedTime
                      ? "rgb(255, 255, 255)"
                      : "rgb(215, 156, 165)"
                }}
              >
                <p>{item}</p>
              </div>
            ))}
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
                          ? "rgb(215, 156, 165)"
                          : "rgb(255, 255, 255)",
                      color:
                        item === selectedTime
                          ? "rgb(255, 255, 255)"
                          : "rgb(215, 156, 165)"
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
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
              Show {afternoonCollapseIsOpen ? "Less" : "More"}
            </p>
          </div>

          <div className="inner_times_wrapper">
            {initialAfternoonTimesArr.map((item, i) => (
              <div
                key={i}
                className="individual_time_wrapper"
                onClick={handleTimeClick}
                style={{
                  background:
                    item === selectedTime
                      ? "rgb(215, 156, 165)"
                      : "rgb(255, 255, 255)",
                  color:
                    item === selectedTime
                      ? "rgb(255, 255, 255)"
                      : "rgb(215, 156, 165)"
                }}
              >
                <p>{item}</p>
              </div>
            ))}
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
                          ? "rgb(215, 156, 165)"
                          : "rgb(255, 255, 255)",
                      color:
                        item === selectedTime
                          ? "rgb(255, 255, 255)"
                          : "rgb(215, 156, 165)"
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
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
              Show {lateAfternoonCollapseIsOpen ? "Less" : "More"}
            </p>
          </div>

          <div className="inner_times_wrapper">
            {initialLateAfternoonTimesArr.map((item, i) => (
              <div
                key={i}
                className="individual_time_wrapper"
                onClick={handleTimeClick}
                style={{
                  background:
                    item === selectedTime
                      ? "rgb(215, 156, 165)"
                      : "rgb(255, 255, 255)",
                  color:
                    item === selectedTime
                      ? "rgb(255, 255, 255)"
                      : "rgb(215, 156, 165)"
                }}
              >
                <p>{item}</p>
              </div>
            ))}
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
                      background:
                        item === selectedTime
                          ? "rgb(215, 156, 165)"
                          : "rgb(255, 255, 255)",
                      color:
                        item === selectedTime
                          ? "rgb(255, 255, 255)"
                          : "rgb(215, 156, 165)"
                    }}
                  >
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
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
                Show {eveningCollapseIsOpen ? "Less" : "More"}
              </p>
            </div>
            <div className="inner_times_wrapper">
              {initialEveningTimesArr.map((item, i) => (
                <div
                  key={i}
                  className="individual_time_wrapper"
                  onClick={handleTimeClick}
                  style={{
                    background:
                      item === selectedTime
                        ? "rgb(215, 156, 165)"
                        : "rgb(255, 255, 255)",
                    color:
                      item === selectedTime
                        ? "rgb(255, 255, 255)"
                        : "rgb(215, 156, 165)"
                  }}
                >
                  <p>{item}</p>
                </div>
              ))}
              <Collapse isOpen={eveningCollapseIsOpen}>
                <div className="inner_times_wrapper">
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
                          background:
                            item === selectedTime
                              ? "rgb(215, 156, 165)"
                              : "rgb(255, 255, 255)",
                          color:
                            item === selectedTime
                              ? "rgb(255, 255, 255)"
                              : "rgb(215, 156, 165)"
                        }}
                      >
                        <p>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Collapse>
            </div>
          </div>
        )}
        <div
          className="time_preference_bottom_buttons_container"
          style={{
            marginTop:
              dayOfTheWeek === "Friday"
                ? lateAfternoonCollapseIsOpen
                  ? "-5vh"
                  : "2vh"
                : dayOfTheWeek === "Sunday"
                ? eveningCollapseIsOpen
                  ? "-5vh"
                  : "2vh"
                : "2vh"
          }}
        >
          <Link
            to="/checkout"
            style={{
              display: "block",
              pointerEvents: selectedTime !== "" ? "auto" : "none"
            }}
          >
            <div
              className="time_preference_continue_button"
              style={{
                border: selectedTime
                  ? "2px solid transparent"
                  : "2px solid rgb(231, 231, 231)",
                background: selectedTime ? "rgb(215, 156, 165)" : "#f0f0f0",
                color: selectedTime
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
                transition:
                  "background 0.5s ease, color 0.5s ease, border 0.5s ease"
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
