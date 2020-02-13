import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ACTION_DAY_OF_THE_WEEK from "../../../actions/SelectedDay/DayOfTheWeek/ACTION_DAY_OF_THE_WEEK";
import ACTION_REFORMATTED_DAY_CLONE_RESET from "../../../actions/SelectedDay/ReformattedDayClone/ACTION_REFORMATTED_DAY_CLONE_RESET";
import { Collapse } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./TimePreference.css";

// Minified Bootstrap CSS file (for Collapse feature)
import "../../../bootstrap.min.css";
import ACTION_SELECTED_TIME from "../../../actions/SelectedTime/ACTION_SELECTED_TIME";
import ACTION_SELECTED_TIME_RESET from "../../../actions/SelectedTime/ACTION_SELECTED_TIME_RESET";

const TimePreference = () => {
  const dispatch = useDispatch();

  const [morningCollapseIsOpen, changeMorningCollapseIsOpen] = useState(false);
  const [afternoonCollapseIsOpen, changeAfternoonCollapseIsOpen] = useState(
    false
  );
  const [
    lateAfternoonCollapseIsOpen,
    changeLateAfternoonCollapseIsOpen
  ] = useState(false);
  const [eveningCollapseIsOpen, changeEveningCollapseIsOpen] = useState(false);

  const reformattedDay = useSelector(
    state => state.reformattedDay.reformattedDay
  );
  const selectedDay = useSelector(state => state.selectedDay.selectedDay);
  const dayOfTheWeek = useSelector(state => state.dayOfTheWeek.dayOfTheWeek);
  const selectedTime = useSelector(state => state.selectedTime.selectedTime);

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
    changeMorningCollapseIsOpen(!morningCollapseIsOpen);
    if (afternoonCollapseIsOpen) {
      changeAfternoonCollapseIsOpen(false);
    }
    if (eveningCollapseIsOpen) {
      changeEveningCollapseIsOpen(false);
    }
    if (lateAfternoonCollapseIsOpen) {
      changeLateAfternoonCollapseIsOpen(false);
    }
  };

  const handleAfternoonCollapse = () => {
    changeAfternoonCollapseIsOpen(!afternoonCollapseIsOpen);
    if (morningCollapseIsOpen) {
      changeMorningCollapseIsOpen(false);
    }
    if (eveningCollapseIsOpen) {
      changeEveningCollapseIsOpen(false);
    }
    if (lateAfternoonCollapseIsOpen) {
      changeLateAfternoonCollapseIsOpen(false);
    }
  };

  const handleLateAfternoonCollapse = () => {
    changeLateAfternoonCollapseIsOpen(!lateAfternoonCollapseIsOpen);
    if (morningCollapseIsOpen) {
      changeMorningCollapseIsOpen(false);
    }
    if (afternoonCollapseIsOpen) {
      changeAfternoonCollapseIsOpen(false);
    }
    if (eveningCollapseIsOpen) {
      changeEveningCollapseIsOpen(false);
    }
  };

  const handleEveningCollapse = () => {
    changeEveningCollapseIsOpen(!eveningCollapseIsOpen);
    if (morningCollapseIsOpen) {
      changeMorningCollapseIsOpen(false);
    }
    if (afternoonCollapseIsOpen) {
      changeAfternoonCollapseIsOpen(false);
    }
    if (lateAfternoonCollapseIsOpen) {
      changeLateAfternoonCollapseIsOpen(false);
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
                      : "rgb(215, 156, 165)",
                  transition: "all 0.3s ease"
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
                          : "rgb(215, 156, 165)",
                      transition: "all 0.3s ease"
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
                      : "rgb(215, 156, 165)",
                  transition: "all 0.3s ease"
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
                          : "rgb(215, 156, 165)",
                      transition: "all 0.3s ease"
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
                      : "rgb(215, 156, 165)",
                  transition: "all 0.3s ease"
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
                          ? parseInt(item[0]) > 3
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
                          : "rgb(215, 156, 165)",
                      transition: "background 0.3s ease, color 0.3s ease"
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
                        : "rgb(215, 156, 165)",
                    transition: "all 0.3s ease"
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
                              ? parseInt(item[0]) > 5
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
                              : "rgb(215, 156, 165)",
                          transition: "all 0.3s ease"
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
      </div>
    </div>
  );
};

export default TimePreference;
