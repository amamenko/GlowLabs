import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import AnyFillersOrBotox from "../../Questions/AnyFillersOrBotox";
import ListKnownAllergies from "../../Questions/ListKnownAllergies";
import ACTION_CONSENT_FORM_PAGE_4 from "../../../../../../actions/ConsentForm/LastPageOpened/ACTION_CONSENT_FORM_PAGE_4";
import "../../ConsentForm.css";
import "../../../../../../bootstrap_forms.min.css";

const ConsentFormPage4 = (props) => {
  const dispatch = useDispatch();
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const anyFillersOrBotoxNo = useSelector(
    (state) => state.anyFillersOrBotoxNo.any_fillers_or_botox_no_active
  );
  const anyFillersOrBotoxYes = useSelector(
    (state) => state.anyFillersOrBotoxYes.any_fillers_or_botox_yes_active
  );
  const guestConsentFormAccessToken = useSelector(
    (state) => state.guestConsentFormAccessToken.access_token
  );

  const redirectToHome = () => {
    if (!splashScreenComplete) {
      return <Redirect to="/" />;
    }
  };

  const redirectToLogInPage = () => {
    if (!userAuthenticated && !guestConsentFormAccessToken) {
      return <Redirect to="/account/login" />;
    }
  };

  useEffect(() => {
    dispatch(ACTION_CONSENT_FORM_PAGE_4());
  }, [dispatch]);

  return (
    <div className="client_consent_form_container">
      {redirectToHome()}
      {redirectToLogInPage()}
      <div className="client_consent_form_header">
        {guestConsentFormAccessToken ? null : (
          <Link to="/account/clientprofile">
            <FontAwesomeIcon
              className="client_consent_form_header_back_arrow"
              icon={faChevronLeft}
            />
          </Link>
        )}
        <h1>CONSENT FORM</h1>
      </div>
      <AnyFillersOrBotox
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <ListKnownAllergies
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <div className="consent_form_bottom_button_container">
        <Link
          className="next_page_link_container"
          to="/account/clientprofile/consentform/page5"
          style={{
            pointerEvents:
              anyFillersOrBotoxNo || anyFillersOrBotoxYes ? "auto" : "none",
          }}
        >
          <div
            className="next_page_button"
            style={{
              background:
                anyFillersOrBotoxNo || anyFillersOrBotoxYes
                  ? "rgb(44, 44, 52)"
                  : "#f0f0f0",
              color:
                anyFillersOrBotoxNo || anyFillersOrBotoxYes
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
              transition: "background 0.5s ease, color 0.5s ease",
            }}
          >
            <p>Next Page</p>
          </div>
        </Link>
        <div className="consent_form_previous_page_button">
          <Link to="/account/clientprofile/consentform/page3">
            <p>Previous Page</p>
          </Link>
        </div>

        <p className="consent_form_page_number_info">Page 4 of 7</p>
      </div>
    </div>
  );
};

export default ConsentFormPage4;
