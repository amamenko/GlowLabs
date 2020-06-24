const GUEST_CONSENT_FORM_ACCESS_TOKEN = "GUEST_CONSENT_FORM_ACCESS_TOKEN";
const GUEST_CONSENT_FORM_ACCESS_TOKEN_RESET =
  "GUEST_CONSENT_FORM_ACCESS_TOKEN_RESET";

const guestConsentFormAccessTokenReducer = (
  state = { access_token: null },
  action
) => {
  switch (action.type) {
    case GUEST_CONSENT_FORM_ACCESS_TOKEN:
      return { ...state, access_token: action.access_token };
    case GUEST_CONSENT_FORM_ACCESS_TOKEN_RESET:
      return { ...state, access_token: null };
    default:
      return { ...state };
  }
};

export default guestConsentFormAccessTokenReducer;
