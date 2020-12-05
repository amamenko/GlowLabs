const CONSENT_FORM_DATE = "CONSENT_FORM_DATE";
const CONSENT_FORM_DATE_RESET = "CONSENT_FORM_DATE_RESET";

const consentFormDateReducer = (state = { consent_form_date: "" }, action) => {
  switch (action.type) {
    case CONSENT_FORM_DATE:
      return {
        ...state,
        consent_form_date: action.consent_form_date,
      };
    case CONSENT_FORM_DATE_RESET:
      return { ...state, consent_form_date: "" };
    default:
      return { ...state };
  }
};

export default consentFormDateReducer;
