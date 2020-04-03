const ANY_ACCUTANE_NO = "ANY_ACCUTANE_NO";
const ANY_ACCUTANE_NO_RESET = "ANY_ACCUTANE_NO_RESET";

const anyAccutaneNoReducer = (
  state = { any_accutane_no_active: false },
  action
) => {
  switch (action.type) {
    case ANY_ACCUTANE_NO:
      return { ...state, any_accutane_no_active: true };
    case ANY_ACCUTANE_NO_RESET:
      return { ...state, any_accutane_no_active: false };
    default:
      return { ...state };
  }
};

export default anyAccutaneNoReducer;
