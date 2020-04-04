import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input } from "reactstrap";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_ULTIMATE_SKIN_CARE_GOALS_NOTES from "../../../../../actions/ConsentForm/UltimateSkinCareGoals/ACTION_ULTIMATE_SKIN_CARE_GOALS_NOTES";

const UltimateSkinCareGoals = () => {
  const dispatch = useDispatch();
  const ultimateSkinCareGoals = useSelector(
    (state) => state.ultimateSkinCareGoals.ultimate_skin_care_goals_notes
  );

  const handleUltimateSkinCareGoalsNotes = (e) => {
    dispatch(
      ACTION_ULTIMATE_SKIN_CARE_GOALS_NOTES(e.currentTarget.value.trim())
    );
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        What are your ultimate skin care goals?
      </p>
      <div className="client_consent_form_option_container">
        <FormGroup className="client_consent_form_elaboration_box">
          <Input
            type="textarea"
            style={{
              fontFamily: "Montserrat",
            }}
            defaultValue={ultimateSkinCareGoals}
            placeholder="Enter your skin care goals here."
            className="form_appointment_notes_extras"
            maxLength={1000}
            onChange={handleUltimateSkinCareGoalsNotes}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default UltimateSkinCareGoals;
