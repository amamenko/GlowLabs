import React from "react";
import "../MyAppointments.css";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const PastAppointments = () => {
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    state => state.userAuthenticated.user_authenticated
  );

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToLogInPage = () => {
    if (!userAuthenticated) {
      return <Redirect to="/account/login" />;
    }
  };

  return (
    <div className="my_appointments_container">
      {redirectToHome()}
      {redirectToLogInPage()}
      <div className="my_appointments_header">
        <Link to="/account/clientprofile">
          <FontAwesomeIcon
            className="my_appointments_header_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>MY APPOINTMENTS</h1>
      </div>
      <div className="my_appointments_sub_header">
        <Link
          to="/account/clientprofile/upcomingappointments"
          className="sub_header_container_link"
        >
          <div className="past_appointments_upcoming_title_container">
            <h2>UPCOMING</h2>
          </div>
        </Link>
        <div className="past_appointments_past_title_container">
          <h2>PAST</h2>
        </div>
      </div>
    </div>
  );
};

export default PastAppointments;
