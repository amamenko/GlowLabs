const ANY_FILLERS_OR_BOTOX_NO = "ANY_FILLERS_OR_BOTOX_NO";
const ANY_FILLERS_OR_BOTOX_NO_RESET = "ANY_FILLERS_OR_BOTOX_NO_RESET";

const anyFillersOrBotoxNoReducer = (
  state = { any_fillers_or_botox_no_active: false },
  action
) => {
  switch (action.type) {
    case ANY_FILLERS_OR_BOTOX_NO:
      return { ...state, any_fillers_or_botox_no_active: true };
    case ANY_FILLERS_OR_BOTOX_NO_RESET:
      return { ...state, any_fillers_or_botox_no_active: false };
    default:
      return { ...state };
  }
};

export default anyFillersOrBotoxNoReducer;
