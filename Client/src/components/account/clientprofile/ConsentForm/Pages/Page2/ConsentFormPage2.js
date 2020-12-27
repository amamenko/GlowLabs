import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import ListAnyMedications from "../../Questions/ListAnyMedications";
import AnyChemPeelsLastMonth from "../../Questions/AnyChemPeelsLastMonth";
import AnyWaxingLast5Days from "../../Questions/AnyWaxingLast5Days";
import ACTION_CONSENT_FORM_PAGE_2 from "../../../../../../actions/ConsentForm/LastPageOpened/ACTION_CONSENT_FORM_PAGE_2";
import "../../ConsentForm.css";
import "../../../../../../bootstrap_forms.min.css";

const ConsentFormPage2 = (props) => {
  const dispatch = useDispatch();
  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );
  const anyWaxingLast5DaysNo = useSelector(
    (state) => state.anyWaxingLast5DaysNo.any_waxing_last_5_days_no_active
  );
  const anyWaxingLast5DaysYes = useSelector(
    (state) => state.anyWaxingLast5DaysYes.any_waxing_last_5_days_yes_active
  );
  const anyChemPeelsLastMonthNo = useSelector(
    (state) => state.anyChemPeelsLastMonthNo.any_chem_peels_last_month_no_active
  );
  const anyChemPeelsLastMonthYes = useSelector(
    (state) =>
      state.anyChemPeelsLastMonthYes.any_chem_peels_last_month_yes_active
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
    dispatch(ACTION_CONSENT_FORM_PAGE_2());
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
      <ListAnyMedications />
      <AnyChemPeelsLastMonth
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <AnyWaxingLast5Days
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <div className="consent_form_bottom_button_container">
        <Link
          className="next_page_link_container"
          to="/account/clientprofile/consentform/page3"
          style={{
            pointerEvents:
              (anyWaxingLast5DaysNo || anyWaxingLast5DaysYes) &&
              (anyChemPeelsLastMonthNo || anyChemPeelsLastMonthYes)
                ? "auto"
                : "none",
          }}
        >
          <div
            className="next_page_button"
            style={{
              background:
                (anyWaxingLast5DaysNo || anyWaxingLast5DaysYes) &&
                (anyChemPeelsLastMonthNo || anyChemPeelsLastMonthYes)
                  ? "rgb(44, 44, 52)"
                  : "#f0f0f0",
              color:
                (anyWaxingLast5DaysNo || anyWaxingLast5DaysYes) &&
                (anyChemPeelsLastMonthNo || anyChemPeelsLastMonthYes)
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
              transition: "background 0.5s ease, color 0.5s ease",
            }}
          >
            <p>Next Page</p>
          </div>
        </Link>
        <div className="consent_form_previous_page_button">
          <Link to="/account/clientprofile/consentform/page1">
            <p>Previous Page</p>
          </Link>
        </div>

        <p className="consent_form_page_number_info">Page 2 of 7</p>
      </div>
    </div>
  );
};

export default ConsentFormPage2;
