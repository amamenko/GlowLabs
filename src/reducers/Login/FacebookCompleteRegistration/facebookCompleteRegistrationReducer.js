const FACEBOOK_COMPLETE_REGISTRATION = "FACEBOOK_COMPLETE_REGISTRATION";
const FACEBOOK_COMPLETE_REGISTRATION_RESET =
  "FACEBOOK_COMPLETE_REGISTRATION_RESET";

const facebookCompleteRegistrationReducer = (
  state = { facebook_complete_registration_active: false },
  action
) => {
  switch (action.type) {
    case FACEBOOK_COMPLETE_REGISTRATION:
      return { ...state, facebook_complete_registration_active: true };
    case FACEBOOK_COMPLETE_REGISTRATION_RESET:
      return { ...state, facebook_complete_registration_active: false };
    default:
      return { ...state };
  }
};

export default facebookCompleteRegistrationReducer;
