const CONSENT_FORM_DATE = "CONSENT_FORM_DATE";

const ACTION_CONSENT_FORM_DATE = (consent_form_date) => {
  return {
    type: CONSENT_FORM_DATE,
    consent_form_date,
  };
};

export default ACTION_CONSENT_FORM_DATE;
