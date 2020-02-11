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

const TimePreference = () => {
  const dispatch = useDispatch();
  const [morningCollapseIsOpen, changeMorningCollapseIsOpen] = useState(false);
  const [afternoonCollapseIsOpen, changeAfternoonCollapseIsOpen] = useState(
    false
  );
  const [eveningCollapseIsOpen, changeEveningCollapseIsOpen] = useState(false);

  const reformattedDay = useSelector(
    state => state.reformattedDay.reformattedDay
  );
  const selectedDay = useSelector(state => state.selectedDay.selectedDay);
  const dayOfTheWeek = useSelector(state => state.dayOfTheWeek.dayOfTheWeek);

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
  };

  const handleAfternoonCollapse = () => {
    changeAfternoonCollapseIsOpen(!afternoonCollapseIsOpen);
    if (morningCollapseIsOpen) {
      changeMorningCollapseIsOpen(false);
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
        multipleHours[i].toString() + ":" + minutes[i].toString() + " AM"
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
        multipleHours[i].toString() + ":" + minutes[i].toString() + " PM"
      );
    }
  };

  createAfternoonTimeInstances();

  const eveningTimesArr = [];

  const createEveningTimeInstances = () => {
    let hours = [];
    let minutes = new Array(12)
      .fill(fifteenMinuteIntervals)
      .reduce(
        (accumulator, currentValue) => accumulator.concat(currentValue),
        []
      );

    for (let i = 17; i < 20; i++) {
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
        multipleHours[i].toString() + ":" + minutes[i].toString() + " PM"
      );
    }
  };

  createEveningTimeInstances();

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
        <div className="time_of_day_selector" onClick={handleMorningCollapse}>
          <p>MORNING</p>
        </div>
        <Collapse isOpen={morningCollapseIsOpen}>
          <div className="inner_times_wrapper">
            {morningTimesArr.map((item, i) => (
              <div key={i} className="individual_time_wrapper">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Collapse>
        <div className="time_of_day_selector" onClick={handleAfternoonCollapse}>
          <p>AFTERNOON</p>
        </div>
        <Collapse isOpen={afternoonCollapseIsOpen}>
          <div className="inner_times_wrapper">
            {afternoonTimesArr.map((item, i) => (
              <div key={i} className="individual_time_wrapper">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </Collapse>
        <div className="time_of_day_selector" onClick={handleEveningCollapse}>
          <p>EVENING</p>
        </div>
        <Collapse isOpen={eveningCollapseIsOpen}>
          <div className="inner_times_wrapper">
            <div className="inner_times_wrapper">
              {eveningTimesArr.map((item, i) => (
                <div key={i} className="individual_time_wrapper">
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default TimePreference;
