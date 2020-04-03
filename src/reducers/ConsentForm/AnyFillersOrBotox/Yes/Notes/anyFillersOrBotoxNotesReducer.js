const ANY_FILLERS_OR_BOTOX_NOTES = "ANY_FILLERS_OR_BOTOX_NOTES";
const ANY_FILLERS_OR_BOTOX_NOTES_RESET = "ANY_FILLERS_OR_BOTOX_NOTES_RESET";

const anyFillersOrBotoxNotesReducer = (
  state = { any_fillers_or_botox_notes: "" },
  action
) => {
  switch (action.type) {
    case ANY_FILLERS_OR_BOTOX_NOTES:
      return {
        ...state,
        any_fillers_or_botox_notes: action.any_fillers_or_botox_notes
      };
    case ANY_FILLERS_OR_BOTOX_NOTES_RESET:
      return { ...state, any_fillers_or_botox_notes: "" };
    default:
      return { ...state };
  }
};

export default anyFillersOrBotoxNotesReducer;
