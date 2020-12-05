import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input } from "reactstrap";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_LIST_KNOWN_ALLERGIES_NOTES from "../../../../../actions/ConsentForm/ListKnownAllergies/ACTION_LIST_KNOWN_ALLERGIES";

const ListKnownAllergies = () => {
  const dispatch = useDispatch();
  const listKnownAllergiesNotes = useSelector(
    (state) => state.listKnownAllergiesNotes.list_known_allergies_notes
  );

  const handleListKnownAllergiesNotes = (e) => {
    dispatch(ACTION_LIST_KNOWN_ALLERGIES_NOTES(e.currentTarget.value.trim()));
  };

  return (
    <div className="client_consent_form_content_container">
      <span className="client_consent_form_question_optional_container">
        <p className="client_consent_form_question">
          Please list your known allergies, skin condition, or skin irritants.
        </p>
        <p className="client_consent_form_optional_designation">Optional</p>
      </span>
      <div className="client_consent_form_option_container">
        <FormGroup className="client_consent_form_surgery_elaboration_box">
          <Input
            type="textarea"
            style={{
              fontFamily: "Montserrat",
            }}
            defaultValue={listKnownAllergiesNotes}
            placeholder="Enter your information here."
            className="form_appointment_notes"
            maxLength={1000}
            onChange={handleListKnownAllergiesNotes}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default ListKnownAllergies;
