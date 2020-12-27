import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import AnyAccutane from "../../Questions/AnyAccutane";
import AnyProductsWithIngredients from "../../Questions/AnyProductsWithIngredients";
import ACTION_CONSENT_FORM_PAGE_3 from "../../../../../../actions/ConsentForm/LastPageOpened/ACTION_CONSENT_FORM_PAGE_3";
import "../../ConsentForm.css";
import "../../../../../../bootstrap_forms.min.css";

const ConsentFormPage3 = (props) => {
  const dispatch = useDispatch();
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const anyAccutaneNo = useSelector(
    (state) => state.anyAccutaneNo.any_accutane_no_active
  );
  const anyAccutaneYes = useSelector(
    (state) => state.anyAccutaneYes.any_accutane_yes_active
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
    dispatch(ACTION_CONSENT_FORM_PAGE_3());
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
      <AnyAccutane
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <AnyProductsWithIngredients
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <div className="consent_form_bottom_button_container">
        <Link
          className="next_page_link_container"
          to="/account/clientprofile/consentform/page4"
          style={{
            pointerEvents: anyAccutaneNo || anyAccutaneYes ? "auto" : "none",
          }}
        >
          <div
            className="next_page_button"
            style={{
              background:
                anyAccutaneNo || anyAccutaneYes ? "rgb(44, 44, 52)" : "#f0f0f0",
              color:
                anyAccutaneNo || anyAccutaneYes
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
              transition: "background 0.5s ease, color 0.5s ease",
            }}
          >
            <p>Next Page</p>
          </div>
        </Link>
        <div className="consent_form_previous_page_button">
          <Link to="/account/clientprofile/consentform/page2">
            <p>Previous Page</p>
          </Link>
        </div>
        <p className="consent_form_page_number_info">Page 3 of 7</p>
      </div>
    </div>
  );
};

export default ConsentFormPage3;
