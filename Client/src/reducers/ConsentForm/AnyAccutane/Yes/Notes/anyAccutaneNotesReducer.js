const ANY_ACCUTANE_NOTES = "ANY_ACCUTANE_NOTES";
const ANY_ACCUTANE_NOTES_RESET = "ANY_ACCUTANE_NOTES_RESET";

const anyAccutaneNotesReducer = (
  state = { any_accutane_notes: "" },
  action
) => {
  switch (action.type) {
    case ANY_ACCUTANE_NOTES:
      return {
        ...state,
        any_accutane_notes: action.any_accutane_notes
      };
    case ANY_ACCUTANE_NOTES_RESET:
      return { ...state, any_accutane_notes: "" };
    default:
      return { ...state };
  }
};

export default anyAccutaneNotesReducer;
