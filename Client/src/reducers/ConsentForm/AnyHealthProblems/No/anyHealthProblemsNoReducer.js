const ANY_HEALTH_PROBLEMS_NO = "ANY_HEALTH_PROBLEMS_NO";
const ANY_HEALTH_PROBLEMS_NO_RESET = "ANY_HEALTH_PROBLEMS_NO_RESET";

const anyHealthProblemsNoReducer = (
  state = { any_health_problems_no_active: false },
  action
) => {
  switch (action.type) {
    case ANY_HEALTH_PROBLEMS_NO:
      return { ...state, any_health_problems_no_active: true };
    case ANY_HEALTH_PROBLEMS_NO_RESET:
      return { ...state, any_health_problems_no_active: false };
    default:
      return { ...state };
  }
};

export default anyHealthProblemsNoReducer;
