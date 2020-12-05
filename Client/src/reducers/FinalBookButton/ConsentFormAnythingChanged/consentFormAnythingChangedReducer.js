const CONSENT_FORM_ANYTHING_CHANGED = "CONSENT_FORM_ANYTHING_CHANGED";
const CONSENT_FORM_ANYTHING_CHANGED_RESET =
  "CONSENT_FORM_ANYTHING_CHANGED_RESET";

const consentFormAnythingChangedReducer = (
  state = { consent_form_anything_changed: false },
  action
) => {
  switch (action.type) {
    case CONSENT_FORM_ANYTHING_CHANGED:
      return { ...state, consent_form_anything_changed: true };
    case CONSENT_FORM_ANYTHING_CHANGED_RESET:
      return { ...state, consent_form_anything_changed: false };
    default:
      return { ...state };
  }
};

export default consentFormAnythingChangedReducer;
