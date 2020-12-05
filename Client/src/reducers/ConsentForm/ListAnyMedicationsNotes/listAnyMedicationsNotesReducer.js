const LIST_ANY_MEDICATIONS_NOTES = "LIST_ANY_MEDICATIONS_NOTES";
const LIST_ANY_MEDICATIONS_NOTES_RESET = "LIST_ANY_MEDICATIONS_NOTES_RESET";

const listAnyMedicationsNotesReducer = (
  state = { list_any_medications_notes: "" },
  action
) => {
  switch (action.type) {
    case LIST_ANY_MEDICATIONS_NOTES:
      return {
        ...state,
        list_any_medications_notes: action.list_any_medications_notes
      };
    case LIST_ANY_MEDICATIONS_NOTES_RESET:
      return { ...state, list_any_medications_notes: "" };
    default:
      return { ...state };
  }
};

export default listAnyMedicationsNotesReducer;
