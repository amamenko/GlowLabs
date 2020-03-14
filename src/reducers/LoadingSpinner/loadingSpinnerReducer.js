const LOADING_SPINNER_ACTIVE = "LOADING_SPINNER_ACTIVE";
const LOADING_SPINNER_RESET = "LOADING_SPINNER_RESET";

const loadingSpinnerReducer = (state = { loading_spinner: false }, action) => {
  switch (action.type) {
    case LOADING_SPINNER_ACTIVE:
      return { ...state, loading_spinner: true };
    case LOADING_SPINNER_RESET:
      return { ...state, loading_spinner: false };
    default:
      return { ...state };
  }
};

export default loadingSpinnerReducer;
