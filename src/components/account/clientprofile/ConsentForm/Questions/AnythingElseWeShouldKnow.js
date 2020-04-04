import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input } from "reactstrap";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES from "../../../../../actions/ConsentForm/AnythingElseWeShouldKnow/ACTION_ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES";

const AnythingElseWeShouldKnow = () => {
  const dispatch = useDispatch();
  const anythingElseWeShouldKnow = useSelector(
    (state) => state.anythingElseWeShouldKnow.anything_else_we_should_know_notes
  );

  const handleAnythingElseWeShouldKnowNotes = (e) => {
    dispatch(
      ACTION_ANYTHING_ELSE_WE_SHOULD_KNOW_NOTES(e.currentTarget.value.trim())
    );
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        Anything else we should know before we get to work on your skin?
      </p>
      <div className="client_consent_form_option_container">
        <FormGroup className="client_consent_form_elaboration_box">
          <Input
            type="textarea"
            style={{
              fontFamily: "Montserrat",
            }}
            defaultValue={anythingElseWeShouldKnow}
            placeholder="Enter any other information here."
            className="form_appointment_notes_extras"
            maxLength={1000}
            onChange={handleAnythingElseWeShouldKnowNotes}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default AnythingElseWeShouldKnow;
