const LIST_KNOWN_ALLERGIES_NOTES = "LIST_KNOWN_ALLERGIES_NOTES";
const LIST_KNOWN_ALLERGIES_NOTES_RESET = "LIST_KNOWN_ALLERGIES_NOTES_RESET";

const listKnownAllergiesNotesReducer = (
  state = { list_known_allergies_notes: "" },
  action
) => {
  switch (action.type) {
    case LIST_KNOWN_ALLERGIES_NOTES:
      return {
        ...state,
        list_known_allergies_notes: action.list_known_allergies_notes,
      };
    case LIST_KNOWN_ALLERGIES_NOTES_RESET:
      return { ...state, list_known_allergies_notes: "" };
    default:
      return { ...state };
  }
};

export default listKnownAllergiesNotesReducer;
