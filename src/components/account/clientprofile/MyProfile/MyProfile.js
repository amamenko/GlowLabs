import React, { useEffect } from "react";
import "./MyProfile.css";
import { useLocation, Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faUserCircle,
  faCamera,
  faQuestion,
  faPencilAlt,
  faChevronRight,
  faSpa,
} from "@fortawesome/free-solid-svg-icons";

const MyProfile = (props) => {
  const location = useLocation();
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const logoutClicked = useSelector(
    (state) => state.logoutClicked.log_out_clicked
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

  useEffect(() => {
    if (location.pathname) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    <div
      className="my_profile_container"
      style={{ zIndex: logoutClicked ? -1 : "auto" }}
    >
      {redirectToHome()}
      {redirectToLogInPage()}
      <div
        className="my_profile_header"
        style={{ zIndex: logoutClicked ? 0 : 3 }}
      >
        <Link to="/account/clientprofile">
          <FontAwesomeIcon
            className="my_profile_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>MY PROFILE</h1>
      </div>
      <div className="profile_top_section">
        <div className="profile_client_avatar_container">
          <FontAwesomeIcon
            className="profile_client_avatar"
            icon={faUserCircle}
          />
        </div>
        <div className="profile_contact_information_container">
          <div className="profile_name_container">
            <p>Name</p>
            <p>
              {props.getClientData
                ? props.getClientData.client.firstName
                : null}{" "}
              {props.getClientData ? props.getClientData.client.lastName : null}
            </p>
          </div>
          <div className="profile_email_container">
            <p>Email</p>
            <p>
              {props.getClientData ? props.getClientData.client.email : null}
            </p>
          </div>
          <div className="profile_phone_number_container">
            <p>Phone Number</p>
            <p>
              {props.getClientData
                ? props.getClientData.client.phoneNumber
                : null}
            </p>
          </div>
          <div className="profile_membership_type_container">
            <p>Membership Type</p>
            <p>Default</p>
          </div>
        </div>
      </div>
      <div className="profile_bottom_buttons_container">
        <Link to="/account/clientprofile/profile/routine">
          <div className="proile_button_container">
            <FontAwesomeIcon className="profile_button_icon" icon={faSpa} />
            <h2>Skin Care Routine</h2>
            <FontAwesomeIcon
              className="profile_button_expand"
              icon={faChevronRight}
            />
          </div>
        </Link>
        <div className="proile_button_container">
          <FontAwesomeIcon className="profile_button_icon" icon={faPencilAlt} />
          <h2>Quizzes</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
        <div className="proile_button_container">
          <FontAwesomeIcon className="profile_button_icon" icon={faQuestion} />
          <h2>FAQs</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
        <div className="proile_button_container">
          <FontAwesomeIcon className="profile_button_icon" icon={faCamera} />
          <h2>Before / After Photos</h2>
          <FontAwesomeIcon
            className="profile_button_expand"
            icon={faChevronRight}
          />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
