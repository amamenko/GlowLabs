import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";
import "./TimePreference.css";

const TimePreference = () => {
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
        Choose a preferred time for your appointment on Wednesday, February 5th,
        2020.
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
      <div className="select_available_times_button">
        <p>Select Available Times</p>
      </div>
    </div>
  );
};

export default TimePreference;
