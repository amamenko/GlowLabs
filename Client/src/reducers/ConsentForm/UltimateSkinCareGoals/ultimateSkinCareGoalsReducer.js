const ULTIMATE_SKIN_CARE_GOALS_NOTES = "ULTIMATE_SKIN_CARE_GOALS_NOTES";
const ULTIMATE_SKIN_CARE_GOALS_NOTES_RESET =
  "ULTIMATE_SKIN_CARE_GOALS_NOTES_RESET";

const ultimateSkinCareGoalsNotesReducer = (
  state = { ultimate_skin_care_goals_notes: "" },
  action
) => {
  switch (action.type) {
    case ULTIMATE_SKIN_CARE_GOALS_NOTES:
      return {
        ...state,
        ultimate_skin_care_goals_notes: action.ultimate_skin_care_goals_notes,
      };
    case ULTIMATE_SKIN_CARE_GOALS_NOTES_RESET:
      return { ...state, ultimate_skin_care_goals_notes: "" };
    default:
      return { ...state };
  }
};

export default ultimateSkinCareGoalsNotesReducer;
