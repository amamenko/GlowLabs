const ANY_HEALTH_PROBLEMS_NOTES = "ANY_HEALTH_PROBLEMS_NOTES";
const ANY_HEALTH_PROBLEMS_NOTES_RESET = "ANY_HEALTH_PROBLEMS_NOTES_RESET";

const anyHealthProblemsNotesReducer = (
  state = { any_health_problems_notes: "" },
  action
) => {
  switch (action.type) {
    case ANY_HEALTH_PROBLEMS_NOTES:
      return {
        ...state,
        any_health_problems_notes: action.any_health_problems_notes
      };
    case ANY_HEALTH_PROBLEMS_NOTES_RESET:
      return { ...state, any_health_problems_notes: "" };
    default:
      return { ...state };
  }
};

export default anyHealthProblemsNotesReducer;
