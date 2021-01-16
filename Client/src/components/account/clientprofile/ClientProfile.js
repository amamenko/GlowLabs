import React, { useEffect, useState, useMemo } from "react";
import { Redirect, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileSignature,
  faCalendarCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import ACTION_CONSENT_FORM_LAST_UPDATED from "../../../actions/ConsentForm/LastUpdated/ACTION_CONSENT_FORM_LAST_UPDATED";
import ACTION_SPLASH_SCREEN_COMPLETE from "../../../actions/SplashScreenComplete/ACTION_SPLASH_SCREEN_COMPLETE";
import ACTION_SPLASH_SCREEN_HALFWAY from "../../../actions/SplashScreenHalfway/ACTION_SPLASH_SCREEN_HALFWAY";
import ACTION_BODY_SCROLL_ALLOW from "../../../actions/Body_Scroll/ACTION_BODY_SCROLL_ALLOW";
import ACTION_LOGIN_IS_NOT_ACTIVE from "../../../actions/Login/ACTION_LOGIN_IS_NOT_ACTIVE";
import "./ClientProfile.css";
import "../../../components/treatments/card_styling.css";

const ClientProfile = (props) => {
  const dispatch = useDispatch();
  const splashScreenHalfway = useSelector(
    (state) => state.splashScreenHalfway.splashScreenHalfway
  );
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const consentFormLastPageOpened = useSelector(
    (state) => state.consentFormLastPageOpened.consent_form_active_page
  );
  const consentFormLastUpdated = useSelector(
    (state) => state.consentFormLastUpdated.consent_form_last_updated
  );
  const loginIsActive = useSelector(
    (state) => state.loginIsActive.login_is_active
  );
  const [pdfLoading, changePDFLoading] = useState(false);

  useMemo(() => {
    if (!props.called) {
      props.getOwnAppointments();
    }
  }, [props]);

  useMemo(() => {
    if (!props.pastAppointmentsCalled) {
      props.getOwnPastAppointments();
    }
  }, [props]);

  useEffect(() => {
    if (!splashScreenComplete) {
      dispatch(ACTION_SPLASH_SCREEN_COMPLETE());
    }
    if (!splashScreenHalfway) {
      dispatch(ACTION_SPLASH_SCREEN_HALFWAY());
    }
  }, [dispatch, splashScreenComplete, splashScreenHalfway]);

  useMemo(() => {
    if (
      props.getClientData &&
      props.getClientData.client &&
      props.getClientData.client.consentForm.date
    ) {
      if (
        consentFormLastUpdated !==
        moment
          .unix(props.getClientData.client.consentForm.createdAt / 1000)
          .format("l")
      ) {
        dispatch(
          ACTION_CONSENT_FORM_LAST_UPDATED(
            moment
              .unix(props.getClientData.client.consentForm.createdAt / 1000)
              .format("l")
          )
        );
      }
    }
  }, [props.getClientData, consentFormLastUpdated, dispatch]);

  useEffect(() => {
    if (loginIsActive) {
      dispatch(ACTION_LOGIN_IS_NOT_ACTIVE());
    }
  }, [dispatch, loginIsActive]);

  const redirectToLogInPage = () => {
    if (!userAuthenticated) {
      return <Redirect to="/account/login" />;
    }
  };

  const redirectToUpcomingAppointments = () => {
    if (userAuthenticated) {
      if (!props.currentScreenSize) {
        if (props.initialScreenSize >= 1200) {
          return <Redirect to="/account/clientprofile/upcomingappointments" />;
        }
      } else {
        if (props.currentScreenSize >= 1200) {
          return <Redirect to="/account/clientprofile/upcomingappointments" />;
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      if (pdfLoading) {
        changePDFLoading(false);
      }
    };
  }, [pdfLoading]);

  return (
    <div className="client_profile_page_container">
      {redirectToLogInPage()}
      {redirectToUpcomingAppointments()}
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
          </Link>
        </div>
        <div className="profile_my_appointments_box_container">
          <Link
            className="profile_box_container_link"
            to={"/account/clientprofile/upcomingappointments"}
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
            to={"/account/clientprofile/profile"}
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
