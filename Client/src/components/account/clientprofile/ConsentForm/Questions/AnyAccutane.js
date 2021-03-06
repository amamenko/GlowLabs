import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
import { FormGroup, Label, Input } from "reactstrap";
import { Spring } from "react-spring/renderprops";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_ANY_ACCUTANE_NO_RESET from "../../../../../actions/ConsentForm/AnyAccutane/No/ACTION_ANY_ACCUTANE_NO_RESET";
import ACTION_ANY_ACCUTANE_NO from "../../../../../actions/ConsentForm/AnyAccutane/No/ACTION_ANY_ACCUTANE_NO";
import ACTION_ANY_ACCUTANE_YES_RESET from "../../../../../actions/ConsentForm/AnyAccutane/Yes/ACTION_ANY_ACCUTANE_YES_RESET";
import ACTION_ANY_ACCUTANE_YES from "../../../../../actions/ConsentForm/AnyAccutane/Yes/ACTION_ANY_ACCUTANE_YES";
import ACTION_ANY_ACCUTANE_NOTES from "../../../../../actions/ConsentForm/AnyAccutane/Yes/Notes/ACTION_ANY_ACCUTANE_NOTES";

const AnyAccutane = (props) => {
  const dispatch = useDispatch();
  const anyAccutaneNo = useSelector(
    (state) => state.anyAccutaneNo.any_accutane_no_active
  );
  const anyAccutaneYes = useSelector(
    (state) => state.anyAccutaneYes.any_accutane_yes_active
  );
  const anyAccutaneNotes = useSelector(
    (state) => state.anyAccutaneNotes.any_accutane_notes
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
    if (anyAccutaneNo) {
      dispatch(ACTION_ANY_ACCUTANE_NO_RESET());
    } else {
      dispatch(ACTION_ANY_ACCUTANE_NO());
      if (anyAccutaneYes) {
        dispatch(ACTION_ANY_ACCUTANE_YES_RESET());
      }
    }
  };

  const handleYesClicked = () => {
    if (anyAccutaneYes) {
      dispatch(ACTION_ANY_ACCUTANE_YES_RESET());
    } else {
      dispatch(ACTION_ANY_ACCUTANE_YES());
      if (anyAccutaneNo) {
        dispatch(ACTION_ANY_ACCUTANE_NO_RESET());
      }
    }
  };

  const handleAnyAccutaneNotes = (e) => {
    dispatch(ACTION_ANY_ACCUTANE_NOTES(e.currentTarget.value.trim()));
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        Do you use Accutane, Renee, Renova, or any other prescription skin
        products?
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
          {anyAccutaneNo ? checkMark() : null}
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
          {anyAccutaneYes ? checkMark() : null}
        </span>
        <p className="client_consent_form_checkbox_description">Yes</p>
        <FormGroup className="client_consent_form_elaboration_box">
          <Label for="any_accutane_notes_text">If yes, please specify:</Label>
          <Input
            type="textarea"
            style={{
              fontFamily: "Montserrat",
            }}
            defaultValue={anyAccutaneNotes}
            placeholder="Enter any information here."
            className="form_appointment_notes"
            maxLength={1000}
            onChange={handleAnyAccutaneNotes}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default AnyAccutane;
