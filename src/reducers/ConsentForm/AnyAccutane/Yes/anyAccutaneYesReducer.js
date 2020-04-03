const ANY_ACCUTANE_YES = "ANY_ACCUTANE_YES";
const ANY_ACCUTANE_YES_RESET = "ANY_ACCUTANE_YES_RESET";

const anyAccutaneYesReducer = (
  state = { any_accutane_yes_active: false },
  action
) => {
  switch (action.type) {
    case ANY_ACCUTANE_YES:
      return { ...state, any_accutane_yes_active: true };
    case ANY_ACCUTANE_YES_RESET:
      return { ...state, any_accutane_yes_active: false };
    default:
      return { ...state };
  }
};

export default anyAccutaneYesReducer;
