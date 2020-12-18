import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, Label, Input } from "reactstrap";
import { Spring } from "react-spring/renderprops";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_SURGERY_LAST_3_MONTHS_NO_RESET from "../../../../../actions/ConsentForm/SurgeryLast3Months/No/ACTION_SURGERY_LAST_3_MONTHS_NO_RESET";
import ACTION_SURGERY_LAST_3_MONTHS_NO from "../../../../../actions/ConsentForm/SurgeryLast3Months/No/ACTION_SURGERY_LAST_3_MONTHS_NO";
import ACTION_SURGERY_LAST_3_MONTHS_YES from "../../../../../actions/ConsentForm/SurgeryLast3Months/Yes/ACTION_SURGERY_LAST_3_MONTHS_YES";
import ACTION_SURGERY_LAST_3_MONTHS_YES_RESET from "../../../../../actions/ConsentForm/SurgeryLast3Months/Yes/ACTION_SURGERY_LAST_3_MONTHS_YES_RESET";
import ACTION_SURGERY_LAST_3_MONTHS_NOTES from "../../../../../actions/ConsentForm/SurgeryLast3Months/Yes/Notes/ACTION_SURGERY_LAST_3_MONTHS_NOTES";

const SurgeryLast3Months = (props) => {
  const dispatch = useDispatch();
  const surgeryLast3MonthsNo = useSelector(
    (state) => state.surgeryLast3MonthsNo.surgery_last_3_months_no_active
  );
  const surgeryLast3MonthsYes = useSelector(
    (state) => state.surgeryLast3MonthsYes.surgery_last_3_months_yes_active
  );
  const surgeryLast3MonthsNotes = useSelector(
    (state) => state.surgeryLast3MonthsNotes.surgery_last_3_months_notes
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
    if (surgeryLast3MonthsNo) {
      dispatch(ACTION_SURGERY_LAST_3_MONTHS_NO_RESET());
    } else {
      dispatch(ACTION_SURGERY_LAST_3_MONTHS_NO());
      if (surgeryLast3MonthsYes) {
        dispatch(ACTION_SURGERY_LAST_3_MONTHS_YES_RESET());
      }
    }
  };

  const handleYesClicked = () => {
    if (surgeryLast3MonthsYes) {
      dispatch(ACTION_SURGERY_LAST_3_MONTHS_YES_RESET());
    } else {
      dispatch(ACTION_SURGERY_LAST_3_MONTHS_YES());
      if (surgeryLast3MonthsNo) {
        dispatch(ACTION_SURGERY_LAST_3_MONTHS_NO_RESET());
      }
    }
  };

  const handleSurgeryNotes = (e) => {
    dispatch(ACTION_SURGERY_LAST_3_MONTHS_NOTES(e.currentTarget.value.trim()));
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        Have you had any surgery in the last three months?
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
          {surgeryLast3MonthsNo ? checkMark() : null}
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
          {surgeryLast3MonthsYes ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">Yes</p>
        <FormGroup className="client_consent_form_elaboration_box">
          <Label for="surgery_specification_text">
            If yes, please specify:
          </Label>
          <Input
            type="textarea"
            style={{
              fontFamily: "Montserrat",
            }}
            defaultValue={surgeryLast3MonthsNotes}
            placeholder="Enter any recent surgery details here."
            className="form_appointment_notes"
            maxLength={1000}
            onChange={handleSurgeryNotes}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default SurgeryLast3Months;
