import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { Spring } from "react-spring/renderprops";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_DIAGNOSED_WITH_ROSACEA_NO_RESET from "../../../../../actions/ConsentForm/DiagnosedWithRosacea/No/ACTION_DIAGNOSED_WITH_ROSACEA_NO_RESET";
import ACTION_DIAGNOSED_WITH_ROSACEA_NO from "../../../../../actions/ConsentForm/DiagnosedWithRosacea/No/ACTION_DIAGNOSED_WITH_ROSACEA_NO";
import ACTION_DIAGNOSED_WITH_ROSACEA_YES_RESET from "../../../../../actions/ConsentForm/DiagnosedWithRosacea/Yes/ACTION_DIAGNOSED_WITH_ROSACEA_YES_RESET";
import ACTION_DIAGNOSED_WITH_ROSACEA_YES from "../../../../../actions/ConsentForm/DiagnosedWithRosacea/Yes/ACTION_DIAGNOSED_WITH_ROSACEA_YES";

const DiagnosedWithRosacea = (props) => {
  const dispatch = useDispatch();
  const diagnosedWithRosaceaNo = useSelector(
    (state) => state.diagnosedWithRosaceaNo.diagnosed_with_rosacea_no_active
  );
  const diagnosedWithRosaceaYes = useSelector(
    (state) => state.diagnosedWithRosaceaYes.diagnosed_with_rosacea_yes_active
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
    if (diagnosedWithRosaceaNo) {
      dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_NO_RESET());
    } else {
      dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_NO());
      if (diagnosedWithRosaceaYes) {
        dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_YES_RESET());
      }
    }
  };

  const handleYesClicked = () => {
    if (diagnosedWithRosaceaYes) {
      dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_YES_RESET());
    } else {
      dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_YES());
      if (diagnosedWithRosaceaNo) {
        dispatch(ACTION_DIAGNOSED_WITH_ROSACEA_NO_RESET());
      }
    }
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        Have you ever been diagnosed with rosacea?
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
          {diagnosedWithRosaceaNo ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">No</p>
        <p className="client_consent_form_optional_designation">Optional</p>
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
          {diagnosedWithRosaceaYes ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">Yes</p>
        <p className="client_consent_form_optional_designation">Optional</p>
      </div>
    </div>
  );
};

export default DiagnosedWithRosacea;
