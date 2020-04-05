import React, { useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import SurgeryLast3Months from "../../Questions/SurgeryLast3Months";
import AnyHealthProblems from "../../Questions/AnyHealthProblems";
import "../../ConsentForm.css";
import "../../../../../../bootstrap_forms.min.css";
import ACTION_CONSENT_FORM_PAGE_1 from "../../../../../../actions/ConsentForm/LastPageOpened/ACTION_CONSENT_FORM_PAGE_1";

const ConsentFormPage1 = (props) => {
  const dispatch = useDispatch();

  const splashScreenComplete = useSelector(
    (state) => state.splashScreenComplete.splashScreenComplete
  );
  const userAuthenticated = useSelector(
    (state) => state.userAuthenticated.user_authenticated
  );

  const surgeryLast3MonthsNo = useSelector(
    (state) => state.surgeryLast3MonthsNo.surgery_last_3_months_no_active
  );
  const surgeryLast3MonthsYes = useSelector(
    (state) => state.surgeryLast3MonthsYes.surgery_last_3_months_yes_active
  );
  const anyHealthProblemsNo = useSelector(
    (state) => state.anyHealthProblemsNo.any_health_problems_no_active
  );
  const anyHealthProblemsYes = useSelector(
    (state) => state.anyHealthProblemsYes.any_health_problems_yes_active
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
    dispatch(ACTION_CONSENT_FORM_PAGE_1());
  }, [dispatch]);

  return (
    <div className="client_consent_form_container">
      {redirectToHome()}
      {redirectToLogInPage()}
      <div className="client_consent_form_header">
        <Link to="/account/clientprofile">
          <FontAwesomeIcon
            className="client_consent_form_header_back_arrow"
            icon={faChevronLeft}
          />
        </Link>
        <h1>CONSENT FORM</h1>
      </div>
      <SurgeryLast3Months
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <AnyHealthProblems
        currentScreenSize={props.currentScreenSize}
        initialScreenSize={props.initialScreenSize}
      />
      <div className="consent_form_bottom_button_container page_1">
        <Link
          className="next_page_link_container"
          to="/account/clientprofile/consentform/page2"
          style={{
            pointerEvents:
              (anyHealthProblemsNo || anyHealthProblemsYes) &&
              (surgeryLast3MonthsNo || surgeryLast3MonthsYes)
                ? "auto"
                : "none",
          }}
        >
          <div
            className="next_page_button"
            style={{
              background:
                (anyHealthProblemsNo || anyHealthProblemsYes) &&
                (surgeryLast3MonthsNo || surgeryLast3MonthsYes)
                  ? "rgb(44, 44, 52)"
                  : "#f0f0f0",
              color:
                (anyHealthProblemsNo || anyHealthProblemsYes) &&
                (surgeryLast3MonthsNo || surgeryLast3MonthsYes)
                  ? "rgb(255, 255, 255)"
                  : "rgb(201, 201, 201)",
              transition: "background 0.5s ease, color 0.5s ease",
            }}
          >
            <p>Next Page</p>
          </div>
        </Link>
        <p className="consent_form_page_number_info">Page 1 of 7</p>
      </div>
    </div>
  );
};

export default ConsentFormPage1;
