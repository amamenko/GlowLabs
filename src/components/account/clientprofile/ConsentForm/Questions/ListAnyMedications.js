import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormGroup, Input } from "reactstrap";
import "../ConsentForm.css";
import "../../../../../bootstrap_forms.min.css";
import ACTION_LIST_ANY_MEDICATIONS_NOTES from "../../../../../actions/ConsentForm/ListAnyMedications/ACTION_LIST_ANY_MEDICATIONS_NOTES";

const ListAnyMedications = () => {
  const dispatch = useDispatch();
  const listAnyMedicationsNotes = useSelector(
    (state) => state.listAnyMedicationsNotes.list_any_medications_notes
  );

  const handleListAnyMedicationsNotes = (e) => {
    dispatch(ACTION_LIST_ANY_MEDICATIONS_NOTES(e.currentTarget.value.trim()));
  };

  return (
    <div className="client_consent_form_content_container">
      <p className="client_consent_form_question">
        Please list any medications, vitamins, and/or supplements that you take
        regularly and that may affect your skin.
      </p>
      <div className="client_consent_form_option_container">
        <FormGroup className="client_consent_form_surgery_elaboration_box">
          <Input
            type="textarea"
            style={{
              fontFamily: "Montserrat",
            }}
            defaultValue={listAnyMedicationsNotes}
            placeholder="Enter your information here, if any."
            className="form_appointment_notes"
            maxLength={1000}
            onChange={handleListAnyMedicationsNotes}
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default ListAnyMedications;
