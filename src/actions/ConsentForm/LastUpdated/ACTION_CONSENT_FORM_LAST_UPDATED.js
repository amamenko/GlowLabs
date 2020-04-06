const CONSENT_FORM_LAST_UPDATED = "CONSENT_FORM_LAST_UPDATED";

const ACTION_CONSENT_FORM_LAST_UPDATED = (consent_form_last_updated) => {
  return {
    type: CONSENT_FORM_LAST_UPDATED,
    consent_form_last_updated,
  };
};

export default ACTION_CONSENT_FORM_LAST_UPDATED;
