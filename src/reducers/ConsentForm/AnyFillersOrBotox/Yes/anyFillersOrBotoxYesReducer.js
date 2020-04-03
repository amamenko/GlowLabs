const ANY_FILLERS_OR_BOTOX_YES = "ANY_FILLERS_OR_BOTOX_YES";
const ANY_FILLERS_OR_BOTOX_YES_RESET = "ANY_FILLERS_OR_BOTOX_YES_RESET";

const anyFillersOrBotoxYesReducer = (
  state = { any_fillers_or_botox_yes_active: false },
  action
) => {
  switch (action.type) {
    case ANY_FILLERS_OR_BOTOX_YES:
      return { ...state, any_fillers_or_botox_yes_active: true };
    case ANY_FILLERS_OR_BOTOX_YES_RESET:
      return { ...state, any_fillers_or_botox_yes_active: false };
    default:
      return { ...state };
  }
};

export default anyFillersOrBotoxYesReducer;
