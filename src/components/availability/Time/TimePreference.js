import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ACTION_DAY_OF_THE_WEEK from "../../../actions/SelectedDay/DayOfTheWeek/ACTION_DAY_OF_THE_WEEK";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import "./TimePreference.css";

const TimePreference = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="select_time_container">
      <div className="select_time_container_header">
        <Link to="/availability">
          <FontAwesomeIcon
            className="select_time_back_arrow"
            icon={faChevronLeft}
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
        <div className="time_of_day_selector">
          <p>MORNING</p>
        </div>
        <div className="time_of_day_selector">
          <p>AFTERNOON</p>
        </div>
        <div className="time_of_day_selector">
          <p>EVENING</p>
        </div>
      </div>
    </div>
  );
};

export default TimePreference;
