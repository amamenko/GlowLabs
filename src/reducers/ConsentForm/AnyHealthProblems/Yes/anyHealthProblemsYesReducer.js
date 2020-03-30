const ANY_HEALTH_PROBLEMS_YES = "ANY_HEALTH_PROBLEMS_YES";
const ANY_HEALTH_PROBLEMS_YES_RESET = "ANY_HEALTH_PROBLEMS_YES_RESET";

const anyHealthProblemsYesReducer = (
  state = { any_health_problems_yes_active: false },
  action
) => {
  switch (action.type) {
    case ANY_HEALTH_PROBLEMS_YES:
      return { ...state, any_health_problems_yes_active: true };
    case ANY_HEALTH_PROBLEMS_YES_RESET:
      return { ...state, any_health_problems_yes_active: false };
    default:
      return { ...state };
  }
};

export default anyHealthProblemsYesReducer;
