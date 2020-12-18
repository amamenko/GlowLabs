import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { Spring } from "react-spring/renderprops";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO_RESET from "../../../../../actions/ConsentForm/AnyChemPeelsLastMonth/No/ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO_RESET";
import ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO from "../../../../../actions/ConsentForm/AnyChemPeelsLastMonth/No/ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO";
import ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES_RESET from "../../../../../actions/ConsentForm/AnyChemPeelsLastMonth/Yes/ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES_RESET";
import ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES from "../../../../../actions/ConsentForm/AnyChemPeelsLastMonth/Yes/ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES";

const AnyChemPeelsLastMonth = (props) => {
  const dispatch = useDispatch();
  const anyChemPeelsLastMonthNo = useSelector(
    (state) => state.anyChemPeelsLastMonthNo.any_chem_peels_last_month_no_active
  );
  const anyChemPeelsLastMonthYes = useSelector(
    (state) =>
      state.anyChemPeelsLastMonthYes.any_chem_peels_last_month_yes_active
  );
  const [pageOpened, changePageOpened] = useState(false);

  useEffect(() => {
    changePageOpened(true);
    const pageNowOpen = setTimeout(() => {
      changePageOpened(false);
    }, 500);
    return () => {
      clearTimeout(pageNowOpen);
    };
  }, []);

  const checkMark = () => {
    return (
      <Spring from={{ x: 100 }} to={{ x: 0 }} config={{ duration: 2000 }}>
        {(styles) => (
          <svg
            width={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1600
                  ? "1rem"
                  : props.initialScreenSize >= 1200
                  ? "0.5rem"
                  : "100%"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1600
                ? "1rem"
                : props.currentScreenSize >= 1200
                ? "0.5rem"
                : "100%"
            }
            height={
              props.currentScreenSize === ""
                ? props.initialScreenSize >= 1800
                  ? "2rem"
                  : props.initialScreenSize >= 1600
                  ? "1.3rem"
                  : props.initialScreenSize >= 1200
                  ? "0.5rem"
                  : props.initialScreenSize >= 360
                  ? "2rem"
                  : "1rem"
                : props.currentScreenSize >= 1800
                ? "2rem"
                : props.currentScreenSize >= 1600
                ? "1.3rem"
                : props.currentScreenSize >= 1200
                ? "0.5rem"
                : props.currentScreenSize >= 360
                ? "2rem"
                : "1rem"
            }
            style={{
              display: "block",
            }}
            viewBox="0 0 13.229 13.229"
          >
            <path
              d="M2.851 7.56l2.45 2.482 5.36-6.958"
              fill="none"
              stroke="#000"
              strokeDasharray="100"
              strokeDashoffset={pageOpened ? 0 : `${styles.x}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            />
          </svg>
        )}
      </Spring>
    );
  };

  const handleNoClicked = () => {
    if (anyChemPeelsLastMonthNo) {
      dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO_RESET());
    } else {
      dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO());
      if (anyChemPeelsLastMonthYes) {
        dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES_RESET());
      }
    }
  };

  const handleYesClicked = () => {
    if (anyChemPeelsLastMonthYes) {
      dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES_RESET());
    } else {
      dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_YES());
      if (anyChemPeelsLastMonthNo) {
        dispatch(ACTION_ANY_CHEM_PEELS_LAST_MONTH_NO_RESET());
      }
    }
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        Have you had any chemical peels, lasers, microdermabrasion, or
        resurfacing treatments in the last month?
      </p>
      <div className="client_consent_form_option_container">
        <span
          className="fa-layers fa-fw client_consent_form_checkbox"
          onClick={handleNoClicked}
        >
          <FontAwesomeIcon
            color="rgba(155, 155, 155, 0.4)"
            transform={
              !props.currentScreenSize
                ? props.initialScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
                : props.currentScreenSize >= 360
                ? "grow-20"
                : "grow-10"
            }
            icon={faSquare}
          />
          {anyChemPeelsLastMonthNo ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">No</p>
      </div>
      <div className="client_consent_form_option_container">
        <span
          className="fa-layers fa-fw client_consent_form_checkbox"
          onClick={handleYesClicked}
        >
          <FontAwesomeIcon
            color="rgba(155, 155, 155, 0.4)"
            transform={
              !props.currentScreenSize
                ? props.initialScreenSize >= 360
                  ? "grow-20"
                  : "grow-10"
                : props.currentScreenSize >= 360
                ? "grow-20"
                : "grow-10"
            }
            icon={faSquare}
          />
          {anyChemPeelsLastMonthYes ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">Yes</p>
      </div>
    </div>
  );
};

export default AnyChemPeelsLastMonth;
