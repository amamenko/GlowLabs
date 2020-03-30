import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileSignature,
  faCalendarCheck,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import "./ClientProfile.css";

const ClientProfile = () => {
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
    <div className="client_profile_page_container">
      {redirectToHome()}
      {redirectToLogInPage()}
      <div className="client_profile_page_header">
        <h1>MENU</h1>
      </div>
      <div className="client_profile_page_content_container">
        <div className="profile_home_box_container">
          <Link className="profile_box_container_link" to="/">
            <FontAwesomeIcon icon={faHome} className="profile_box_icon" />
            <p>HOME</p>
          </Link>
        </div>
        <div className="profile_consent_form_box_container">
          <Link
            className="profile_box_container_link"
            to="/account/clientprofile/consentform/page1"
          >
            <FontAwesomeIcon
              icon={faFileSignature}
              className="profile_box_icon"
            />
            <p>CONSENT FORM</p>
          </Link>
        </div>
        <div className="profile_my_appointments_box_container">
          <FontAwesomeIcon
            icon={faCalendarCheck}
            className="profile_box_icon"
          />
          <p>MY APPOINTMENTS</p>
        </div>
        <div className="profile_my_profile_box_container">
          <FontAwesomeIcon icon={faUser} className="profile_box_icon" />
          <p>MY PROFILE</p>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
