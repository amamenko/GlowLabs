import React, { useEffect } from "react";
import "./MyProfile.css";
import { useLocation, Redirect, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

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
    </div>
  );
};

export default MyProfile;
