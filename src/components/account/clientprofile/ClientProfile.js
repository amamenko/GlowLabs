import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileSignature,
  faCalendarCheck,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useQuery } from "@apollo/react-hooks";
import { getClientQuery } from "../../../graphql/queries/queries";
import moment from "moment";
import "./ClientProfile.css";
import ACTION_CONSENT_FORM_LAST_UPDATED from "../../../actions/ConsentForm/LastUpdated/ACTION_CONSENT_FORM_LAST_UPDATED";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_BODY_SCROLL_ALLOW from "../../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";

const ClientProfile = () => {
  const dispatch = useDispatch();
  const splashScreenHalfway = useSelector(
    state => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    state => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    state => state.userAuthenticated.user_authenticated
  );
  const consentFormLastPageOpened = useSelector(
    state => state.consentFormLastPageOpened.consent_form_active_page
  );
  const consentFormLastUpdated = useSelector(
    state => state.consentFormLastUpdated.consent_form_last_updated
  );

  const { data } = useQuery(getClientQuery, {
    fetchPolicy: "no-cache",
    variables: {
      _id: Cookies.get("dummy-token")
        ? jwt.decode(Cookies.get("dummy-token")).id
        : null
    }
  });

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  useEffect(() => {
    if (data) {
      if (data.client.consentForm.date) {
        if (
          consentFormLastUpdated !==
          moment.unix(data.client.consentForm.createdAt / 1000).format("l")
        ) {
          dispatch(
            ACTION_CONSENT_FORM_LAST_UPDATED(
              moment.unix(data.client.consentForm.createdAt / 1000).format("l")
            )
          );
        }
      }
    }
  }, [data, consentFormLastUpdated, dispatch]);

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
          <Link
            className="profile_box_container_link"
            to="/"
            onClick={() => dispatch(ACTION_BODY_SCROLL_ALLOW())}
          >
            <FontAwesomeIcon icon={faHome} className="profile_box_icon" />
            <h2>HOME</h2>
          </Link>
        </div>
        <div className="profile_consent_form_box_container">
          <Link
            className="profile_box_container_link"
            to={`/account/clientprofile/consentform/${consentFormLastPageOpened}`}
          >
            <FontAwesomeIcon
              icon={faFileSignature}
              className="profile_box_icon"
            />
            <h2>CONSENT FORM</h2>
            {consentFormLastUpdated ? (
              <span className="consent_form_last_updated_on_container">
                <p>Last Updated On:</p>
                <p>{consentFormLastUpdated}</p>
              </span>
            ) : null}
          </Link>
        </div>
        <div className="profile_my_appointments_box_container">
          <Link
            className="profile_box_container_link"
            to={`/account/clientprofile/consentform/${consentFormLastPageOpened}`}
          >
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="profile_box_icon"
            />
            <h2>MY APPOINTMENTS</h2>
          </Link>
        </div>
        <div className="profile_my_profile_box_container">
          <Link
            className="profile_box_container_link"
            to={`/account/clientprofile/consentform/${consentFormLastPageOpened}`}
          >
            <FontAwesomeIcon icon={faUser} className="profile_box_icon" />
            <h2>MY PROFILE</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
