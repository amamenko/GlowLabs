const CONSENT_FORM_LAST_UPDATED = "CONSENT_FORM_LAST_UPDATED";
const CONSENT_FORM_LAST_UPDATED_RESET = "CONSENT_FORM_LAST_UPDATED_RESET";

const consentFormLastUpdatedReducer = (
  state = { consent_form_last_updated: "" },
  action
) => {
  switch (action.type) {
    case CONSENT_FORM_LAST_UPDATED:
      return {
        ...state,
        consent_form_last_updated: action.consent_form_last_updated,
      };
    case CONSENT_FORM_LAST_UPDATED_RESET:
      return { ...state, consent_form_last_updated: "" };
    default:
      return { ...state };
  }
};

export default consentFormLastUpdatedReducer;
